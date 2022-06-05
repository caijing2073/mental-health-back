const app = require('../app');
const multiparty = require('multiparty');
const fs = require('fs');

function getBase64(path) {
  const base64Code = fs.readFileSync(path, 'base64');
  return base64Code;
}

function receiveFile() {
  app.post('/file/image', (req, res) => {
    const form = new multiparty.Form();
    form.encoding = 'utf-8';
    form.uploadDir = __dirname + '/save/image';
    // 进行解析
    form.on('part', (part) => {
      console.log('part:', part);
    });
    form.parse(req, (error, fields, files) => {
      const savedImage = files.file[0];
      const { path } = savedImage;
      const fullPath = path.split('/');
      const fileName = fullPath[fullPath.length - 1];
      const imagePrev = 'data:image/png;base64,';
      const imageFullCode = imagePrev + getBase64(path);
      res.send({
        fileName,
      });
    });
  });
  // app.post('/file/music', (req, res) => {
  //   const form = new multiparty.Form();
  //   form.encoding = 'utf-8';
  //   form.uploadDir = __dirname + '/save/music';
  //   // 进行解析
  //   form.parse(req, (error, fields, files) => {
  //     const savedMusic = files.file[0];
  //     const { path } = savedMusic;
  //     const music = getBase64(path);
  //   });

  //   res.send({
  //     code: 200
  //   });
  // });
}

module.exports = receiveFile;