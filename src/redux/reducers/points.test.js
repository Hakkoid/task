import points from './points';
import * as actions from '../actions';


describe( 'points reducer', () => {

  it('should return the initial state', () => {
    expect(points(undefined, {})).toEqual([])
  })

  it('should add new point to state', () => {

    let state = [];

    const firstText = 'first';
    const firstCoordinates = [30, 30];

    const firstAction = actions.addPoint({
      coordinates: firstCoordinates, 
      text: firstText
    })

    // the action creator automatic make and set the id property so we need use it in expected state
    const firstPoint = {
      id: firstAction.id,
      coordinates: firstCoordinates,
      text: firstText
    }

    expect(points(state, firstAction)).toEqual( [firstPoint] )


    state.push(firstPoint)
    const secondText = 'second';
    const secondCoordinates = [48, 77];

    const secondAction = actions.addPoint({
      coordinates: secondCoordinates, 
      text: secondText
    })

    const secondPoint = {
      id: secondAction.id,
      coordinates: secondCoordinates,
      text: secondText
    }

    expect(points(state, secondAction)).toEqual( [firstPoint, secondPoint] )


    state.push(secondPoint)
    const thirdText = 'third';
    const thirdCoordinates = [15, 11];

    const thirdAction = actions.addPoint({
      coordinates: thirdCoordinates, 
      text: thirdText
    })

    const thirdPoint = {
      id: thirdAction.id,
      coordinates: thirdCoordinates,
      text: thirdText
    }

    expect(points(state, thirdAction)).toEqual( [firstPoint, secondPoint, thirdPoint] )
  })

  it('should remove point from state', () => {
    
    let state = [
      {
        id: '0',
        text: 'first',
        coordinates: [12, 34]
      },
      {
        id: '20',
        text: 'twentieth',
        coordinates: [49, 17]
      },
      {
        id: '5335',
        text: 'some',
        coordinates: [85, 42]
      }
    ];

    const firstAction = actions.removePoint('20')

    expect(points(state, firstAction)).toEqual([
      ...state.slice(0, 1),
      ...state.slice(2)
    ])

    state.push({
      id: "4023",
      text: 'any',
      coordinates: [26, 55]
    })

    const secondAction = actions.removePoint('0')

    expect(points(state, secondAction)).toEqual([
      ...state.slice(1)
    ])

    state.push({
      id: "9000",
      text: 'yellow',
      coordinates: [68, 95]
    })

    const thirdAction = actions.removePoint('9000')

    expect(points(state, thirdAction)).toEqual([
      ...state.slice(0, 4)
    ])
  })

  it('should swap two points', () => {
    
    let state = [
      {
        id: '0',
        text: 'first',
        coordinates: [12, 34]
      },
      {
        id: '20',
        text: 'twentieth',
        coordinates: [49, 17]
      },
      {
        id: '5335',
        text: 'some',
        coordinates: [85, 42]
      },
      {
        id: "4023",
        text: 'any',
        coordinates: [26, 55]
      },
      {
        id: "9000",
        text: 'yellow',
        coordinates: [68, 95]
      }
    ];


    let oldIndex = 0;
    let newIndex = 2;
    const firstAction = actions.swapPoint({oldIndex, newIndex});
    let expectedState = [
      ...state.slice(0, oldIndex),
      state[newIndex],
      ...state.slice(oldIndex + 1)
    ]
    expectedState[newIndex] = state[oldIndex];
    expect(points(state, firstAction)).toEqual(expectedState);


    oldIndex = 1;
    newIndex = 3;
    const secondAction = actions.swapPoint({oldIndex, newIndex});
    expectedState = [
      ...state.slice(0, oldIndex),
      state[newIndex],
      ...state.slice(oldIndex + 1)
    ]
    expectedState[newIndex] = state[oldIndex];
    expect(points(state, secondAction)).toEqual(expectedState)
  })

  it('should change the coordinates or text of a point or both', () => {

    let state = [
      {
        id: '0',
        text: 'first',
        coordinates: [12, 34]
      },
      {
        id: '20',
        text: 'twentieth',
        coordinates: [49, 17]
      },
      {
        id: '5335',
        text: 'some',
        coordinates: [85, 42]
      },
      {
        id: "9000",
        text: 'yellow',
        coordinates: [68, 95]
      }
    ];


    let text = "new text";
    const firstAction = actions.changePoint({id: '20', text})
    let expectedState = state;
    expectedState[1].text = text;
    expect(points(state, firstAction)).toEqual(expectedState)


    text = "yet another text";
    const secondtAction = actions.changePoint({id: '5335', text})
    expectedState = state;
    expectedState[2].text = text;
    expect(points(state, secondtAction)).toEqual(expectedState)


    let coordinates = [22, 50]
    const thirdAction = actions.changePoint({id: '9000', coordinates})
    expectedState = state;
    expectedState[3].coordinates = coordinates;
    expect(points(state, thirdAction)).toEqual(expectedState)


    text = 'just text';
    coordinates = [88, 32];
    const fourthAction = actions.changePoint({id: '0', text, coordinates})
    expectedState = state;
    expectedState[0].text = text;
    expectedState[0].coordinates = coordinates;
    expect(points(state, fourthAction)).toEqual(expectedState)
  })
})