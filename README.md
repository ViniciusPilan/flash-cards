# Flash cards
Simple tool to help in DevOps studying.

## How to use
At **Makefile**, there are defined the core commands. Type `make help` to see all of them.

The current project structure is:
- questions.py process questions.md and create questions.yaml
- the app (html + css + js) reads questions.yaml and shows its content via http server (using python3).

All of that can be make using the make instructions.

## Important notes
- Commits into main branch on questions.md will automatically build a new version of questions.yaml (via GitHub actions).
- This is a vibe coded project very simple. This development is still in progress.

## Prompt to reuse
```md

# Explaining each file
- index.html: The UI skeleton and entry point. It defines the terminal-style layout (categories, question pane, answer pane with a reveal button, and next button) and loads stylesheets, the js-yaml parser library, and script.js.
- script.js: The application logic. It fetches questions.yaml, parses the YAML data into JavaScript objects, flattens the categories into an array of flashcards, and dynamically updates the HTML DOM when users click to reveal answers or load random cards.
- questions.yaml: The data source containing structured flashcards organized hierarchically by category, question, and answer.

# How They Are Connected
When index.html loads in a browser, it executes script.js. The script fetches questions.yaml over HTTP, parses it using the js-yaml library, and dynamically populates the DOM elements in index.html to create the interactive flashcard experience.

```