const { exec, spawnSync } = require('child_process')
const { listApps } = require('../data')
const chalk = require('chalk');

const TIME_SLEEP = 5
const recicle = async (appList) => {
  const appsData = [];

  for(let app of appList){
    const appExist = listApps.find(a => a.name.toUpperCase() === app.toUpperCase());
    if(appExist) { appsData.push(appExist) };
  }

  if (appsData.length == 0) {
    console.log(`${chalk.red('App não encontrado!')}`);
    return null;
  }
  
  console.log(`${chalk.green('Executando..')}`);
  const listPods = getPods(appsData);
  await reciclePods(listPods);

  
}

const getPods = (appsData) => {
  const promises = [];
  for (app of listApps) {
    promises.push(
      exec(`teresa app info ${app.pod} | grep Name:`, (err, stdout, stderr) => {
        return stdout.split('\n')
      })
    )
   return Promise.all(promises);
}

const reciclePods = async (listPods) => {
  for (pod of listPods) {
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
            spawnSync('sleep', [TIME_SLEEP])
          }
        }
      })
    )
  }

  const result = await Promise.all(promises);
  console.log('FINAL')  
}


module.exports = recicle;