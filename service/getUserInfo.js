const app = require('../app');

function getUserInfo() {
  app.post('/wechat/login', async (req, res) => {
    res.send(result);
  });
  app.get('/hotline/test', (req, res) => {
    res.send('just a test');
  });
}

module.exports = getUserInfo;