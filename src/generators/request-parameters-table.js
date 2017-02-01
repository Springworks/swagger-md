import type_picker from './type-picker';
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
  if (param.$ref) {
    return type_picker.formatRef(param);
  }
  if (param.schema) {
    if (param.schema.$ref) {
      return type_picker.formatRef(param.schema);
    }
    return '';
  }

  let { type } = param;
  if (!type) {
    return '';
  }
  if (type === 'array') {
    type = `${type}, ${param.collectionFormat || 'csv'}`;
    if (param.items) {
      type = `${type} of ${formatParamType(param.items)}`;
    }
  }
  const number_type = type_picker.getNumberType(param);
  if (number_type) {
    return number_type;
  }

  const { format } = param;
  if (format) {
    return `${type}, ${format}`;
  }
  if (type === 'string' && param.enum) {
    return `${type}: ${param.enum.join(', ')}`;
  }
  return type;
}

function formatParamRange(param) {
  return formatRange(param, 'number', param.minimum, param.maximum, param.exclusiveMinimum, param.exclusiveMaximum) ||
         formatRange(param, 'length', param.minLength, param.maxLength, false, false) ||
         formatRange(param, 'items', param.minItems, param.maxItems, false, false);
}

function formatRange(param, type, min, max, exclusive_min, exclusive_max) {
  const has_min = typeof min === 'number';
  const has_max = typeof max === 'number';
  if (!has_min && !has_max) {
    return undefined;
  }
  let r = '';
  if (has_min) {
    r = `${min} ${exclusive_min ? '<' : '<='} `;
  }
  if (type === 'number') {
    r += type_picker.getNumberType(param) || type;
  }
  else {
    r += type;
  }
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
