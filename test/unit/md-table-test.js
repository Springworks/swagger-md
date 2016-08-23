import createTable from '../../src/generators/md-table';

describe('test/unit/md-table-test.js', () => {

  describe('createTable', () => {

    describe('with simple headers and records', () => {

      it('should return a markdown table', () => {
        createTable(['a', 'b', 'c'], [
          { a: 1, b: 2, c: 3 },
          { a: 4, b: 5, c: 6 },
        ]).should.equal(join([
          '| a | b | c |',
          '|---|---|---|',
          '| 1 | 2 | 3 |',
          '| 4 | 5 | 6 |',
        ]));
      });

    });

    describe('when one of the headers is never used', () => {

      it('should not include the column', () => {
        createTable(['a', 'b', 'c'], [
          { a: 1, b: undefined, c: 3 },
          { a: 4, b: undefined, c: 6 },
        ]).should.equal(join([
          '| a | c |',
          '|---|---|',
          '| 1 | 3 |',
          '| 4 | 6 |',
        ]));
      });

    });

    describe('alignment', () => {

      it('should align to a wide header', () => {
        createTable(['a', 'b', 'wide_header'], [
          { a: 1, b: 2, wide_header: 3 },
          { a: 4, b: 5, wide_header: 6 },
        ]).should.equal(join([
          '| a | b | wide_header |',
          '|---|---|-------------|',
          '| 1 | 2 | 3           |',
          '| 4 | 5 | 6           |',
        ]));
      });

      it('should align to a wide record value', () => {
        createTable(['a', 'b', 'wide_header'], [
          { a: 'lots of text', b: 2, wide_header: 3 },
          { a: 4, b: 'another long string', wide_header: 6 },
        ]).should.equal(join([
          '| a            | b                   | wide_header |',
          '|--------------|---------------------|-------------|',
          '| lots of text | 2                   | 3           |',
          '| 4            | another long string | 6           |',
        ]));
      });

    });

  });

});

function join(lines) {
  return lines.join('\n');
}
