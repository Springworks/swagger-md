import intro_generator from './generators/intro-generator';
import path_generator from './generators/path-generator';
import definition_generator from './generators/definition-generator';

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
    const result = {
      intro: intro_generator.generateApiIntro(swagger_spec),
      paths: convertPaths(swagger_spec.paths, opt_response_example_provider),
      definitions: convertDefinitions(swagger_spec.definitions),
    };

    let components = [result.intro];
    components = components.concat(result.paths);
    components = components.concat(result.definitions);
    const joined = components.join('\n\n');
    return `${joined}\n`;
  },
};

export default api;
