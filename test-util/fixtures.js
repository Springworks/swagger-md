import { create as createFixtureLoader } from 'fixture-loader';

const fixture_loader = createFixtureLoader('./test-util/fixtures');

const api = {

  loadSwaggerSpec() {
    return fixture_loader.loadParsedJson('swagger', 'pet-store');
  },

  loadSwaggerSpecMarkdown() {
    return fixture_loader.loadString('markdown', 'pet-store.md');
  },
};

export default api;
