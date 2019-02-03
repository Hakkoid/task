import * as actions from './actions'
import * as types from './actionTypes'

describe('actions', () => {
  it('should create an action to change a center', () => {
    const coordinates = [33, 50];
    const expectedAction = {
      type: types.CHANGE_CENTER,
      coordinates
    }
    expect(actions.changeCenter(coordinates)).toEqual(expectedAction)
  })

  it('should create an action to replace point from old position to new', () => {
    const oldIndex = 0;
    const newIndex = 3;
    const expectedAction = {
      type: types.REPLACE_POINT,
      oldIndex,
      newIndex
    }
    expect(actions.replacePoint({oldIndex, newIndex})).toEqual(expectedAction)
  })

  it('should create an action to change a point', () => {
    const id = "3";
    const name = 'Worst';
    const coordinates = [22, 33]
    const expectedAction = {
      type: types.CHANGE_POINT,
      id,
      name,
      coordinates
    }
    expect(actions.changePoint({id, name, coordinates})).toEqual(expectedAction)
  })

  it('should create an action to remove a point', () => {
    const id = "5";
    const expectedAction = {
      type: types.REMOVE_POINT,
      id
    }
    expect(actions.removePoint(id)).toEqual(expectedAction)
  })

  //counter for addPoint action
  let idCounter = 0;

  it('should create an action to add new point. \
    Action has id property with unique auto incrementing \
    value that start with 0 and has data type string.', () => {

    const firstName = 'first';
    const firstAddress = 'Moscow';
    const firstCoordinates = [20, 40];

    const firstExpectedAction = {
      type: types.ADD_POINT,
      name: firstName,
      coordinates: firstCoordinates,
      address: firstAddress,
      id: idCounter++ + ''
    }
    expect(actions.addPoint({
      name: firstName,
      coordinates: firstCoordinates,
      address: firstAddress
    })).toEqual(firstExpectedAction)

    const secondName = 'second';
    const secondAddress = 'London';
    const secondCoordinates = [11, 70];

    const secondExpectedAction = {
      type: types.ADD_POINT,
      name: secondName,
      address: secondAddress,
      coordinates: secondCoordinates,
      id: idCounter++ + ''
    }
    expect(actions.addPoint({
      name: secondName,
      coordinates: secondCoordinates,
      address: secondAddress
    })).toEqual(secondExpectedAction)

    const thirdName = 'third';
    const thirdAddress = 'Kiev';
    const thirdCoordinates = [11, 70];

    const thirdExpectedAction = {
      type: types.ADD_POINT,
      name: thirdName,
      address: thirdAddress,
      coordinates: thirdCoordinates,
      id: idCounter++ + ''
    }
    expect(actions.addPoint({
      name: thirdName,
      address: thirdAddress,
      coordinates: thirdCoordinates
    })).toEqual(thirdExpectedAction)
  })

  it('"address" property is optional and it should default set empty string', () => {

    const expectedAction = {
      type: types.ADD_POINT,
      id: idCounter++ + '',
      name: 'some',
      address: '',
      coordinates: [20, 20]
    }

    let action = actions.addPoint({name: 'some', coordinates: [20, 20]});

    expect(action).toEqual(expectedAction)
  })
})