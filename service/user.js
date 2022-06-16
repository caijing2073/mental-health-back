const app = require('../app');
const UserModel = require('../model/User');

function user() {
  app.post('/user/getInfo', async (req, res) => {
    const { userName } = req.body;
    const userRes = await UserModel.findOne({ userName });
    const { donetest, treeHoleList } = userRes;
    res.send({
      testNum: donetest.length,
      treeHoleNum: treeHoleList.length,
    });
  });
  app.post('/user/create', async (req, res) => {
    const { userName, passWord } = req.body;
    const userRes = await UserModel.findOne({ userName });
    if (userRes) {
      res.send({
        type: 'error',
        message: '该账号已存在'
      });
      return;
    }
    const newUser = new UserModel({ userName, passWord });
    newUser.save(err => {
      if (err) {
        return res.send({ type: 'error', message: '服务器错误' });
      } else {
        res.send({ type: 'success', message: '注册成功' });
      }
    });
  });

  app.post('/user/login', async (req, res) => {
    const { userName, passWord } = req.body;
    const userRes = await UserModel.findOne({ userName });
    if (!userRes) {
      res.send({ type: 'error', message: '该账号未注册' });
      return;
    }
    console.log('[userRes]:', userRes);
    if (passWord === userRes.passWord) {
      res.send({
        type: 'success',
        message: '登陆成功',
      });
    } else {
      res.send({ type: 'error', message: '密码错误' });
    }
  });
}

module.exports = user;