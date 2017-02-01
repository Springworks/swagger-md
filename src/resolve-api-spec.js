import prepareSpec from './prepare-spec';
import resolveAllOf from './resolve-allof';

export default function resolveApiSpec(spec, options) {
  return prepareSpec(spec, options).then(resolveAllOf);
}
