import type_picker from './type-picker';

function nextIndentation(indentation) {
  return `${indentation}  `;
}

function formatSchemaType(schema) {
  const type = type_picker.extractType(schema);
  if (type === 'string' && schema.enum) {
    return `(${type}: ${schema.enum.join(', ')})`;
  }
  return `(${type})`;
}

function formatListItem(name, schema, indentation, is_optional) {
  const type = formatSchemaType(schema);
  const desc = schema.description ? ` ${schema.description}` : '';
  return `${indentation}- ${name}${name ? ' ' : ''}${type}${is_optional ? ' (optional)' : ''}${desc}`;
}

function recursiveAppendLines(lines, name, schema, indentation, is_optional) {
  lines.push(formatListItem(name, schema, indentation, is_optional));

  if (schema.type === 'object' && schema.properties) {
    Object.keys(schema.properties).forEach(key => {
      const key_is_required = Array.isArray(schema.required) && schema.required.indexOf(key) >= 0;
      recursiveAppendLines(lines, key, schema.properties[key], nextIndentation(indentation), !key_is_required);
    });
  }
  else if (schema.type === 'array' && schema.items) {
    recursiveAppendLines(lines, '', schema.items, nextIndentation(indentation), false);
  }
}


const api = {

  createSchemaList(schema) {
    if (!schema.type && !schema.$ref) {
      return 'N/A';
    }
    const lines = [];
    recursiveAppendLines(lines, '', schema, '', false);
    return lines.join('\n');
  },

};

export default api;
