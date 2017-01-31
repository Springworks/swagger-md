import fixtures from '../../test-util/fixtures';
import converter from '../../src/swagger-converter';

describe('test/unit/swagger-converter-test.js', () => {

  describe('convertToMarkdown', () => {

    describe('with a valid, parsed Swagger spec', () => {
      let swagger_api_spec;

      beforeEach(() => {
        swagger_api_spec = fixtures.loadSwaggerSpec();
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

  });

});
