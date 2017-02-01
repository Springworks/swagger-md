# swagger-md

[![Greenkeeper badge](https://badges.greenkeeper.io/Springworks/swagger-md.svg)](https://greenkeeper.io/)

Converts [Swagger API](http://swagger.io) spec to [Markdown format](https://help.github.com/articles/markdown-basics/). 

## Usage

Install NPM module:
```
npm install swagger-md
```

Convert Swagger API spec to Markdown format:

```js
import swagger_md from 'swagger-md';
import swagger_spec from './swagger-api-spec.json';

function responseExampleProvider(path, method) {
  return [
    '```json',
    '{ "foo": 1 }',
    '```',
  ].join('\n');
} 

swagger_md.convertToMarkdown(swagger_spec, { response_example_provider: responseExampleProvider }).then(markdown_str => {
  // Use markdown_str, e.g. write to "api.md"
});
```


```js
// It is also possible to pass a path to the root file of the API spec (can be json or yaml) and supports local file refs.
const path_to_spec = 'path/to/api-spec.json';

swagger_md.convertToMarkdown(path_to_spec).then(markdown_str => {
  // refs to other local files are resolved and the markdown contains the entire API
});
```


`resolveApiSpec` resolves the API spec in the same way as `convertToMarkdown` but returns the resolved object without converting it to markdown

```js
const path_to_spec = 'path/to/api-spec.json';
const options = {
  // optionally specify that external refs should be fetched and resolved
  external: true
};

swagger_md.resolveApiSpec(path_to_spec, options).then(spec => {
  // spec == the resolved API spec
});
```


To use the swagger-md in a CommonJS module environment the usage statement should look like:

```js
var swagger_md = require('swagger-md').default;
...
```

## What can it do?

See `./test-fixtures/swagger` for examples of a `swagger.json` converted to Markdown.

Want it do handle more? Feel free to contribute!

## Contributing

1. Write a new test with new fixtures or extend the existing ones
2. Make a PR
3. :pray: :clap:
