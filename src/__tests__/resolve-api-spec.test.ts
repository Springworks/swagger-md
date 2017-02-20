import converter from '../index';

describe('resolveApiSpec', () => {

  it('should resolve the spec', () => {
    return converter.resolveApiSpec('test-fixtures/fixtures/api/api.json', null).then(spec => {
      expect(spec).toMatchSnapshot();
    });
  });

  it('should resolve the spec and return the resulting object', () => {
    return converter.resolveApiSpec('test-fixtures/fixtures/api/api.json', null).then(spec => {
      // The path spec for `GET /pets/{id}` is resolved from a separate json file
      const deep_resolved_ref = spec.paths['/pets/{id}'].get.responses['200'].schema;
      const resolved_and_merged_schema = {
        type: 'object',
        description: 'A pet',
        required: [
          'name',
          'id',
        ],
        properties: {
          // `name` and `tag` are from new-pet.json
          name: {
            type: 'string',
            description: "The pet's name",
          },
          tag: {
            type: 'string',
          },
          // `id` is from pet.json
          id: {
            type: 'integer',
            format: 'int64',
          },
        },
      };
      expect(deep_resolved_ref).toEqual(resolved_and_merged_schema);
    });
  });

});
