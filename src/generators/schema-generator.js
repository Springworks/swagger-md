import type_picker from './type-picker';

function extractDefinitionName(ref) {
  const definition_name = ref.split('/').pop();
  return `${definition_name}`;
}

function propertyListItem(property_key, prop, required_properties) {
  let value;

  if (property_key === '$ref') {
    value = `(${extractDefinitionName(prop)})`;
  }
  else {
    const type = type_picker.extractType(prop);
    value = `${property_key}`;

    value += ` (${type})`;

    const is_required = required_properties && required_properties.some(required_key => required_key === property_key);

    if (!is_required) {
      value += ' (optional)';
    }
  }

  return `- ${value}`;
}

const api = {

  createSchemaList(schema) {
    if (schema.$ref) {
      const definition_name = extractDefinitionName(schema.$ref);
      return `- (${definition_name})`;
    }

    if (!schema.type) {
      return 'N/A';
    }

    let enumerable;
    if (schema.type === 'object' && schema.properties) {
      enumerable = schema.properties;
    }
    else if (schema.type === 'array' && schema.items) {
      enumerable = schema.items;
    }

    let items = [];
    if (enumerable) {
      const item_indent = '  ';
      items = Object.keys(enumerable).map(property_key => {
        const value = propertyListItem(property_key, enumerable[property_key], schema.required);
        return item_indent + value;
      });
    }

    return [
      `- (${schema.type})`,
      items.join('\n'),
    ].join('\n');
  },

};

export default api;
