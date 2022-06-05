const app = require('../app');
const HotLineModel = require('../model/HotLine');

function handleHotLineInfo(dbData) {
  const result = [];
  return result;
}

function hotLine() {
  app.get('/hotline/getInfo', async (req, res) => {
    const result = await HotLineModel.find();
    res.send(result);
  });
  app.post('/hotline/create', async (req, res) => {
    const createInfo = req.body.form;
    const haveHotline = await HotLineModel.find(createInfo);
    const newHotline = new HotLineModel(createInfo);
    if (haveHotline.length) {
      res.send({ code: 200, state: 'error', message: '已存在相同数据' });
      return;
    }
    newHotline.save(err => {
      if (err) {
        return res.send({ code: 200, state: 'error', message: '添加数据失败' });
      }
      res.send({ code: 200, state: 'success', message: '添加数据成功' });
    });
  });
  app.post('/hotline/delete', async (req, res) => {
    const deleteInfo = req.body.form;
    deleteInfo.forEach(async (item, index) => {
      const newHotline = await HotLineModel.find(item);
      if (newHotline) {
        try {
          await HotLineModel.deleteOne(item);
          if (index === deleteInfo.length - 1) {
            res.send({ code: 200, state: 'success', message: '删除数据成功' });
          }
        } catch (err) {
          res.send({ code: 200, state: 'error', message: '删除部分数据失败' });
        }
      }
    });
  });
}

module.exports = hotLine;