import prepareSpec from './prepare-spec';
import resolveAllOf from './resolve-allof';

export default function resolveApiSpec(spec: any, options: any): any {
  return prepareSpec(spec, options).then(resolveAllOf);
}
