const mongoose = require('../../db/db');
const schema = {
  // typeList: Array,
  tag: String,
  icon: String,
  selectedIcon: String,
};
const TestTypeSchema = mongoose.Schema(schema);

const TestTypeModel = mongoose.model('TestType', TestTypeSchema, 'testType');

module.exports = TestTypeModel;