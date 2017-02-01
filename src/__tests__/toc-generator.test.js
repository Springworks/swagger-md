import fixtures from '../../test-fixtures/fixtures';
import generator from '../generators/toc-generator';

describe('generateTableOfContents', () => {

  it('should return the TOC section', () => {
    const paths_header = 'Endpoints';
    const { paths } = fixtures.loadSwaggerSpec('pet-store');
    const toc = generator.generateTableOfContents(paths_header, paths);
    expect(toc).toMatchSnapshot();
  });

});
