import RefParser from 'json-schema-ref-parser';

export default function prepareSpec(spec) {
  const parser = new RefParser();
  return parser.dereference(spec, { external: false });
}
