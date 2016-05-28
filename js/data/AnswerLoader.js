import Config from '../constants/Config';
import DataLoader from './DataLoader';
import Answer from '../dto/Answer';

const answerRestPath = Config.ANSWER_PATH;

function _initAnswers(rawAnswers) {
  const answers = [];
  rawAnswers.forEach((answer) => {
    answers.push(new Answer(answer.id, answer.value, answer.title, answer.sorting, answer.type));
  }, this);

  return answers;
}

class AnswerLoader extends DataLoader {
  static getAnswers(onSuccess, onError) {
    const requestUrl = super.createRequestUrl(answerRestPath, null, null);
    super.makeRequest(requestUrl, onSuccess, onError, _initAnswers);
  }

  static getAnswersForType(taskType, onSuccess, onError) {
    const requestUrl = super.createRequestUrl(answerRestPath, [taskType], null);
    super.makeRequest(requestUrl, onSuccess, onError, _initAnswers);
  }
}
