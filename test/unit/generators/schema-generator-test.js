import generator from '../../../src/generators/schema-generator';
import fixtures from '../../../test-util/fixtures';

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

    describe('with a object schema having nested properties', () => {
      let schema;

      beforeEach(() => {
        schema = {
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
      });

      it('should return a list with the properties', () => {
        const expected = [
          '- (object)',
          '  - p0 (string) (optional)',
          '  - p1 (object) (optional)',
          '    - p10 (string) (optional)',
          '    - p11 (string) (optional)',
          '  - p2 (object) (optional)',
          '    - p20 (string) (optional)',
          '    - p21 (string) (optional)',
        ].join('\n');
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
        generator.createSchemaList(schema).should.eql('- [Pet](#pet)');
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
            '  - [Pet](#pet)';
        generator.createSchemaList(schema).should.eql(expected);
      });

    });

    describe('with allOf for a $ref and an object', () => {
      let schema;
      let markdown;

      beforeEach(() => {
        schema = fixtures.loadSwaggerSpec('schema/all-of');
        markdown = fixtures.loadSwaggerSpecMarkdown('schema/all-of.md').trim();
      });

      it('should merge properties into one list', () => {
        generator.createSchemaList(schema).should.eql(markdown);
      });

    });

    describe('with schema having property with enum values', () => {
      let schema;

      beforeEach(() => {
        schema = {
          type: 'object',
          properties: {
            tag: {
              type: 'string',
              enum: ['foo', 'bar'],
            },
          },
        };
      });

      it('should include enumerable values in string definition', () => {
        const expected = '- (object)\n' +
            '  - tag (string: foo, bar) (optional)';
        generator.createSchemaList(schema).should.eql(expected);
      });

    });


  });

});
