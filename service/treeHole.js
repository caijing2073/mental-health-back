const app = require('../app');
const baseRoute = 'treeHole';
const TreeHoleModel = require('../model/TreeHole');

const multiparty = require('multiparty');
const fs = require('fs');

function getBase64(path) {
  const base64Code = fs.readFileSync(path, 'base64');
  return base64Code;
}


function treeHole() {
  app.get(`/${baseRoute}/getInfo`, async (req, res) => {
    const treeHoleResult = await TreeHoleModel.find();
    const result = JSON.parse(JSON.stringify(treeHoleResult));
    result.forEach((item, index) => {
      item.treeHoleId = treeHoleResult[index]._id + '';
    });
    res.send(result);
  });
  app.post('/treeHole/delete', async (req, res) => {
    const { treeHoleId } = req.body;
    await TreeHoleModel.deleteOne({ _id: treeHoleId }, (err, doc) => {
      if (err) {
        res.send({
          code: 500,
        });
        return;
      } else {
        res.send({
          code: 200,
        });
      }
    });
  });
  app.post(`/${baseRoute}/setTreeHole`, (req, res) => {
    const { submitText, userName, image = '' } = req.body;
    const treeHoleInfo = {
      userName,
      backgroundImage: image,
      content: submitText,
      publishTime: +new Date(),
    };
    const newTreeHole = new TreeHoleModel(treeHoleInfo);
    newTreeHole.save();
    res.send('111');
  });

  app.post('/treeHole/uploadImage', (req, res) => {
    const form = new multiparty.Form();
    const saveUrl = __dirname + '/save/image';
    form.encoding = 'utf-8';
    form.uploadDir = saveUrl;
    // 进行解析
    form.on('part', (part) => {
      console.log('part:', part);
    });
    form.parse(req, (error, fields, files) => {
      const savedImage = files.file[0];
      const { path } = savedImage;
      const fullPath = path.split('/');
      const fileName = fullPath[fullPath.length - 1];
      const imagePrev = 'data:image/png;base64,';
      const imageFullCode = imagePrev + getBase64(path);
      fs.unlinkSync(saveUrl + '/' + fileName);
      res.send({
        imageFullCode,
      });
    });
  });
}

module.exports = treeHole;