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
    const { submitText } = req.body;
    const treeHoleInfo = {
      userName: 'caijing',
      backgroundImage: '',
      content: submitText,
      publishTime: +new Date(),
    }
    const newTreeHole = new TreeHoleModel(treeHoleInfo);
    newTreeHole.save()
    res.send('111');
  });
}

module.exports = treeHole;