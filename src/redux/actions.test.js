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

  it('should create an action to swap two points', () => {
    const oldIndex = 0;
    const newIndex = 3;
    const expectedAction = {
      type: types.SWAP_POINT,
      oldIndex,
      newIndex
    }
    expect(actions.swapPoint({oldIndex, newIndex})).toEqual(expectedAction)
  })

  it('should create an action to change a point', () => {
    const id = "3";
    const text = 'Worst';
    const coordinates = [22, 33]
    const expectedAction = {
      type: types.CHANGE_POINT,
      id,
      text,
      coordinates
    }
    expect(actions.changePoint({id, text, coordinates})).toEqual(expectedAction)
  })

  it('should create an action to remove a point', () => {
    const id = "5";
    const expectedAction = {
      type: types.REMOVE_POINT,
      id
    }
    expect(actions.removePoint(id)).toEqual(expectedAction)
  })

  it('should create an action to add new point. \
    Action has id property with unique auto incrementing \
    value that start with 0 and has data type string', () => {

    let idCounter = 0;

    const firstText = 'first';
    const firstCoordinates = [20, 40];

    const firstExpectedAction = {
      type: types.ADD_POINT,
      text: firstText,
      coordinates: firstCoordinates,
      id: idCounter++ + ''
    }
    expect(actions.addPoint({text: firstText, coordinates: firstCoordinates})).toEqual(firstExpectedAction)

    const secondText = 'second';
    const secondCoordinates = [11, 70];

    const secondExpectedAction = {
      type: types.ADD_POINT,
      text: secondText,
      coordinates: secondCoordinates,
      id: idCounter++ + ''
    }
    expect(actions.addPoint({text: secondText, coordinates: secondCoordinates})).toEqual(secondExpectedAction)

    const thirdText = 'third';
    const thirdCoordinates = [11, 70];

    const thirdExpectedAction = {
      type: types.ADD_POINT,
      text: thirdText,
      coordinates: thirdCoordinates,
      id: idCounter++ + ''
    }
    expect(actions.addPoint({text: thirdText, coordinates: thirdCoordinates})).toEqual(thirdExpectedAction)
  })


})