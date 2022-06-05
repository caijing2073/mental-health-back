const app = require('../app');
const TipModel = require('../model/Tip');

function tip() {
  app.get('/tip/getInfo', async (req, res) => {
    const tipRes = await TipModel.find();
    console.log('tipRes:', tipRes);
    res.send({
      tip: tipRes,
    });
  });
  app.post('/tip/create', async (req, res) => {
    const { tip } = req.body;
    const newTip = new TipModel(tip);
    newTip.save(err => {
      if (err) {
        return res.send({ code: 200, state: 'error', message: '添加数据失败' });
      } else {
        res.send({ code: 200, state: 'success', message: '添加数据成功' });
      }
    });
  });
  app.post('/tip/delete', async (req, res) => {
    const deleteInfo = req.body.form;
    deleteInfo.forEach(async (item, index) => {
      const newTip = await TipModel.find(item);
      if (newTip) {
        try {
          await TipModel.deleteOne(item);
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

module.exports = tip;