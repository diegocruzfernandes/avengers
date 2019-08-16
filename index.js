const program = require('commander');
const package = require('./package.json');

const list = require('./src/cmds/list');
const recicle = require('./src/cmds/recicle');
const { example, header } = require('./src/cmds/help');


program.version(package.version);

if (process.argv.length === 2) {
  console.log('Your need help: $ avengers --help')
}

program
  .description(header(package.version))
  .on('--help', () => {
    example()
  }
  );

program
  .command('list')
  .description('list app by name')
  .action(async () => {
    try {
      await list();
    } catch (error) {
      console.error(error.message);
    }
  });

program
  .command('app [listApp...]')
  .option('-t, --time [time]', 'time in seconds', 20)
  .description('app to recicle')
  .action((listApp, cmdObj) => {
    try {
      recicle(listApp, cmdObj.time)
    } catch (error) {
      console.error(error.message);
    }
  });

program.parse(process.argv);