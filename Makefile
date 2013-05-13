compile: less
	jekyll build

deploy: less
	git push

less:
	for file in $(basename $(notdir $(wildcard ./s/less/*.less))); do \
		lessc ./s/less/$${file}.less ./s/css/$${file}.css; \
	done;

serve:
	jekyll --server --auto
