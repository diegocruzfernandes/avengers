const program = require('commander');
const package = require('./package.json');
const { listApps } = require('./src/data');
const recicle = require('./src/cmds/recicle');

program.version(package.version);

const args = process.argv.slice(2)
// console.log(args)

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
  .option('-r', '--recicle [todo]', 'Recicle the pods')
  .description('Adiciona um to-do')
  .action((todo) => {
    recicle(args.slice(1))
  });

program.parse(process.argv);