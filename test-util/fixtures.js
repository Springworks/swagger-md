import { create as createFixtureLoader } from 'fixture-loader';

const fixture_loader = createFixtureLoader('./test-util/fixtures');

const api = {

  loadSwaggerSpec(filename) {
    return fixture_loader.loadParsedJson('swagger', filename);
  },

};

export default api;
