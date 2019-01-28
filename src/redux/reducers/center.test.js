import center from './center';
import * as types from '../actionTypes';


describe( 'center reducer', () => {

  it('should return the initial state', () => {
    expect(center(undefined, {})).toEqual([55.75, 37.57])
  })

  it('should handle CHANGE_CENTER', () => {
    expect(
      center([55.75, 37.57], {
        type: types.CHANGE_CENTER,
        coordinates: [40.55, 30.22]
      })
    ).toEqual([40.55, 30.22])

    expect(
      center([55.75, 37.57], {
        type: types.CHANGE_CENTER,
        coordinates: [60, 32]
      })
    ).toEqual([60, 32])

    expect(
      center([55.75, 37.57], {
        type: types.CHANGE_CENTER,
        coordinates: [2, 12]
      })
    ).toEqual([2, 12])

  })
})