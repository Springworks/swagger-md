function formatRef({ $ref }: { $ref: string }): string {
  return `$ref: \`${$ref}\``;
}

function getNumberType({ type, format }: { type: string, format: string }) {
  if (format === 'integer' || format === 'int32' || format === 'int64' || format === 'float' || format === 'double') {
    return format;
  }
  if (type === 'number' || type === 'integer') {
    return type;
  }
  return null;
}

function extractType(param: any): string {
  if (param.$ref) {
    return formatRef(param);
  }

  if (param.schema) {
    return extractType(param.schema);
  }

  const number_type = getNumberType(param);
  if (number_type) {
    return number_type;
  }

  const { type, format } = param;

  if (format) {
    return `${type}, ${format}`;
  }

  if (type) {
    return type;
  }

  return 'unspecified type';
}


const api = {
  formatRef,
  getNumberType,
  extractType,
};

export default api;
