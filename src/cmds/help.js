const chalk = require('chalk');

const example = () => {
  console.log('');
  console.log(chalk.blue('Examples:'));
  console.log(`
  $ avengers list
  $ avengers app myApp1 myApp2 youApp
  $ avengers app myApp1 myApp2 youApp -t 20
  `);
}

const header = (version) => {
  console.log('');
  console.log(chalk.bold.greenBright(`Avengers version: ${version}`));
  console.log(chalk.green('Pod recycling helper'));
  console.log('');
}

module.exports = { example, header };
