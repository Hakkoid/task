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

  it('should create an action to add new point', () => {
    const text = 'second';
    const coordinates = [20, 40];
    const expectedAction = {
      type: types.ADD_POINT,
      text,
      coordinates,
      id: '1'
    }
    expect(actions.addPoint({text, coordinates})).toEqual(expectedAction)
  })


})