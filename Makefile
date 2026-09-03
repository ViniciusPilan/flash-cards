# Variables
MD_FILE = questions.md
YAML_FILE = questions.yaml
PORT = 8000

# Create virtual environment and install dependencies
setup:
	python3 -m venv .venv
	.venv/bin/python3 -m pip install pyyaml

# Convert Markdown to YAML
convert:
	.venv/bin/python3 questions.py $(MD_FILE) $(YAML_FILE)

# Run HTTP server
serve:
	.venv/bin/python3 -m http.server $(PORT)

# Clean up virtual environment and generated YAML
clean:
	rm -rf $(VENV) $(YAML_FILE)

# Display available commands
help:
	@echo "Usage:"
	@echo "  make setup    - Create virtual environment and install dependencies"
	@echo "  make convert  - Convert $(MD_FILE) to $(YAML_FILE)"
	@echo "  make serve    - Start Python HTTP server on port $(PORT)"
	@echo "  make clean    - Remove virtual environment and generated files"