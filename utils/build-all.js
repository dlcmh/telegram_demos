const { tsc } = require('./tsc');

async function buildAll() {
  await Promise.all([tsc()]);
}

module.exports = { buildAll };

if (require.main === module) {
  (async () => {
    buildAll();
  })();
}
