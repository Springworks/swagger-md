import type_picker from '../generators/type-picker';

describe('formatRef', () => {

  it('should return the ref prefixed with "$ref "', () => {
    const param = { $ref: '#/definitions/Error' };
    const formatted = type_picker.formatRef(param);
    expect(formatted).toBe('$ref: `#/definitions/Error`');
  });

});

describe('getNumberType', () => {

  const cases = [
    { type: 'number', format: 'integer', expected: 'integer' },
    { type: 'number', format: 'int32', expected: 'int32' },
    { type: 'number', format: 'int64', expected: 'int64' },
    { type: 'number', format: 'float', expected: 'float' },
    { type: 'number', format: 'double', expected: 'double' },
    { type: 'number', format: null, expected: 'number' },
    { type: 'integer', format: 'integer', expected: 'integer' },
    { type: 'integer', format: 'int32', expected: 'int32' },
    { type: 'integer', format: 'int64', expected: 'int64' },
    { type: 'integer', format: null, expected: 'integer' },
    { type: 'string', format: null, expected: null },
    { type: 'string', format: 'email', expected: null },
  ];

  for (const { type, format, expected } of cases) {
    it(`should return ${expected} given type ${type} and format ${format}`, () => {
      const actual = type_picker.getNumberType({ type, format });
      expect(actual).toBe(expected);
    });
  }

});

describe('extractType', () => {

  describe('with param having .type', () => {

    it('should return value of .type', () => {
      const param = { type: 'string' };
      const type = type_picker.extractType(param);
      expect(type).toBe('string');
    });

  });

  for (const format of ['integer', 'int32', 'int64', 'float', 'double']) {
    describe(`with param having format: ${format}`, () => {

      it(`should return ${format}`, () => {
        const type = type_picker.extractType({ type: 'number', format });
        expect(type).toBe(format);
      });

    });
  }

  describe('with param having type and format', () => {

    it('should return type and format', () => {
      const param = { type: 'string', format: 'email' };
      const type = type_picker.extractType(param);
      expect(type).toBe('string, email');
    });

  });

  describe('with param having $ref', () => {

    it('should return the ref prefixed with "$ref "', () => {
      const param = { $ref: '#/definitions/Error' };
      const type = type_picker.extractType(param);
      expect(type).toBe('$ref: `#/definitions/Error`');
    });

  });

  describe('with param having schema with $ref', () => {

    it('should return definition name', () => {
      const param = { schema: { $ref: '#/definitions/Error' } };
      const type = type_picker.extractType(param);
      expect(type).toBe('$ref: `#/definitions/Error`');
    });

  });

  describe('with param having schema with type', () => {

    it('should return type of schema', () => {
      const param = { schema: { type: 'object' } };
      const type = type_picker.extractType(param);
      expect(type).toBe('object');
    });

  });

  describe('with param having no type', () => {

    it('should fall back on returning ', () => {
      const param = {};
      const type = type_picker.extractType(param);
      expect(type).toBe('unspecified type');
    });

  });

});
