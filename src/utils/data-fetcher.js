const meta = function () {
  const meta_data = require('../data/metadata.json');
  return meta_data;
};

const performance = function (value) {
  const meta_data = require('../data/performance.json');
  return meta_data;
};

export { meta, performance };
