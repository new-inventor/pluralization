const fs = require('fs');
const { exec } = require('child_process');
const config = require('../package');

fs.copyFileSync('./package.json', 'lib/package.json');
fs.copyFileSync('./LICENSE', 'lib/LICENSE');
fs.copyFileSync('./README.md', 'lib/README.md');
process.chdir('lib');


exec('npm pack', (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  }

  fs.unlinkSync('./package.json');
  fs.unlinkSync('./LICENSE');
  fs.unlinkSync('./README.md');


  if(!fs.existsSync('../dist')) {
    fs.mkdirSync('../dist');
  }
  const distFileName = `./new-inventor-smart-pluralization-${config.version}.tgz`;
  fs.copyFileSync(`./${distFileName}` , `../dist/${distFileName}`);
  fs.unlinkSync(`./${distFileName}`);

  process.chdir('..');
});
