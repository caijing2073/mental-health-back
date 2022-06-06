const app = require('../app');
const ActiveModel = require('../model/Active');

function Active() {
  app.get('/Active/getInfo', async (req, res) => {
    const ActiveRes = await ActiveModel.find();
    console.log('ActiveRes:', ActiveRes);
    res.send({
      Active: ActiveRes || [],
    });
  });
  app.post('/Active/create', async (req, res) => {
    const { Active } = req.body;
    const newActive = new ActiveModel(Active);
    newActive.save(err => {
      if (err) {
        return res.send({ code: 200, state: 'error', message: '添加数据失败' });
      } else {
        res.send({ code: 200, state: 'success', message: '添加数据成功' });
      }
    });
  });
  app.post('/Active/delete', async (req, res) => {
    const deleteInfo = req.body.form;
    deleteInfo.forEach(async (item, index) => {
      const newActive = await ActiveModel.find(item);
      if (newActive) {
        try {
          await ActiveModel.deleteOne(item);
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

module.exports = Active;