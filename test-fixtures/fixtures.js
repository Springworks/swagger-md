import { create as createFixtureLoader } from 'fixture-loader';

const fixture_loader = createFixtureLoader('./test-fixtures/fixtures');

const api = {

  loadSwaggerSpec(filename) {
    return fixture_loader.loadParsedJson('swagger', filename);
  },

};

export default api;
