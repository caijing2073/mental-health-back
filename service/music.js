const fs = require('fs');
const multiparty = require('multiparty');
const app = require('../app');
const MusicModel = require('../model/Music');
const musicDir = __dirname + '/save/music/';
function getFile() {
  app.get('/music/getMusic', (req, res) => {
    console.log('req - query:', req.query);
    const { music } = req.query;
    const stream = fs.readFileSync(musicDir + music);
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

  // 上传音乐
  app.post('/music/upload', (req, res) => {
    const form = new multiparty.Form();
    form.encoding = 'utf-8';
    const saveUrl = '/save/music';
    form.uploadDir = __dirname + saveUrl;
    // 进行解析
    form.parse(req, (error, fields, files) => {
      console.log('files:', files);
      const savedMusic = files.file[0];
      const { path } = savedMusic;
      const music = getBase64(path);
    });
    res.send({
      code: 200
    });
  });

  app.post('/music/editMusicInfo', (req, res) => {
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
      const imagePrev = 'data:image/png;base64,';
      const imageFullCode = imagePrev + getBase64(path);
      const fileInfo = fields;
      const tag = fileInfo.tag[0];
      const type = fileInfo?.type[0] || '';
      const updateInfo = {
        tag,
      };
      if (type) {
        updateInfo.icon = imageFullCode;
      } else {
        updateInfo.music = getBase64(path);
      }
      MusicModel.updateOne({ tag }, updateInfo, (err, doc) => {
        if (err) {
          console.log('err', err);
        } else {
          console.log(doc);
        }
      });
      if (type) {
        updateInfo.icon = imageFullCode;
        res.send({
          type,
          imageFullCode,
        });
      } else {
        updateInfo.music = getBase64(path);
        res.send({
          type,
          musicInfo: files,
        });
      }
    });

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