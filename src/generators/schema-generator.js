import type_picker from './type-picker';
import linkToHeader from './link-to-header';

function extractDefinitionName(ref) {
  const definition_name = ref.split('/').pop();
  return `${definition_name}`;
}

function propertyListItem(property_key, prop, required_properties) {
  let value;

  if (property_key === '$ref') {
    value = linkToHeader(extractDefinitionName(prop));
  }
  else {
    let type = type_picker.extractType(prop);
    value = `${property_key}`;

    if (type === 'string' && prop.enum) {
      type = `${type}: ${prop.enum.join(', ')}`;
    }

    value += ` (${type})`;

    const is_required = required_properties && required_properties.some(required_key => required_key === property_key);

    if (!is_required) {
      value += ' (optional)';
    }
  }

  return `- ${value}`;
}

const api = {

  createSchemaList(schema, item_indent = '  ') {
    if (schema.$ref) {
      const definition_name = extractDefinitionName(schema.$ref);
      return `- ${linkToHeader(definition_name)}`;
    }

    if (schema.allOf) {
      const joined = schema.allOf.map(item => {
        return api.createSchemaList(item, item_indent + item_indent);
      }).join(`\n${item_indent}`);

      return `- (object) All of:\n${item_indent + joined}`;
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
