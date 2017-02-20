import schema_generator from './schema-generator';
import createParametersTable from './request-parameters-table';

export type ResponseExampleProvider = (path: string, method: string) => string;

function generateMethods(path_key: string, path: any, response_example_provider: ResponseExampleProvider | undefined): Array<string> {
  return Object.keys(path).map(method => {
    const method_spec = path[method];
    return [
      `### ${method.toUpperCase()} ${path_key}`,
      deprecationWarning(method_spec),
      method_spec.description,
      externalDocs(method_spec, 'description'),
      externalDocs(method_spec, 'url'),
      generateParameters(method_spec.parameters || []),
      generateBodySchema(method_spec.parameters || []),
      generateResponses(method_spec.responses),
      generateExampleResponse(path_key, method, response_example_provider),
    ].filter(Boolean).join('\n\n');
  });
}

function generateParameters(params: any): string | undefined {
  const table = createParametersTable(params);
  return table && `**Parameters**\n\n${table}`;
}

function generateBodySchema(params: Array<any>): string | undefined {
  const body = params.filter(param => param.in === 'body')[0];
  if (!body || !body.schema || body.schema.$ref) {
    return undefined;
  }
  const list = schema_generator.createSchemaList(body.schema);
  return `**Request Body**\n\n${list}`;
}

function generateResponses(responses: any): string {
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

function generateResponseSchema(response: any): string {
  if (!response.schema) {
    return 'N/A';
  }
  return schema_generator.createSchemaList(response.schema);
}

function generateExampleResponse(path_key: string, method: string, response_example_provider: ResponseExampleProvider | undefined): string | undefined {
  if (!response_example_provider) {
    return undefined;
  }
  const example_response = response_example_provider(path_key.toLowerCase(), method.toLowerCase());
  return [
    '#### Example response',
    example_response,
  ].join('\n\n');
}

function deprecationWarning(spec: any): string | null {
  return spec.deprecated ? '> :warning: **deprecated**' : null;
}

function externalDocs(spec: any, key: string): string | null {
  return spec.externalDocs && spec.externalDocs[key] ? spec.externalDocs[key] : null;
}


const api = {

  generatePath(path_key: string, path: any, response_example_provider: ResponseExampleProvider | undefined): string {
    return generateMethods(path_key, path, response_example_provider).join('\n\n');
  },

};

export default api;
