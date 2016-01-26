/**
 * Generates markdown for a specific Swagger path,
 * including all of its methods.
 */

import schema_generator from './schema-generator';
import type_picker from './type-picker';

function generateMethods(path_key, path) {
  return Object.keys(path).map(method => {
    const method_spec = path[method];
    return [
      `### ${method.toUpperCase()} ${path_key}`,
      method_spec.description,
      generateParameters(method_spec.parameters),
      generateResponses(method_spec.responses),
    ].join('\n\n');
  });
}

function generateResponses(responses) {
  return Object.keys(responses).map(response_key => {
    const response = responses[response_key];
    return [
      `#### Response: ${response_key}`,
      response.description,
      '**Schema**',
      generateResponseSchema(response.schema),
    ].join('\n\n');
  }).join('\n\n');
}

function generateResponseSchema(schema) {
  if (!schema) {
    return `N/A`;
  }

  return schema_generator.createSchemaList(schema);
  //
  //if (schema.$ref) {
  //  return `- ${generateDefinitionReference(schema.$ref)}`;
  //}
  //else if (schema.type) {
  //  let value = `- (${schema.type})`;
  //  if (schema.items) {
  //    value += `\n  - ${generateDefinitionReference(schema.items.$ref)}`;
  //  }
  //  return value;
  //}
  //
  //throw new Error(`Unsupported schema: ${schema}`);
}


function generateParameters(params) {
  if (!params || !params.length) {
    return undefined;
  }
  const param_list_str = params.map(param => {
    let value = `- ${param.in}: ${param.name} (${type_picker.extractType(param)}) - ${param.description}`;

    if (!param.required) {
      value += ' (optional)';
    }

    return value;
  }).join('\n');

  return [
    '**Parameters**',
    param_list_str,
  ].join('\n\n');
}

const api = {

  generatePath(path_key, path) {
    return generateMethods(path_key, path).join('\n\n');
  },

};

export default api;
