const mongoose = require('../db/db');
const schema = {
  moodList: Array,
  musicList: Array,
  // musicList下的属性
  // image: base64,
  // music: base64,
  // type: String,
};
const MusicSchema = mongoose.Schema(schema);

const MusicModel = mongoose.model('Music', MusicSchema, 'music');

module.exports = MusicModel;