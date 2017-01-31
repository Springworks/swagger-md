import createTable from '../../src/generators/md-table';

describe('test/unit/md-table-test.js', () => {

  describe('createTable', () => {

    describe('with simple headers and records', () => {

      it('should return a markdown table', () => {
        expect(createTable(['a', 'b', 'c'], [
          { a: 1, b: 2, c: 3 },
          { a: 4, b: 5, c: 6 },
        ])).toMatchSnapshot();
      });

    });

    describe('when one of the headers is never used', () => {

      it('should not include the column', () => {
        expect(createTable(['a', 'b', 'c'], [
          { a: 1, b: undefined, c: 3 },
          { a: 4, b: undefined, c: 6 },
        ])).toMatchSnapshot();
      });

    });

    describe('alignment', () => {

      it('should align to a wide header', () => {
        expect(createTable(['a', 'b', 'wide_header'], [
          { a: 1, b: 2, wide_header: 3 },
          { a: 4, b: 5, wide_header: 6 },
        ])).toMatchSnapshot();
      });

      it('should align to a wide record value', () => {
        expect(createTable(['a', 'b', 'wide_header'], [
          { a: 'lots of text', b: 2, wide_header: 3 },
          { a: 4, b: 'another long string', wide_header: 6 },
        ])).toMatchSnapshot();
      });

    });

  });

});
