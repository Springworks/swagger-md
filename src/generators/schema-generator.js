import type_picker from './type-picker';
import linkToHeader from './link-to-header';

function extractDefinitionName(ref) {
  return ref.split('/').pop();
}

function nextIndentation(indentation) {
  return `${indentation}  `;
}

function formatSchemaType(schema) {
  if (schema.$ref) {
    return linkToHeader(extractDefinitionName(schema.$ref));
  }
  const type = type_picker.extractType(schema);
  if (schema.format) {
    return `(${type}: ${schema.format})`;
  }
  if (type === 'string' && schema.enum) {
    return `(${type}: ${schema.enum.join(', ')})`;
  }
  return `(${type})`;
}

function formatListItem(name, schema, indentation, is_optional) {
  const type = formatSchemaType(schema);
  const desc = schema.description ? ` ${schema.description}` : '';
  const all_of = schema.allOf ? ' All of:' : '';
  return `${indentation}- ${name}${name ? ' ' : ''}${type}${is_optional ? ' (optional)' : ''}${desc}${all_of}`;
}

function recursiveAppendLines(lines, name, schema, indentation, is_optional) {
  lines.push(formatListItem(name, schema, indentation, is_optional));

  if (schema.allOf) {
    schema.allOf.forEach(sub_schema => {
      recursiveAppendLines(lines, '', sub_schema, nextIndentation(indentation), false);
    });
  }
  else if (schema.type === 'object' && schema.properties) {
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
