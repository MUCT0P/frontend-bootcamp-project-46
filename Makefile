install:
	npm ci
	
gendiff:
	node bin/gendiff.js
	
test:
	npx jest

lint:
	npx eslint .
	
test-coverage:
	npm test -- --coverage --coverageProvider=v8

