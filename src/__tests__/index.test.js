import fs from 'fs';
import fixtures from '../../test-fixtures/fixtures';
import converter from '../index';

describe('convertToMarkdown', () => {

  describe('with a valid, parsed Swagger spec', () => {
    let swagger_api_spec;

    beforeEach(() => {
      swagger_api_spec = fixtures.loadSwaggerSpec('pet-store');
    });

    describe('omitting response_provider function', () => {

      it('should not include examples in result', () => {
        return converter.convertToMarkdown(swagger_api_spec, null).then(markdown_str => {
          expect(markdown_str).not.toMatch('Example response');
        });
      });

    });

    describe('providing a response_example_provider function, to generate examples for each response', () => {

      it('should return contents of a valid .md file', () => {
        function response_example_provider() {
          return [
            '```json',
            JSON.stringify({ foo: 'bar' }, null, 2),
            '```',
          ].join('\n');
        }

        return converter.convertToMarkdown(swagger_api_spec, { response_example_provider }).then(markdown_str => {
          expect(markdown_str).toMatchSnapshot();
        });
      });

    });

  });

  describe('resolving local refs in separate files', () => {
    let expected_markdown;

    beforeEach(done => {
      fs.readFile('test-fixtures/fixtures/api/api.md', { encoding: 'utf8' }, (err, str) => {
        if (err) {
          done(err);
          return;
        }
        expected_markdown = str;
        done();
      });
    });

    it('should resolve everything', () => {
      return converter.convertToMarkdown('test-fixtures/fixtures/api/api.json', null).then(markdown_str => {
        expect(markdown_str).toBe(expected_markdown);
      });
    });

  });

});
