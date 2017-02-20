import linkToHeader from './link-to-header';

const api = {

  generateTableOfContents(paths_header: string, paths: any): string {
    const toc_array: Array<string> = [];

    toc_array.push(`- ${linkToHeader(paths_header)}`);

    Object.keys(paths).forEach(path => {
      const methods = paths[path];
      Object.keys(methods).forEach(method => {
        const header = `${method.toUpperCase()} ${path}`;
        const deprecated = methods[method].deprecated ? ' _`deprecated`_' : '';
        toc_array.push(`  - ${linkToHeader(header)}${deprecated}`);
      });
    });

    return toc_array.join('\n');
  },

};

export default api;
