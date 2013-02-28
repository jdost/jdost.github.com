deploy: less
	git push

compile: less
	jekyll

less:
	for file in $(basename $(notdir $(wildcard ./s/less/*.less))); do \
		lessc ./s/less/$${file}.less ./s/css/$${file}.css; \
	done;

serve:
	jekyll --server --auto
