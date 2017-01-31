import prepareSpec from './prepare-spec';
import resolveAllOf from './resolve-allof';
import intro_generator from './generators/intro-generator';
import toc_generator from './generators/toc-generator';
import path_generator from './generators/path-generator';

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
    return prepareSpec(swagger_spec).then(resolveAllOf).then(spec => {
      const opts = options || {};
      const intro = intro_generator.generateApiIntro(spec);
      const toc = toc_generator.generateTableOfContents(paths_header, spec.paths);
      const paths = convertPaths(spec.paths, opts.response_example_provider);
      return `${intro}\n\n${toc}\n\n${paths}\n`;
    });
  },
};

export default api;
