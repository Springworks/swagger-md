import type_picker from '../generators/type-picker';

describe('extractType', () => {

  describe('with param having .type', () => {

    it('should return value of .type', () => {
      const param = { type: 'string' };
      expect(type_picker.extractType(param)).toBe('string');
    });

  });

  describe('with param having $ref', () => {

    it('should return definition name', () => {
      const param = { $ref: '#/definitions/Error' };
      expect(type_picker.extractType(param)).toBe('Error');
    });

  });

  describe('with param having schema with $ref', () => {

    it('should return definition name', () => {
      const param = {
        schema: {
          $ref: '#/definitions/Error',
        },
      };
      expect(type_picker.extractType(param)).toBe('Error');
    });

  });

  describe('with param having schema with type', () => {

    it('should return type of schema', () => {
      const param = {
        schema: { type: 'object' },
      };
      expect(type_picker.extractType(param)).toBe('object');
    });

  });

});
