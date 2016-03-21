import toc_md from 'toc-md';
import autorestoredSandbox from '@springworks/test-harness/autorestored-sandbox';
import fixtures from '../../test-util/fixtures';
import generator from '../../src/generators/toc-generator';

describe('test/unit/toc-generator-test.js', () => {

  let md_fixture_with_toc;
  let md_fixture_without_toc;

  beforeEach(done => {
    md_fixture_with_toc = fixtures.loadSwaggerSpecMarkdown('pet-store-with-response-examples.md');
    toc_md.clean(md_fixture_with_toc, (err, str) => {
      if (err) {
        setImmediate(done, err);
        return;
      }
      md_fixture_without_toc = str;
      done();
    });
  });

  describe('generateTableOfContents', () => {

    describe('with a markdown string without a TOC', () => {

      it('should return the markdown with a TOC inserted', () => {
        const markdown_str = generator.generateTableOfContents(md_fixture_without_toc);
        markdown_str.should.eql(md_fixture_with_toc);
      });

    });

    describe('if toc-md changes to invoke the callback async', () => {
      const sandbox = autorestoredSandbox();

      beforeEach(() => {
        sandbox.stub(toc_md, 'insert').yieldsAsync();
      });

      it('should throw an error if the callback is not synchronous', () => {
        (() => {
          generator.generateTableOfContents(md_fixture_without_toc);
        }).should.throw('Expected toc-md callback to be invoked synchronously');
      });

    });

  });

});
