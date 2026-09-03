#!/usr/bin/env python3
"""
Convert a Markdown Q&A file (structured as `# Category` sections containing
`### N. Question` headings followed by an answer paragraph, with sections
separated by `---`) into a YAML file.

Usage:
    python3 -m venv .venv
    source .venv/bin/activate
    pip3 install pyyaml
    python3 questions.py questions.md questions.yaml
"""

import re
import sys
import yaml


def parse_markdown(md_text: str) -> list[dict]:
    """Parse the markdown text into a list of category dicts."""

    # Split on top-level headings (# Category Name), keeping the heading text.
    # This regex splits the doc into chunks starting at each "# " line
    # that is NOT "##" or "###".
    section_pattern = re.compile(r"^# (.+)$", re.MULTILINE)

    matches = list(section_pattern.finditer(md_text))
    categories = []

    for i, match in enumerate(matches):
        category_name = match.group(1).strip()
        start = match.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(md_text)
        section_text = md_text[start:end]

        questions = parse_questions(section_text)

        categories.append({
            "category": category_name,
            "questions": questions,
        })

    return categories


def parse_questions(section_text: str) -> list[dict]:
    """Parse individual Q&A pairs out of a category's section text."""

    # Remove horizontal rule separators
    section_text = re.sub(r"^---\s*$", "", section_text, flags=re.MULTILINE)

    # Match: ### <number>. <question text>   followed by the answer
    # (everything up to the next ### or end of section)
    question_pattern = re.compile(
        r"^### \d+\.\s*(.+?)\s*$\n(.*?)(?=^### \d+\.|\Z)",
        re.MULTILINE | re.DOTALL,
    )

    questions = []
    for q_match in question_pattern.finditer(section_text):
        question_text = q_match.group(1).strip()
        answer_text = q_match.group(2).strip()

        # Collapse extra blank lines / whitespace within the answer
        answer_text = re.sub(r"\n{2,}", "\n\n", answer_text)
        answer_text = answer_text.strip()

        questions.append({
            "question": question_text,
            "answer": answer_text,
        })

    return questions


def convert(input_path: str, output_path: str) -> None:
    with open(input_path, "r", encoding="utf-8") as f:
        md_text = f.read()

    data = {"categories": parse_markdown(md_text)}

    with open(output_path, "w", encoding="utf-8") as f:
        yaml.dump(
            data,
            f,
            sort_keys=False,
            allow_unicode=True,
            default_flow_style=False,
            width=1000,  # avoid line-wrapping long answers
        )

    total_questions = sum(len(c["questions"]) for c in data["categories"])
    print(f"Converted {len(data['categories'])} categories "
          f"and {total_questions} questions.")
    print(f"YAML written to: {output_path}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python md_to_yaml.py <input.md> <output.yaml>")
        sys.exit(1)

    convert(sys.argv[1], sys.argv[2])
