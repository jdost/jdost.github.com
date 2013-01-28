deploy: compile
	git push

compile:
	lessc ./s/less/base.less ./s/css/base.css
	lessc ./s/less/reset.less ./s/css/reset.css
	lessc ./s/less/misc.less ./s/css/misc.css
	lessc ./s/less/posts.less ./s/css/posts.css

serve:
	jekyll --server --auto
