/**
 * Determines type of a parameter.
 */

function generateDefinitionReference(ref) {
  if (!ref) {
    throw new Error(`Invalid ref to definition (got ref: ${ref})`);
  }
  const definition_name = ref.split('/').pop();
  return `${definition_name}`;
}

const api = {

  extractType(param) {
    if (param.type) {
      return param.type;
    }

    if (param.$ref) {
      return generateDefinitionReference(param.$ref);
    }

    if (param.schema && param.schema.$ref) {
      return generateDefinitionReference(param.schema.$ref);
    }

    return 'unspecified type';
  },

};

export default api;
