import fixtures from '../../test-util/fixtures';
import generator from '../generators/toc-generator';

describe('generateTableOfContents', () => {

  it('should return the TOC section', () => {
    const paths_header = 'Endpoints';
    const definitions_header = 'Definitions';
    const { paths, definitions } = fixtures.loadSwaggerSpec('pet-store');
    const toc = generator.generateTableOfContents(paths_header, paths, definitions_header, definitions);
    expect(toc).toMatchSnapshot();
  });

});
