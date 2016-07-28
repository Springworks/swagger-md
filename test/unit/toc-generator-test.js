import fixtures from '../../test-util/fixtures';
import generator from '../../src/generators/toc-generator';

describe('test/unit/toc-generator-test.js', () => {
  const paths_header = 'Endpoints';
  const definitions_header = 'Definitions';
  let paths;
  let definitions;
  let expected_md_toc;

  beforeEach(() => {
    const swagger_api_spec = fixtures.loadSwaggerSpec();
    paths = swagger_api_spec.paths;
    definitions = swagger_api_spec.definitions;
    expected_md_toc = fixtures.loadSwaggerSpecMarkdown('pet-store-toc.md');
  });

  describe('generateTableOfContents', () => {

    it('should return the TOC section', () => {
      const toc = generator.generateTableOfContents(paths_header, paths, definitions_header, definitions);
      toc.should.eql(expected_md_toc);
    });

  });

});
