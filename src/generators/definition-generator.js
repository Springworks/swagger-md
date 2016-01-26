/**
 * Generates markdown for a definition.
 */

import schema_generator from './schema-generator';

const api = {

  generateDefinition(key, definition) {
    const title = `### ${key}`;
    const schema_list = schema_generator.createSchemaList(definition);
    const schema = [
      '**Schema**',
      schema_list,
    ].join('\n\n');
    return [
      title,
      schema,
    ].join('\n\n');
  },

};

export default api;
