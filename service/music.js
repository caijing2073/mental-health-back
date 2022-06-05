const fs = require('fs');
const { createReadStream } = fs;
const { createModel } = require('mongoose-gridfs');
const app = require('../app');
const musicDir = __dirname + '/save/music/';
function getFile() {
  app.get('/music/getMusic', (req, res) => {
    console.log('req - query:', req.query);
    const { music } = req.query;
    const stream = fs.readFileSync(musicDir);
    res.send(stream);
  });
  app.get('/music/getStock', (req, res) => {
    try {
      const result = fs.readdirSync(musicDir);
      res.send({
        musicStock: result,
      });
      console.log('result:', result);
    } catch (err) { }
    res.send('7777');
  });
  app.post('/music/getMusicList', (req, res) => {
    const { emotion } = req.body;
    const sadMusicList = ['五音Jw,银临-生死劫.flac'];
    const happyMusicList = ['五音Jw-明月天涯.mp3'];
    const calmMusicList = ['Winky诗[赵景旭]-江南调.mp3'];
    const interestMusicList = ['胡碧乔HuQQ-琼花房.mp3'];
    const lonelyMusicList = ['艾辰-落.flac'];
    const cureMusicList = ['银临,云の泣-锦鲤抄.flac'];
    const musicMapList = [
      {
        key: 'sad',
        list: sadMusicList,
      },
      {
        key: 'happy',
        list: happyMusicList,
      },
      {
        key: 'calm',
        list: calmMusicList,
      },
      {
        key: 'interest',
        list: interestMusicList,
      },
      {
        key: 'lonely',
        list: lonelyMusicList,
      },
      {
        key: 'cure',
        list: cureMusicList,
      },
    ];
    const result = musicMapList.find(item => {
      return item.key === emotion;
    });
    res.send(result.list);
  });
}

module.exports = getFile;