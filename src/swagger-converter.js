import intro_generator from './generators/intro-generator';
import path_generator from './generators/path-generator';
import definition_generator from './generators/definition-generator';
import toc_generator from './generators/toc-generator';

function convertPaths(paths, opt_response_example_provider) {
  return [
    '## Endpoints',
    Object.keys(paths).map(path_key => {
      return path_generator.generatePath(path_key, paths[path_key], opt_response_example_provider);
    }).join('\n\n'),
  ].join('\n\n');
}

function convertDefinitions(definitions) {
  return [
    '## Definitions',
    Object.keys(definitions).map(definition_key => {
      return definition_generator.generateDefinition(definition_key, definitions[definition_key]);
    }).join('\n\n'),
  ].join('\n\n');
}

const api = {
  convertToMarkdown(swagger_spec, opt_response_example_provider) {
    const intro = intro_generator.generateApiIntro(swagger_spec);
    const paths = convertPaths(swagger_spec.paths, opt_response_example_provider);
    const definitions = convertDefinitions(swagger_spec.definitions || {});
    const markdown = `${intro}\n\n${paths}\n\n${definitions}\n`;
    return toc_generator.generateTableOfContents(markdown);
  },
};

export default api;
