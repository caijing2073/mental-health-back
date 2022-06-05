const app = require('../app');
const baseRoute = 'treeHole';
const TreeHoleModel = require('../model/TreeHole');
const fs = require('fs');

function treeHole() {
  app.get(`/${baseRoute}/getInfo`, async (req, res) => {
    const result = await TreeHoleModel.find();
    res.send(result);
  });
  app.post(`/${baseRoute}/setTreeHole`, (req, res) => {
    // const treeHoleInfo = {
    //   userName: 'caijing',
    //   backgroundImage: '',
    //   content: '这是一条测试的树洞哦～',
    //   publishTime: +new Date(),
    // }
    // const newTreeHole = new TreeHoleModel(treeHoleInfo);
    // newTreeHole.save(err => {
    //   if (err) {
    //     return res.send({ code: 500 });
    //   }
    //   res.send({ code: 200 });
    //   console.log('存下来了')
    // })
    res.send('111')
  })
}

module.exports = treeHole;