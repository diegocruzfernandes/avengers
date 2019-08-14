const { exec, spawnSync } = require('child_process')
const { listApps } = require('../data')
const chalk = require('chalk');

// const TIME_SLEEP = 5 * 60
// const listApps = ['phil', 'foggy-api', 'avengers-peter-api', 'avengers-shield', 'avengers-sharon', 'avengers-shield-worker', 'avengers-johnny-blaze']

const recicle = async (appList) => {
  // exec(`teresa config view | grep current_cluster:`, (err, stdout, stderr) => {
  //  const envioriment = stdout.split(' ');
  //  console.log(envioriment)
  //  if(envioriment[1] == 'gcp-m-t\n') {
  //    console.log('Ambiente de Produção - ', envioriment[1] )
  //  }
  // })


  const appsData = [];

  for(let app of appList){
    const aaa = listApps.find(a => a.name.toUpperCase() === app.toUpperCase());
    if(aaa) { appsData.push(aaa) };
  }

  if (appsData.length == 0) {
    console.log(`${chalk.red('App não encontrado!')}`);
    return null;
  }
  
  console.log(`${chalk.green('Executando..')}`);
  await reciclePods(appsData);

  // exec(`teresa app info ${nameApp.pod} | grep Name:`, (err, stdout, stderr) => {
  //   console.log(">> App: ", nameApp.name)
  //   const info = stdout.split('\n')

  //   for (let countLines = 0, len = info.length; countLines < len; countLines++) {
  //     const line = info[countLines]
  //     const podName = line.substring(line.indexOf("Name: ") + 6, line.indexOf("  State:"))
  //     if (podName) {
  //       console.log("Delete Pod: ", podName)
  //       // exec(`teresa app delete-pods ${podName} --app ${app}`)
  //       // spawnSync('sleep', [TIME_SLEEP])
  //     }
  //   }

  // })
}

const reciclePods = async (listApps) => {
  const promises = [];
  for (app of listApps) {
    promises.push(
      exec(`teresa app info ${app.pod} | grep Name:`, (err, stdout, stderr) => {
        console.log(">> App: ", app.name)
        const info = stdout.split('\n')
        for (let countLines = 0, len = info.length; countLines < len; countLines++) {
          const line = info[countLines]
          const podName = line.substring(line.indexOf("Name: ") + 6, line.indexOf("  State:"))
          if (podName) {
            console.log("Delete Pod: ", podName)
            // exec(`teresa app delete-pods ${podName} --app ${app}`)
            // spawnSync('sleep', [TIME_SLEEP])
          }
        }
      })
    )
  }

  const result = await Promise.all(promises);
  console.log('FINAL')  
}


module.exports = recicle;