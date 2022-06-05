const app = require('../app');
const ArticleModel = require('../model/Article');

function article() {
  app.get('/article/getInfo', async (req, res) => {
    const articleRes = await ArticleModel.find();
    console.log('articleRes:', articleRes);
    res.send({
      article: articleRes || [],
    });
  });
  app.post('/article/create', async (req, res) => {
    const { article } = req.body;
    const newArticle = new ArticleModel(article);
    newArticle.save(err => {
      if (err) {
        return res.send({ code: 200, state: 'error', message: '添加数据失败' });
      } else {
        res.send({ code: 200, state: 'success', message: '添加数据成功' });
      }
    });
  });
  app.post('/article/delete', async (req, res) => {
    const deleteInfo = req.body.form;
    deleteInfo.forEach(async (item, index) => {
      const newArticle = await ArticleModel.find(item);
      if (newArticle) {
        try {
          await ArticleModel.deleteOne(item);
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

module.exports = article;