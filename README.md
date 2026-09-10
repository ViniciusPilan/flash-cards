# DevOps - Flash cards
Simple tool to help in DevOps studying.
- https://github.com/ViniciusPilan/flash-cards
- https://flash-cards.vinipilan.workers.dev/


## How to use
At **Makefile**, there are defined the core commands. Type `make help` to see all of them.

The current project structure is:
- `questions.py` process `questions.md` and create `questions.yaml`
- the app (html + css + js) reads `questions.yaml` and shows its content via http server (using python3).
- The readme file (this current file) contains general information and useful prompts.

You can use these files with the make instructions :)

### About the web app files
- **index.html:** The UI skeleton and entry point. It defines the terminal-style layout (categories, question pane, answer pane with a reveal button, and next button) and loads stylesheets, the js-yaml parser library, and script.js.
- **script.js:** The application logic. It fetches questions.yaml, parses the YAML data into JavaScript objects, flattens the categories into an array of flashcards, and dynamically updates the HTML DOM when users click to reveal answers or load random cards.
- **style.css:**  Style settings.

### About the questions files
- **questions.md:** The file containing all the "Questions and Answers by category". The currently categories are:
    - Computer Operational Systems
    - Software engineer
    - System design
    - Artificial intelligence (focusing in LLM ecosystem)
    - Computer Network
    - Cloud Computing
    - Virtualization
    - Infrastructure as a code (IaC)
    - Monitoring and Observability
    - CI/CD
    - Tests
    - DevSecOps
    - DevOps
    - Containerizations
    - Kubernetes (Admin - CKA)
    - Kubernetes (Dev/User - CKAD)
    - Kubernetes (Admin/Sec Engineer - CKS)
    - DevOps core tools

- **questions.py:** When executed, this script creates the `questions.yaml` by reading and structuring the `questions.md` content.
- **questions.yaml:** The data source containing structured flashcards organized hierarchically by category, question, and answer. This is read by the system to show in the web page.

### How all of that is connected
When index.html loads in a browser, it executes script.js. The script fetches questions.yaml over HTTP, parses it using the js-yaml library, and dynamically populates the DOM elements in index.html to create the interactive flashcard experience. Every push into the main branch on `questions.md` executes the `questions.py` to create the questions.yaml (it could be locally as well via the make file).

## Prompts (to be reused)

### Creating questions for a specific category
The idea here is to create use a specific prompt for each category to avoid context overloading and hallucination.

```md
I'm working into a educational project where I must create questions and answers to be a study material for DevOps engineers. Create 8 questions of each area from the following list:

- Computer Operational Systems
- Software engineer
- System design
- Artificial intelligence (focusing in LLM ecosystem)
- Computer Network
- Cloud Computing
- Virtualization
- Infrastructure as a code (IaC)
- Monitoring and Observability
- CI/CD
- Tests
- DevSecOps
- DevOps
- Containerizations
- Kubernetes (Admin - CKA)
- Kubernetes (Dev/User - CKAD)
- Kubernetes (Admin/Sec Engineer - CKS)
- DevOps core tools

Follow strictly these rules when creating your answer:
- For each category, you must create the question and also the respective answer.
- Each question have one single answer.
- Each question is answered as you are talking to a DevOps Engineer.
- The ideal size of the question's answer should be something between 2 or 3 paragraphs (250~450 characteres).
- It's preferred that the questions focus in principles and fundamentals of that respective area.
- You only answer this prompt with a Markdown block showing the markdown file formated containing the category name, the questions and each question's answer, following this format:

<!-- START_OUTPUT_STRUCTURE_EXAMPLE -->

# CATEGORY_NAME

### 1. QUESTION

Answer.

### 2. QUESTION

Answer.

---

# CATEGORY_NAME

### 1. QUESTION

Answer.

### 2. QUESTION

Answer.

---

<!-- END_OUTPUT_STRUCTURE_EXAMPLE -->

```

## Important notes
- Commits into main branch on questions.md will automatically build a new version of questions.yaml (via GitHub actions).
- This is a vibe coded project very simple. This development is still in progress.
- I understand that answers could be not 100% accurated as it was created with AI (I'm revisioning each answer to solve that problem). I also understand this is an application to help in remembering concepts, not about learning those from zero indeed. If you will use this project for some way, keep it in mind!
