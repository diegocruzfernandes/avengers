const { exec, spawnSync } = require('child_process')
const _cliProgress = require('cli-progress');
const { listApps } = require('../data')
const chalk = require('chalk');

let TIME_SLEEP = 20;
const recicle = async (appList, time = 5) => {
  TIME_SLEEP = time;
  const appsData = [];

  for (let app of appList) {
    const appExist = listApps.find(a => a.name.toUpperCase() === app.toUpperCase());
    if (appExist) { appsData.push(appExist) };
  }

  if (appsData.length == 0) {
    console.log(chalk.red('App não encontrado!'));
    return null;
  }

  console.log(chalk.green('Executando..'));
  // const listPods = getPods(appsData);
  const listPods = [
    [
      { name: 'shield', pod: 'pod.shield.1' },
      { name: 'shield', pod: 'pod.shield.2' },
      { name: 'shield', pod: 'pod.shield.3' },
      { name: 'shield', pod: 'pod.shield.4' },
      { name: 'shield', pod: 'pod.shield.5' },
      { name: 'shield', pod: 'pod.shield.6' },
      { name: 'shield', pod: 'pod.shield.7' },
      { name: 'shield', pod: 'pod.shield.8' }
    ],
    [
      { name: 'carter', pod: 'pod.carter.1' },
      { name: 'carter', pod: 'pod.carter.2' },
      { name: 'carter', pod: 'pod.carter.3' },
      { name: 'carter', pod: 'pod.carter.4' },
      { name: 'carter', pod: 'pod.carter.5' },
      { name: 'carter', pod: 'pod.carter.6' }
    ],
    [
      { name: 'sharon', pod: 'pod.sharon.1' },
      { name: 'sharon', pod: 'pod.sharon.2' },
      { name: 'sharon', pod: 'pod.sharon.3' },
      { name: 'sharon', pod: 'pod.sharon.4' }
    ]
  ]

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
}

const reciclePods = async (listPods) => {
  let maior = 0;
  for (app of listPods) {
    //console.log('app name:', app)
    if (app.length > maior) {
      maior = app.length
    }
  }

  let promises = [];
  for (let x = 0; x < maior; x++) {

    for (app of listPods) {
      const initial = x;
      const max = x + 2;
      promises.push(killPods(app, initial, max));
    }
    x++;
    await Promise.all(promises);
    // spawnSync('sleep', [TIME_SLEEP])
    await barShow();
    promises = [];
  }


  /*
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
   */
  console.log(chalk.green('Finalizado com sucesso!'));
}

const barShow = async () => {
  const bar = new _cliProgress.SingleBar({}, _cliProgress.Presets.shades_grey);
  bar.start(TIME_SLEEP, 0);

  for (let t = 1; t <= TIME_SLEEP; t++) {
    spawnSync('sleep', [1]);
    bar.update(t);
  }
  bar.stop();
}

const killPods = (app, index, max) => {
  for (let x = index; x < max; x++) {
    if (app.length > x) {
      console.log(`pod > ${app[x].name} - ${app[x].pod}`)
    }
  }
}


module.exports = recicle;