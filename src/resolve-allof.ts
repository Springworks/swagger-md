import * as _ from 'lodash';

export default function resolveAllOf(spec: any): any {
  if (!spec || typeof spec !== 'object') {
    return spec;
  }
  if (Array.isArray(spec)) {
    return spec.map(resolveAllOf);
  }
  const merged = spec.allOf ? inlineAllOf(spec) : spec;
  return _.mapValues(merged, resolveAllOf);
}

function inlineAllOf(spec: any): any {
  const copy = _.omit(spec, 'allOf');
  return _.mergeWith(copy, ...spec.allOf, unionIfArray);
}

function unionIfArray(dest: any, src: any): Array<any> | undefined {
  return Array.isArray(dest) ? _.union(dest, src) : undefined;
}
