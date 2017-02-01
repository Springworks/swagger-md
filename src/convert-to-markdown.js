import resolveApiSpec from './resolve-api-spec';
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

export default function convertToMarkdown(swagger_spec, options) {
  return resolveApiSpec(swagger_spec, options).then(spec => {
    const opts = options || {};
    const intro = intro_generator.generateApiIntro(spec);
    const toc = toc_generator.generateTableOfContents(paths_header, spec.paths);
    const paths = convertPaths(spec.paths, opts.response_example_provider);
    return `${intro}\n\n${toc}\n\n${paths}\n`;
  });
}
