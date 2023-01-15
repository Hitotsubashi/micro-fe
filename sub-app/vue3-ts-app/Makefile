docker: copy
	- docker build -t vue3-ts-app:latest .
	- @rm package-install.json
copy:
	@sed -e /\"version\"/d package.json > package-install.json
