# swagger-md
Converts [Swagger API](http://swagger.io) spec to [Markdown format](https://help.github.com/articles/markdown-basics/). 

## Usage

Install NPM module:
```
npm install swagger-md
```

Convert Swagger API spec to Markdown format:
```
import swagger_md from 'swagger-md';
import swagger_spec from './swagger-api-spec.json';

function optionalResponseExampleProvider(path, method) {
  return [
    '```json',
    '{ "foo": 1 },
    '```',
  ].join('\n');
} 

const markdown_str = swagger_md.convertToMarkdown(swagger_spec, optionalResponseExampleProvider);

// Use markdown_str, e.g. write to "api.md"
```

## What can it do?

See `./test-util/fixtures/markdown` and `./test-util/fixtures/swagger` for examples of a `swagger.json` converted to Markdown.

Want it do handle more? Feel free to contribute!

## Contributing

1. Write a new test with new fixtures or extend the existing ones
2. Make a PR
3. :pray: :clap:
