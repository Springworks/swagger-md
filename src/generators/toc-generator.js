import linkToHeader from './link-to-header';

const legacy_toc_comment = '<!-- TOC -->';
const legacy_toc_end_comment = '<!-- TOC END -->';

const api = {

  generateTableOfContents(paths_header, paths, definitions_header, definitions) {
    const toc_array = [];

    toc_array.push(legacy_toc_comment);

    toc_array.push(`- ${linkToHeader(paths_header)}`);

    Object.keys(paths).forEach(path => {
      const methods = paths[path];
      Object.keys(methods).forEach(method => {
        const header = `${method.toUpperCase()} ${path}`;
        const deprecated = methods[method].deprecated ? ' _`deprecated`_' : '';
        toc_array.push(`  - ${linkToHeader(header)}${deprecated}`);
      });
    });

    toc_array.push(`- ${linkToHeader(definitions_header)}`);

    Object.keys(definitions).forEach(header => {
      toc_array.push(`  - ${linkToHeader(header)}`);
    });

    toc_array.push('', legacy_toc_end_comment);

    return toc_array.join('\n');
  },

};

export default api;
