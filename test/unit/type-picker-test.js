import type_picker from '../../src/generators/type-picker';

describe('test/unit/type-picker-test.js', () => {

  describe('extractType', () => {

    describe('with param having .type', () => {
      let param;

      beforeEach(() => {
        param = { type: 'string' };
      });

      it('should return value of .type', () => {
        type_picker.extractType(param).should.eql(param.type);
      });

    });

    describe('with param having $ref', () => {
      let param;

      beforeEach(() => {
        param = { $ref: '#/definitions/Error' };
      });

      it('should return definition name', () => {
        type_picker.extractType(param).should.eql('Error');
      });

    });

    describe('with param having schema with $ref', () => {
      let param;

      beforeEach(() => {
        param = {
          schema: {
            $ref: '#/definitions/Error',
          },
        };
      });

      it('should return definition name', () => {
        type_picker.extractType(param).should.eql('Error');
      });

    });

  });

});
