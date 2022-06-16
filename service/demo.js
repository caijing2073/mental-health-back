const app = require('../app');
const DemoModel = require('../model/Demo');
const demoModel = require('../model/Demo');

function Demo() {
  app.get('/demo/all', async (req, res) => {
    const demoRes = await demoModel.find();
    res.send({
      demo: demoRes,
    });
  });
  app.post('/demo/create', async (req, res) => {
    const { demo } = req.body;
    const newdemo = new demoModel(demo);
    newdemo.save(err => {
      if (err) {
        return res.send({ code: 200, state: 'error', message: '添加数据失败' });
      } else {
        res.send({ code: 200, state: 'success', message: '添加数据成功' });
      }
    });
  });
  app.post('/demo/edit', async (req, res) => {
    const { owner, demo } = req.body;
    const nativeData = await DemoModel.findOne({ owner });
    await DemoModel.findOne({ owner }).updateOne({ team: nativeData.team }, { team: demo.team });
    res.send({
      msg: 666
    });
  });
}

module.exports = Demo;