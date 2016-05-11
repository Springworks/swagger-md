const api = {

  generateApiIntro(swagger_spec) {
    const api_info = swagger_spec.info;
    const header = `# ${api_info.title}, version ${api_info.version}`;
    const base_url = `Base URL: ${swagger_spec.schemes.join('|')}://${swagger_spec.host}${swagger_spec.basePath || ''}`;
    const toc_location = '<!-- TOC -->\n<!-- TOC END -->';
    return [
      header,
      base_url,
      toc_location,
    ].join('\n\n');
  },

};

export default api;
