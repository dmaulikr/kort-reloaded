/* eslint-disable no-use-before-define */

jest.autoMockOff();

describe('AppDispatcher', () => {
  let AppDispatcher;

  beforeEach(() => {
    AppDispatcher = require('../AppDispatcher').default;
  });

  it('sends actions to subscribers', () => {
    const listener = jest.genMockFunction();
    AppDispatcher.register(listener);

    const payload = {};
    AppDispatcher.dispatch(payload);
    expect(listener.mock.calls.length).toBe(1);
    expect(listener.mock.calls[0][0]).toBe(payload);
  });

  it('waits with chained dependencies properly', () => {
    const listener1 = () => {
      AppDispatcher.waitFor([index2, index4]);

      expect(listener2Done).toBe(true);
      expect(listener3Done).toBe(true);
      expect(listener4Done).toBe(true);
    };
    AppDispatcher.register(listener1);

    let listener2Done = false;
    const listener2 = () => {
      AppDispatcher.waitFor([index3]);
      expect(listener3Done).toBe(true);
      listener2Done = true;
    };
    const index2 = AppDispatcher.register(listener2);

    let listener3Done = false;
    const listener3 = () => {
      listener3Done = true;
    };
    const index3 = AppDispatcher.register(listener3);

    let listener4Done = false;
    const listener4 = () => {
      AppDispatcher.waitFor([index3]);
      expect(listener3Done).toBe(true);
      listener4Done = true;
    };
    const index4 = AppDispatcher.register(listener4);
  });
});
