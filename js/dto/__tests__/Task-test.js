jest.unmock('../Mission');
jest.unmock('../Task');
jest.unmock('../Validation');

describe('Task', () => {
  const Mission = require('../Mission').default;
  const Task = require('../Task').default;
  const Validation = require('../Validation').default;

  function createMotorwayRefTask() {
    return new Task(null, 'motorway_ref', null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null);
  }

  function createReligionTask() {
    return new Task(null, 'religion', null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null);
  }

  function createPoiNameTask() {
    return new Task(null, 'poi_name', null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null);
  }

  function createMissingMaxspeedTask() {
    return new Task(null, 'missing_maxspeed', null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null);
  }

  function createLanguageUnknownTask() {
    return new Task(null, 'language_unknown', null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null);
  }

  function createMissingTrackTypeTask() {
    return new Task(null, 'missing_track_type', null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null);
  }

  function createMissingCuisineTask() {
    return new Task(null, 'missing_cuisine', null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null);
  }

  function createUndefinedTypeTask() {
    return new Task(null, 'undefined_task_type', null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null);
  }

  function createTaskWithNullType() {
    return new Task(null, null, null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null);
  }

  function createMotorwayRefMission() {
    return new Mission(null, 'motorway_ref', null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null);
  }

  function createMotorwayRefValidation() {
    return new Validation(null, 'motorway_ref', null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  }

  it('assigns an annotation image', () => {
    expect(createMotorwayRefTask().annotationImage).not.toBeNull();
    expect(createReligionTask().annotationImage).not.toBeNull();
    expect(createPoiNameTask().annotationImage).not.toBeNull();
    expect(createMissingMaxspeedTask().annotationImage).not.toBeNull();
    expect(createLanguageUnknownTask().annotationImage).not.toBeNull();
    expect(createMissingTrackTypeTask().annotationImage).not.toBeNull();
    expect(createMissingCuisineTask().annotationImage).not.toBeNull();
    expect(createUndefinedTypeTask().annotationImage).not.toBeNull();
    expect(createTaskWithNullType().annotationImage).not.toBeNull();
  });

  it('assigns an annotation image to a motorway ref mission', () => {
    expect(createMotorwayRefMission().annotationImage).not.toBeNull();
  });

  it('assigns an annotation image to a motorway ref validation', () => {
    expect(createMotorwayRefValidation().annotationImage).not.toBeNull();
  });
});
