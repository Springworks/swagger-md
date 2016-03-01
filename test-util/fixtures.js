import { create as createFixtureLoader } from 'fixture-loader';

const fixture_loader = createFixtureLoader('./test-util/fixtures');

const api = {

  loadSwaggerSpec(filename = 'pet-store') {
    return fixture_loader.loadParsedJson('swagger', filename);
  },

  loadSwaggerSpecMarkdown(filename = 'pet-store.md') {
    return fixture_loader.loadString('markdown', filename).trim();
  },

  loadResponseExample() {
    const parsed_json = fixture_loader.loadParsedJson('.', 'response-example');
    const stringified = JSON.stringify(parsed_json, null, 2);
    const quotes_replaced = stringified.replace(/\\"/g, '"');
    return quotes_replaced;
  },
};

export default api;
