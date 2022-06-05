const mongoose = require('../db/db');
const schema = {
  region: String,
  title: String,
  online: String,
  contact: String,
}
const HotLineSchema = mongoose.Schema(schema);

const HotLineModel = mongoose.model('HotLine', HotLineSchema, 'hotline')

module.exports = HotLineModel;