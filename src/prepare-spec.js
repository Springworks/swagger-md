import RefParser from 'json-schema-ref-parser';

export default function prepareSpec(spec, options) {
  const parser = new RefParser();
  const external = !!(options && options.external === true);
  return parser.dereference(spec, { external });
}
