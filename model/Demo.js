const mongoose = require('../db/db');
const schema = {
  team: Array,
  owner: String,
};
const DemoSchema = mongoose.Schema(schema);

const DemoModel = mongoose.model('Demo', DemoSchema, 'demo');

module.exports = DemoModel;