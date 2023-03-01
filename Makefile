install:
	npm ci
	
gendiff:
	node bin/gendiff.js
	
test:
	npx jest --coverage

lint:
	npx eslint .
	
test-coverage:
	npm test -- --coverage --coverageProvider=v8

