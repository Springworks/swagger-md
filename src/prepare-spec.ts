import RefParser = require('json-schema-ref-parser');

export default function prepareSpec(spec: any, options: any): Promise<any> {
  const parser = new RefParser();
  const external = !!(options && options.external === true);
  return parser.dereference(spec, { external });
}
