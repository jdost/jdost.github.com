deploy:
	git push origin remote

compile:
	#lessc ./s/less/[^.]*.less ./s/css/*.css
	lessc ./s/less/base.less ./s/css/base.css

serve:
	jekyll --server --auto
