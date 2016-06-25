jest.unmock('../../dto/Answer');
jest.unmock('../AnswerStore');

describe('AnswerStore', () => {
  const ActionTypes = require('../../constants/ActionTypes');
  const Answer = require('../../dto/Answer').default;

  let AppDispatcher;
  let answerStore;
  let callback;

  function createAnswersForUnknownReligion() {
    return [
      new Answer('10', 'buddhist', 'Buddhist (temple)', '110', 'religion'),
      new Answer('11', 'christian', 'Christian (church)', '120', 'religion'),
      new Answer('12', 'hindu', 'Hindu (temple)', '130', 'religion'),
      new Answer('13', 'jewish', 'Jewish (synagogue)', '140', 'religion'),
      new Answer('15', 'muslim', 'Muslim (mosque)', '160', 'religion'),
      new Answer('16', 'pastafarian', 'Pastafarian', '170', 'religion'),
      new Answer('17', 'shinto', 'Shinto (shrine)', '180', 'religion'),
      new Answer('18', 'sikh', 'Sikh (Gurdwara)', '190', 'religion'),
      new Answer('14', 'multifaith', 'Multiple faiths', '200', 'religion'),
    ];
  }

  function createAllAnswers() {
    const allAnswers = new Map();
    allAnswers.set('religion', createAnswersForUnknownReligion());
    allAnswers.set('language_unknown', [
      new Answer('151', 'de', 'German', '10', 'language_unknown'),
      new Answer('140', 'en', 'English', '20', 'language_unknown'),
    ]);
    return allAnswers;
  }

  const actionAnswersForUnknownReligionLoaded = {
    actionType: ActionTypes.ANSWERS_LOAD_FOR_TYPE,
    taskType: 'religion',
    data: createAnswersForUnknownReligion(),
  };

  const actionAllAnswersLoaded = {
    actionType: ActionTypes.ANSWERS_LOAD,
    data: createAllAnswers(),
  };

  beforeEach(() => {
    AppDispatcher = require('../../dispatcher/AppDispatcher').default;
    answerStore = require('../AnswerStore').default;
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  describe('getAnswersForType()', () => {
    it('returns null when no answers loaded yet', () => {
      const answersForUnknownReligion = answerStore.getAnswersForType('religion');
      expect(answersForUnknownReligion).toBeNull();
    });

    it('returns answers for specific type when all answers are loaded', () => {
      callback(actionAllAnswersLoaded);
      const answersForUnknownReligion = answerStore.getAnswersForType('religion');
      expect(answersForUnknownReligion).toEqual(createAnswersForUnknownReligion());
    });

    it('returns answers for specific type when answers for specific type are loaded', () => {
      callback(actionAnswersForUnknownReligionLoaded);
      const answersForUnknownReligion = answerStore.getAnswersForType('religion');
      expect(answersForUnknownReligion).toEqual(createAnswersForUnknownReligion());
    });

    it('returns null when all answers are loaded but trying to get wrong type', () => {
      callback(actionAllAnswersLoaded);
      const answersForWrongType = answerStore.getAnswersForType('this_type_doesnt_exist');
      expect(answersForWrongType).toBeNull();
    });
  });

  describe('getAllAnswers()', () => {
    it('initializes with no answer items', () => {
      const all = answerStore.getAllAnswers();
      expect(all).toBeNull();
    });

    it('updates after loading all answers', () => {
      callback(actionAllAnswersLoaded);
      const all = answerStore.getAllAnswers();
      expect(all).toEqual(createAllAnswers());
    });

    it('updates after loading answers for specific type', () => {
      callback(actionAnswersForUnknownReligionLoaded);
      const all = answerStore.getAllAnswers();
      const compareAll = new Map();
      compareAll.set('religion', createAnswersForUnknownReligion());
      expect(all).toEqual(compareAll);
    });

    it('updates after new answers loaded update', () => {
      callback(actionAnswersForUnknownReligionLoaded);
      let all = answerStore.getAllAnswers();
      const compareAll = new Map();
      compareAll.set('religion', createAnswersForUnknownReligion());
      expect(all).toEqual(compareAll);
      callback(actionAllAnswersLoaded);
      all = answerStore.getAllAnswers();
      expect(all).toEqual(createAllAnswers());
    });
  });
});
