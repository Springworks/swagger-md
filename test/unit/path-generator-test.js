import fixtures from '../../test-util/fixtures';
import generator from '../../src/generators/path-generator';

describe('test/unit/path-generator-test.js', () => {

  describe('generatePath', () => {

    describe('with an API spec having mixed properties; some defined, some omitted', () => {
      let path_api_spec;
      let swagger_api_md_str;

      beforeEach(() => {
        path_api_spec = fixtures.loadSwaggerSpec('path/mixed-properties');
      });

      beforeEach(() => {
        swagger_api_md_str = fixtures.loadSwaggerSpecMarkdown('path/mixed-properties.md');
      });

      it('should render markdown and omit unspecified data, e.g. descriptions, schemas', () => {
        const key = Object.keys(path_api_spec)[0];
        const markdown_str = generator.generatePath(key, path_api_spec[key]);
        markdown_str.should.eql(swagger_api_md_str);
        const markdown_str_with_added_newline = `${markdown_str}\n`;
        markdown_str_with_added_newline.should.eql(swagger_api_md_str);
      });

    });

  });

});
