const mongoose = require('../../db/db');
const schema = {
  // 1. title: String 测评问卷列表
  // 2. desc: String 测评问卷描述
  // 3. type: String 问卷类型
  // 4. thumbnail: base64 缩略图
  // 5. topicList: Array 问题列表
  // 5.1 topic: Array 题目
  // 5.2 topicOptions: Array 问卷选项
  // 5.2.1 option: String 具体选项
  // 6. answerList: Array 选项给分列表
  // 6.1 topic: String 对应的题目
  // 6.2 scoreOptionList: Array 每个对应选项的给分列表
  // 6.2.1 option: String 选项
  // 6.2.2 score: Number 得分
  // 7. resultMap: Object 对应得分区间展示结果
  // 7.1 section: Array 区间
  // 7.2 result String 结果
};
const QuestionnaireSchema = mongoose.Schema(schema);

const QuestionnaireModel = mongoose.model('Questionnaire', QuestionnaireSchema, 'questionnaire');

module.exports = QuestionnaireModel;