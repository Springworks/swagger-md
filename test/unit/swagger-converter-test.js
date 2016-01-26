import fixtures from '../../test-util/fixtures';
import converter from '../../src/swagger-converter';

describe('test/unit/swagger-converter-test.js', () => {

  describe('convertToMarkdown', () => {

    describe('with a valid, parsed Swagger spec', () => {
      let swagger_api_spec;
      let swagger_api_md_str;

      beforeEach(() => {
        swagger_api_spec = fixtures.loadSwaggerSpec();
      });

      describe('omitting response_provider function', () => {

        beforeEach(() => {
          swagger_api_md_str = fixtures.loadSwaggerSpecMarkdown();
        });

        it('should return contents of a valid .md file', () => {
          const markdown_str = converter.convertToMarkdown(swagger_api_spec, null);
          markdown_str.should.eql(swagger_api_md_str);
        });

      });

      describe('providing a response_provider function, to generate examples for each response', () => {
        function responseProvider() {
          return [
            '```json',
            fixtures.loadResponseExample(),
            '```',
          ].join('\n');
        }

        beforeEach(() => {
          swagger_api_md_str = fixtures.loadSwaggerSpecMarkdown('pet-store-with-response-examples.md');
        });

        it('should return contents of a valid .md file', () => {
          const markdown_str = converter.convertToMarkdown(swagger_api_spec, responseProvider);
          markdown_str.should.eql(swagger_api_md_str);
        });

      });

    });

  });

});
