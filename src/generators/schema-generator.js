import type_picker from './type-picker';

const api = {

  createSchemaList(schema) {
    if (!schema.properties) {
      return 'N/A';
    }

    const item_indent = '  ';
    const items = Object.keys(schema.properties).map(property_key => {
      const prop = schema.properties[property_key];
      const type = type_picker.extractType(prop);
      let value = `${property_key}`;

      value += ` (${type})`;

      const is_required = schema.required && schema.required.some(required_key => required_key === property_key);

      if (!is_required) {
        value += ' (optional)';
      }

      return `${item_indent}- ${value}`;
    });
    return [
      `- (${schema.type})`,
      items.join('\n'),
    ].join('\n');
  },

};

export default api;
