const chokidar = require('chokidar');
const { spawn } = require('child_process');
const { tsc } = require('./tsc');
const { buildAll } = require('./build-all');

// Init: start
let server;

(async () => {
  await buildAll();
  runServer();
})();
// Init: done

const watcher = chokidar.watch('./src', {
  // follows definitions here https://github.com/micromatch/anymatch
  ignored: ['node_modules', '.DS_Store', '**/*.test.ts'],
  ignoreInitial: true,
});

watcher
  .on('ready', () => {
    console.log('chokidar: Initial scan complete. Ready for changes');
  })
  .on('all', async (_event, path) => {
    console.log(`${path} changed`);

    if (/\.(ts|js)$/.test(path)) {
      await tsc();
      return restartServer();
    }
  });

function restartServer() {
  console.log('restarting server');
  runServer();
}

function runServer() {
  if (server) server.kill();
  server = spawn(
    'node',
    ['--require', 'source-map-support/register', 'dist/index.js'],
    { stdio: 'inherit' }
  );
  console.log('server started');
}
