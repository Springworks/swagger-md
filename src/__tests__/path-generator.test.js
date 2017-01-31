import fixtures from '../../test-util/fixtures';
import generator from '../generators/path-generator';

describe('generatePath', () => {

  describe('with an API spec having mixed properties; some defined, some omitted', () => {
    let path_api_spec;

    beforeEach(() => {
      path_api_spec = fixtures.loadSwaggerSpec('path/mixed-properties');
    });

    it('should render markdown and omit unspecified data, e.g. descriptions, schemas', () => {
      const key = Object.keys(path_api_spec)[0];
      const markdown_str = generator.generatePath(key, path_api_spec[key]);
      expect(markdown_str).toMatchSnapshot();
    });

  });

  describe('with body parameter having a schema', () => {
    let path_api_spec;

    beforeEach(() => {
      path_api_spec = fixtures.loadSwaggerSpec('path/post-with-params');
    });

    it('should include schema definition in result', () => {
      const key = Object.keys(path_api_spec)[0];
      const markdown_str = generator.generatePath(key, path_api_spec[key]);
      expect(markdown_str).toMatchSnapshot();
    });

  });

});
