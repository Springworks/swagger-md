import schema_generator from './schema-generator';

const api = {

  generateDefinition(key: string, definition: any): string {
    const schema_list = schema_generator.createSchemaList(definition);
    return `### ${key}\n\n**Schema**\n\n${schema_list}`;
  },

};

export default api;
