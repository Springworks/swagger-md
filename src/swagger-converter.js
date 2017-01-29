import intro_generator from './generators/intro-generator';
import path_generator from './generators/path-generator';
import definition_generator from './generators/definition-generator';
import toc_generator from './generators/toc-generator';

const paths_header = 'Endpoints';
const definitions_header = 'Definitions';

function convertPaths(paths, opt_response_example_provider) {
  return [
    `## ${paths_header}`,
    Object.keys(paths).map(path_key => {
      return path_generator.generatePath(path_key, paths[path_key], opt_response_example_provider);
    }).join('\n\n'),
  ].join('\n\n');
}

function convertDefinitions(definitions) {
  return [
    `## ${definitions_header}`,
    Object.keys(definitions).map(definition_key => {
      return definition_generator.generateDefinition(definition_key, definitions[definition_key]);
    }).join('\n\n'),
  ].join('\n\n');
}

const api = {
  convertToMarkdown(swagger_spec, opt_response_example_provider) {
    return Promise.resolve().then(() => {
      const intro = intro_generator.generateApiIntro(swagger_spec);
      const toc = toc_generator.generateTableOfContents(paths_header, swagger_spec.paths, definitions_header, swagger_spec.definitions || {});
      const paths = convertPaths(swagger_spec.paths, opt_response_example_provider);
      const definitions = convertDefinitions(swagger_spec.definitions || {});
      return `${intro}\n\n${toc}\n\n${paths}\n\n${definitions}\n`;
    });
  },
};

export default api;
