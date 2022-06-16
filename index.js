const app = require('./app');
const receiveFile = require('./service/acceptFile');
const music = require('./service/music');
const hotLine = require('./service/hotLine');
const treeHole = require('./service/treeHole');
const tip = require('./service/tip');
const article = require('./service/article');
const test = require('./service/test');
const user = require('./service/user');
const demo = require('./service/demo');
receiveFile();
hotLine();
music();
treeHole();
tip();
article();
test();
user();
demo();
app.get('/test', function (req, res, next) {
  res.send('Welcome to express!');
});

app.listen(4000);