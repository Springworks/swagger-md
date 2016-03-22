import toc_md from 'toc-md';


const api = {

  generateTableOfContents(md_string) {
    let error = null;
    let result = null;
    let sync = false;
    toc_md.insert(md_string, { maxDepth: 3 }, (err, str) => {
      error = err;
      result = str;
      sync = true;
    });
    if (!sync) {
      throw new Error('Expected toc-md callback to be invoked synchronously');
    }
    if (error) {
      throw error;
    }
    return result;
  },

};

export default api;
