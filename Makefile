# Create virtual environment and install dependencies
setup:
	python3 -m venv .venv
	.venv/bin/python3 -m pip install pyyaml

# Convert Markdown to YAML
convert:
	.venv/bin/python3 questions/converter.py \
		questions/inputs/concepts.md \
		app/inputs/concepts.yaml

	.venv/bin/python3 questions/converter.py \
		questions/inputs/tools.md \
		app/inputs/tools.yaml \

# Run HTTP server
serve:
	.venv/bin/python3 -m http.server -d app

# Display available commands
help:
	@echo "Usage:"
	@echo "  make setup    - Create virtual environment and install dependencies"
	@echo "  make convert  - Convert the markdown files of inputs folder to yaml files"
	@echo "  make serve    - Start Python HTTP server on port 8080"
