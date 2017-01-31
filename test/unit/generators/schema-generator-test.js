import generator from '../../../src/generators/schema-generator';
import fixtures from '../../../test-util/fixtures';

describe('test/unit/generators/schema-generator-test.js', () => {

  describe('createSchemaList', () => {

    describe('with a object schema having properties', () => {

      it('should return a list with the properties', () => {
        const schema = {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            tag: {
              type: 'string',
            },
          },
        };
        const result = generator.createSchemaList(schema);
        expect(result).toMatchSnapshot();
      });

    });

    describe('with a object schema having nested properties', () => {

      it('should return a list with the properties', () => {
        const schema = {
          type: 'object',
          properties: {
            p0: {
              type: 'string',
            },
            p1: {
              type: 'object',
              properties: {
                p10: {
                  type: 'string',
                },
                p11: {
                  type: 'string',
                },
              },
            },
            p2: {
              type: 'object',
              properties: {
                p20: {
                  type: 'string',
                },
                p21: {
                  type: 'string',
                },
              },
            },
          },
        };
        const result = generator.createSchemaList(schema);
        expect(result).toMatchSnapshot();
      });

    });

    describe('with a schema being a $ref', () => {

      it('should return a list with a single item; the name of the definition', () => {
        const schema = { $ref: '#/definitions/Pet' };
        const result = generator.createSchemaList(schema);
        expect(result).toMatchSnapshot();
      });

    });

    describe('with a array schema of $refs', () => {

      it('should return a list with the properties', () => {
        const schema = {
          type: 'array',
          items: { $ref: '#/definitions/Pet' },
        };
        const result = generator.createSchemaList(schema);
        expect(result).toMatchSnapshot();
      });

    });

    describe('with allOf for a $ref and an object', () => {

      it('should merge properties into one list', () => {
        const schema = fixtures.loadSwaggerSpec('schema/all-of');
        const result = generator.createSchemaList(schema);
        expect(result).toMatchSnapshot();
      });

    });

    describe('with schema having property with enum values', () => {

      it('should include enumerable values in string definition', () => {
        const schema = {
          type: 'object',
          properties: {
            tag: {
              type: 'string',
              enum: ['foo', 'bar'],
            },
          },
        };
        const result = generator.createSchemaList(schema);
        expect(result).toMatchSnapshot();
      });

    });


  });

});
