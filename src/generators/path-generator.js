/**
 * Generates markdown for a specific Swagger path,
 * including all of its methods.
 */

import schema_generator from './schema-generator';
import type_picker from './type-picker';

function generateMethods(path_key, path, opt_response_example_provider) {
  return Object.keys(path).map(method => {
    const method_spec = path[method];
    return [
      `### ${method.toUpperCase()} ${path_key}`,
      method_spec.description,
      generateParameters(method_spec.parameters),
      generateResponses(method_spec.responses),
      generateExampleResponse(path_key, method, opt_response_example_provider),
    ].filter(Boolean).join('\n\n');
  });
}

function generateResponses(responses) {
  return Object.keys(responses).map(response_key => {
    const response = responses[response_key];
    const schema = generateResponseSchema(response);
    return [
      `#### Response: ${response_key}`,
      response.description,
      '**Schema**',
      schema,
    ].join('\n\n');
  }).join('\n\n');
}

function generateResponseSchema(response) {
  if (!response.schema) {
    return `N/A`;
  }
  return schema_generator.createSchemaList(response.schema);
}


function generateParameters(params) {
  if (!params || !params.length) {
    return undefined;
  }
  const param_list_str = params.map(param => {
    const param_type = type_picker.extractType(param);
    let value = `- ${param.in}: ${param.name} (${param_type})`;

    if (param.description) {
      value += ` - ${param.description}`;
    }

    if (!param.required) {
      value += ' (optional)';
    }

    if (param.schema) {
      const schema_definition = schema_generator.createSchemaList(param.schema);
      const schema_definition_params = schema_definition.split('\n').slice(1).join('\n');
      if (schema_definition_params.length) {
        value += `\n${schema_definition_params}`;
      }
    }

    return value;
  }).join('\n');

  return [
    '**Parameters**',
    param_list_str,
  ].join('\n\n');
}

function generateExampleResponse(path_key, method, opt_response_example_provider) {
  if (!opt_response_example_provider) {
    return undefined;
  }
  const example_response = opt_response_example_provider(path_key.toLowerCase(), method.toLowerCase());
  return [
    '#### Example response',
    example_response,
  ].join('\n\n');
}

const api = {

  generatePath(path_key, path, opt_response_example_provider) {
    return generateMethods(path_key, path, opt_response_example_provider).join('\n\n');
  },

};

export default api;
