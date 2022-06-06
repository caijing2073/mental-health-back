const mongoose = require('../db/db');
const schema = {
  title: String,
  profiles: String,
  type: String,
  readTimes: Number,
  publishTime: String,
  content: String,
};
const ActiveSchema = mongoose.Schema(schema);

const ActiveModel = mongoose.model('Active', ActiveSchema, 'active');

module.exports = ActiveModel;