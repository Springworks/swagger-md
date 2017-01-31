import intro_generator from './generators/intro-generator';
import path_generator from './generators/path-generator';
import toc_generator from './generators/toc-generator';

const paths_header = 'Endpoints';

function convertPaths(paths, response_example_provider) {
  return [
    `## ${paths_header}`,
    Object.keys(paths).map(path_key => {
      return path_generator.generatePath(path_key, paths[path_key], response_example_provider);
    }).join('\n\n'),
  ].join('\n\n');
}

const api = {
  convertToMarkdown(swagger_spec, options) {
    return Promise.resolve().then(() => {
      const opts = options || {};
      const intro = intro_generator.generateApiIntro(swagger_spec);
      const toc = toc_generator.generateTableOfContents(paths_header, swagger_spec.paths);
      const paths = convertPaths(swagger_spec.paths, opts.response_example_provider);
      return `${intro}\n\n${toc}\n\n${paths}\n`;
    });
  },
};

export default api;
