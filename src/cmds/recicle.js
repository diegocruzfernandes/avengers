const { exec, spawnSync } = require('child_process')
const { listApps } = require('../data')
const chalk = require('chalk');

// const TIME_SLEEP = 5 * 60
// const listApps = ['phil', 'foggy-api', 'avengers-peter-api', 'avengers-shield', 'avengers-sharon', 'avengers-shield-worker', 'avengers-johnny-blaze']

const recicle = (app) => {
  const nameApp = listApps.find(a => a.name == app);
  if (!nameApp) {
    console.log(`${chalk.red('App não encontrado!')}`);
    return null;
  }
  console.log(`${chalk.green('Executando..')}`);


}

/*
for (let countApps = 0, len = listApps.length; countApps < len; countApps++) {
  const app = listApps[countApps]

  exec(`teresa app info ${app} | grep Name:`, (err, stdout, stderr) => {
    console.log(">> App: ", app)
    const info = stdout.split('\n')

    for (let countLines = 0, len = info.length; countLines < len; countLines++) {
      const line = info[countLines]
      const podName = line.substring(line.indexOf("Name: ") + 6, line.indexOf("  State:"))
      if (podName) {
        console.log("Delete Pod: ", podName)
        exec(`teresa app delete-pods ${podName} --app ${app}`)
        spawnSync('sleep', [TIME_SLEEP])
      }
    }
  })
}
*/

module.exports = recicle;