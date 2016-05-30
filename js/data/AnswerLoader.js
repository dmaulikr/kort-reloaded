import Config from '../constants/Config';
import DataLoader from './DataLoader';
import Answer from '../dto/Answer';

const answerRestPath = Config.ANSWER_PATH;

class AnswerLoader extends DataLoader {
  static _initAnswers(rawAnswers) {
    const answers = [];
    rawAnswers.forEach((answer) => {
      answers.push(new Answer(answer.id, answer.value, answer.title, answer.sorting, answer.type));
    }, this);

    return answers;
  }

  static getAnswers(onSuccess, onError) {
    const requestUrl = super.createRequestUrl(answerRestPath, null, null);
    super.makeGetRequest(
      requestUrl,
      true,
      (rawAnswers) => onSuccess(AnswerLoader._initAnswers(rawAnswers)),
      onError
    );
  }

  static getAnswersForType(taskType, onSuccess, onError) {
    const requestUrl = super.createRequestUrl(answerRestPath, [taskType], null);
    super.makeGetRequest(
      requestUrl,
      true,
      (rawAnswers) => onSuccess(AnswerLoader._initAnswers(rawAnswers)),
      onError
    );
  }
}
