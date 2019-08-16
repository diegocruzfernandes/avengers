const { listApps } = require('../data');
const Table = require('cli-table');


const list = () => {
  const table = new Table({
    head: ['Nome', 'POD'],
    colWidths: [20, 50]
  });



  listApps.forEach(d => {
    table.push([d.name, d.pod])
  })

  console.log(table.toString());
  console.log(`Tota ${listApps.length}`)
}

module.exports = list;