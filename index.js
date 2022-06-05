const app = require('./app');
const receiveFile = require('./service/acceptFile');
const music = require('./service/music');
const hotLine = require('./service/hotLine');
const treeHole = require('./service/treeHole');
const tip = require('./service/tip');
const article = require('./service/article');
receiveFile();
hotLine();
music();
treeHole();
tip();
article();
app.get('/test', function (req, res, next) {
  console.log('req:', req.query);
  res.send('Welcome to express!');
});

app.listen(4000);