import type_picker from './type-picker';
import linkToHeader from './link-to-header';
import createTable from './md-table';


export default function createParametersTable(params) {
  if (!params.length) {
    return undefined;
  }

  return createTable([
    'in',
    'name',
    'type',
    'required',
    'description',
    'pattern',
    'range',
    'default',
    'unique',
    'multiple_of',
  ], params.map(param => ({
    in: param.in,
    name: param.name,
    type: formatParamType(param),
    required: !!param.required,
    description: param.description,
    pattern: formatCode(param.pattern, false),
    range: formatParamRange(param),
    default: formatCode(param.default, true),
    unique: param.uniqueItems,
    multiple_of: param.multipleOf,
  })));
}


function formatParamType(param) {
  if (param.schema) {
    if (param.schema.$ref) {
      return linkToHeader(type_picker.extractType(param.schema));
    }
    return '';
  }
  let type = param.type;
  if (!type) {
    return '';
  }
  if (type === 'array') {
    type = `${type}, ${param.collectionFormat || 'csv'}`;
    if (param.items) {
      type = `${type} of ${formatParamType(param.items)}`;
    }
  }
  if (param.format) {
    type = `${type}, ${param.format}`;
  }
  if (type === 'string' && param.enum) {
    type = `${type}: ${param.enum.join(', ')}`;
  }
  return type;
}

function formatParamRange(param) {
  let r = '';
  if (typeof param.minimum === 'number') {
    r = `${param.exclusiveMinimum ? '>' : '>='} ${param.minimum}`;
  }
  if (typeof param.maximum === 'number') {
    r += `${r ? ' && ' : ''}${param.exclusiveMaximum ? '<' : '<='} ${param.maximum}`;
  }
  if (!r) {
    if (typeof param.minLength === 'number') {
      r = `>= ${param.minLength}`;
    }
    if (typeof param.maxLength === 'number') {
      r += `${r ? ' && ' : ''}<= ${param.maxLength}`;
    }
  }
  if (!r) {
    if (typeof param.minItems === 'number') {
      r = `>= ${param.minItems}`;
    }
    if (typeof param.maxItems === 'number') {
      r += `${r ? ' && ' : ''}<= ${param.maxItems}`;
    }
  }
  return r ? `\`${r}\`` : '';
}

function formatCode(value, as_json) {
  if (value === undefined) {
    return undefined;
  }
  if (as_json) {
    return `\`${JSON.stringify(value)}\``;
  }
  return `\`${value}\``;
}
