import Config from '../constants/Config';
import DataLoader from './DataLoader';
import Answer from '../dto/Answer';

const answerRestPath = Config.ANSWER_PATH;
const taskTypes = [Config.TASK_TYPE_RELIGION, Config.TASK_TYPE_LANGUGAGE_UNKNOWN,
  Config.TASK_TYPE_MISSING_TRACK_TYPE, Config.TASK_TYPE_MISSING_CUISINE];

export default class AnswerLoader extends DataLoader {
  static _initAnswers(rawAnswers) {
    const answers = [];
    rawAnswers.return.forEach((answer) => {
      answers.push(new Answer(answer.id, answer.value, answer.title, answer.sorting, answer.type));
    });

    return answers;
  }

  static getAllAnswers(onSuccess, onError) {
    const answers = new Map();
    taskTypes.forEach((taskType) => {
      AnswerLoader.getAnswersForType(
        taskType,
        (answersForType) => {
          answers.set(taskType, answersForType);
          if (answers.size === taskTypes.length) {
            onSuccess(answers);
          }
        },
        onError
      );
    });
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
