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
  return formatRange('number', param.minimum, param.maximum, param.exclusiveMinimum, param.exclusiveMaximum) ||
         formatRange('length', param.minLength, param.maxLength, false, false) ||
         formatRange('items', param.minItems, param.maxItems, false, false);
}

function formatRange(type, min, max, exclusive_min, exclusive_max) {
  const has_min = typeof min === 'number';
  const has_max = typeof max === 'number';
  if (!has_min && !has_max) {
    return undefined;
  }
  let r = '';
  if (has_min) {
    r = `${min} ${exclusive_min ? '<' : '<='} `;
  }
  r += type;
  if (has_max) {
    r += ` ${exclusive_max ? '<' : '<='} ${max}`;
  }
  return `\`${r}\``;
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
