import generator from '../../../src/generators/schema-generator';

describe('test/unit/generators/schema-generator-test.js', () => {

  describe('createSchemaList', () => {

    describe('with a object schema having properties', () => {
      let schema;

      beforeEach(() => {
        schema = {
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
      });

      it('should return a list with the properties', () => {
        const expected = '- (object)\n' +
            '  - name (string) (optional)\n' +
            '  - tag (string) (optional)';
        generator.createSchemaList(schema).should.eql(expected);
      });

    });

    describe('with a schema being a $ref', () => {
      let schema;

      beforeEach(() => {
        schema = {
          $ref: '#/definitions/Pet',
        };
      });

      it('should return a list with a single item; the name of the definition', () => {
        generator.createSchemaList(schema).should.eql('- (Pet)');
      });

    });

    describe('with a array schema of $refs', () => {
      let schema;

      beforeEach(() => {
        schema = {
          type: 'array',
          items: {
            $ref: '#/definitions/Pet',
          },
        };
      });

      it('should return a list with the properties', () => {
        const expected = '- (array)\n' +
            '  - (Pet)';
        generator.createSchemaList(schema).should.eql(expected);
      });

    });

  });

});
