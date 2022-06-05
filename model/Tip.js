const mongoose = require('../db/db');
const schema = {
  title: String,
  publishTime: String,
  content: String,
};
const TipSchema = mongoose.Schema(schema);

const TipModel = mongoose.model('Tip', TipSchema, 'tip');

module.exports = TipModel;