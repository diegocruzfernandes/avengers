const program = require('commander');
const package = require('../package.json');
const { listApps } = require('./data')
const recicle = require('./cmds/recicle')

program.version(package.version);

program
  .command('list')
  .description('Adiciona um to-do')
  .action(async () => {
    listApps.forEach(d => {
      console.log(`Name: ${d.name} - ${d.pod}`)
    })
  });

program
  .command('app [todo]')
  .option('-r, --recicle [todo]', 'Recicle the pods')
  .description('Adiciona um to-do')
  .action((todo) => {
    recicle(todo);
  });

program.parse(process.argv);