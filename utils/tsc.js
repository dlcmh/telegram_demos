const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

async function tsc() {
  console.log('starting tsc');
  try {
    const { stdout, stderr } = await exec('npm run tsc --incremental');
    if (stderr) {
      console.error('tsc stderr:', stderr);
    } else {
      console.log('tsc stdout:', stdout);
    }
  } catch (error) {
    console.log('tsc', { error });
  }
}

module.exports = {
  tsc,
};
