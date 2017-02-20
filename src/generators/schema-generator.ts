import type_picker from './type-picker';

function nextIndentation(indentation: string): string {
  return `${indentation}  `;
}

function formatSchemaType(schema: any): string {
  const type = type_picker.extractType(schema);
  if (type === 'string' && schema.enum) {
    return `(${type}: ${schema.enum.join(', ')})`;
  }
  return `(${type})`;
}

function formatListItem(name: string, schema: any, indentation: string, is_optional: boolean): string {
  const type = formatSchemaType(schema);
  const desc = schema.description ? ` ${schema.description}` : '';
  return `${indentation}- ${name}${name ? ' ' : ''}${type}${is_optional ? ' (optional)' : ''}${desc}`;
}

function recursiveAppendLines(lines: Array<string>, name: string, schema: any, indentation: string, is_optional: boolean): void {
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

  createSchemaList(schema: any): string {
    if (!schema.type && !schema.$ref) {
      return 'N/A';
    }
    const lines: Array<string> = [];
    recursiveAppendLines(lines, '', schema, '', false);
    return lines.join('\n');
  },

};

export default api;
