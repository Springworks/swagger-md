const tsc = require('typescript');
const compilerOptions = require('./tsconfig.json').compilerOptions;

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts')) {
      return tsc.transpile(src, compilerOptions, path, []);
    }
    return src;
  },
};
