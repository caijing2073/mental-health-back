const mongoose = require('../db/db');
const schema = {
  title: String,
  profiles: String,
  type: String,
  readTimes: Number,
  publishTime: String,
  content: String,
};
const ArticleSchema = mongoose.Schema(schema);

const ArticleModel = mongoose.model('Article', ArticleSchema, 'article');

module.exports = ArticleModel;