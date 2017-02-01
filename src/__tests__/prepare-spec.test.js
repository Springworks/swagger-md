import prepareSpec from '../prepare-spec';
import fixtures from '../../test-fixtures/fixtures';

describe('prepareSpec', () => {

  describe('with a valid Swagger spec', () => {

    it('should inline all $ref references', () => {
      const swagger_api_spec = fixtures.loadSwaggerSpec('pet-store');
      return prepareSpec(swagger_api_spec).then(spec => {
        expect(spec).toMatchSnapshot();
      });
    });

  });

  describe('with a $ref that cannot be resolved', () => {

    it('should reject with an error', () => {
      const promise = prepareSpec({ $ref: '#/Pet' });
      const must_reject = flipPromise(promise);
      return must_reject.then(err => {
        expect(err.message).toMatch('Error resolving $ref pointer');
        expect(err.message).toMatch('Token "Pet" does not exist');
      });
    });

  });

});


function flipPromise(p) {
  return p.then(() => Promise.reject(new Error('Expected promise to be rejected')), err => err);
}
