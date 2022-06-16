const app = require('../app');
const multiparty = require('multiparty');
const fs = require('fs');
const TestModel = require('../model/Test/Test');
const TestTypeModel = require('../model/Test/TestType');

function getBase64(path) {
  const base64Code = fs.readFileSync(path, 'base64');
  return base64Code;
}

function test() {
  app.post('/test/upLoadIcon', (req, res) => {
    const form = new multiparty.Form();
    form.encoding = 'utf-8';
    form.uploadDir = __dirname + '/save/icon';
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
      res.send({
        fileName,
      });
    });
  });

  // 存储标签tag
  app.post('/test/createTag', async (req, res) => {
    const { tag } = req.body;
    console.log('tag:', tag);
    const result = await TestTypeModel.find();
    console.log('result:', result);
    if (!result.length) {
      const newTestData = new TestTypeModel({
        tag,
        icon: '',
        selectedIcon: '',
      });
      newTestData.save((err) => {
        console.log('err:', err);
      });
    } else {
      const newTypeList = new TestTypeModel({ tag, });
      newTypeList.save();
    }
    res.send(200);
  });

  // 删除标签tag
  app.post('/test/deleteTag', async (req, res) => {
    const { tagInfo } = req.body;
    const result = await TestTypeModel.find();
    if (!result.length) {
      res.send({
        type: 'error',
        message: '没有该标签，删除失败'
      });
    } else {
      await TestTypeModel.deleteOne({ tag: tagInfo.tag }, (err, doc) => {
        if (err) {
          console.warn(err);
          res.send({
            type: 'error',
            message: '删除失败'
          });
          return;
        }
        res.send({
          type: 'success',
          message: '删除成功'
        });
      });
    }
  });

  // 修改标签tag
  app.post('/test/editTagInfo', async (req, res) => {
    const form = new multiparty.Form();
    form.encoding = 'utf-8';
    form.uploadDir = __dirname + '/save/icon';
    // 进行解析
    form.on('part', (part) => {
      console.log('part:', part);
    });
    form.parse(req, async (error, fields, files) => {
      const savedImage = files.file[0];
      const { path } = savedImage;
      const fullPath = path.split('/');
      const fileName = fullPath[fullPath.length - 1];
      const imagePrev = 'data:image/png;base64,';
      const imageFullCode = imagePrev + getBase64(path);
      const fileInfo = fields;
      const tag = fileInfo.tag[0];
      const type = fileInfo.type[0];
      const updateInfo = {
        tag,
      };
      if (type === 'icon') {
        updateInfo.icon = imageFullCode;
      } else {
        updateInfo.selectedIcon = imageFullCode;
      }
      TestTypeModel.updateOne({ tag }, updateInfo, (err, doc) => {
        if (err) {
          console.log('err', err);
        } else {
          console.log(doc);
        }
      });
      res.send({
        type,
        imageFullCode,
      });
    });
  });

  // 问卷信息存储
  app.post('/test/question', async (req, res) => {
    const params = req.body;
    const newQS = new TestModel(params);
    newQS.save();
    res.send(200);
  })

  // 问卷信息获取
  app.get('/test/getQS', async (req, res) => {
    const qsRes = await TestModel.find();
    res.send(qsRes);
  })

  // 获取标签信息
  app.get('/test/getAllTag', async (req, res) => {
    const result = await TestTypeModel.find();
    res.send({
      tagData: result,
    });
  });

  app.get('/test/getAll', async (req, res) => {
    const result = await TestModel.find();
    res.send({
      testData: result,
    });
  });

}

module.exports = test;