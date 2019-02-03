import points from './points';
import * as actions from '../actions';


describe( 'points reducer', () => {

  it('should return the initial state', () => {
    expect(points(undefined, {})).toEqual([])
  })

  it('should add new point to state', () => {

    let state = [];

    const firstName = 'first';
    const firstAddress = 'Moscow';
    const firstCoordinates = [30, 30];

    const firstAction = actions.addPoint({
      coordinates: firstCoordinates, 
      address: firstAddress,
      name: firstName
    })

    // the action creator automatic make and set the id property so we need use it in expected state
    const firstPoint = {
      id: firstAction.id,
      coordinates: firstCoordinates,
      address: firstAddress,
      name: firstName
    }

    expect(points(state, firstAction)).toEqual( [firstPoint] )


    state.push(firstPoint)
    const secondName = 'second';
    const secondAddress = 'New York';
    const secondCoordinates = [48, 77];

    const secondAction = actions.addPoint({
      coordinates: secondCoordinates,
      address: secondAddress, 
      name: secondName
    })

    const secondPoint = {
      id: secondAction.id,
      coordinates: secondCoordinates,
      address: secondAddress,
      name: secondName
    }

    expect(points(state, secondAction)).toEqual( [firstPoint, secondPoint] )


    state.push(secondPoint)
    const thirdName = 'third';
    const thirdAddress = 'London';
    const thirdCoordinates = [15, 11];

    const thirdAction = actions.addPoint({
      coordinates: thirdCoordinates,
      address: thirdAddress,
      name: thirdName
    })

    const thirdPoint = {
      id: thirdAction.id,
      coordinates: thirdCoordinates,
      address: thirdAddress,
      name: thirdName
    }

    expect(points(state, thirdAction)).toEqual( [firstPoint, secondPoint, thirdPoint] )
  })

  it('should remove point from state', () => {
    
    let state = [
      {
        id: '0',
        name: 'first',
        coordinates: [12, 34]
      },
      {
        id: '20',
        name: 'twentieth',
        coordinates: [49, 17]
      },
      {
        id: '5335',
        name: 'some',
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
      name: 'any',
      coordinates: [26, 55]
    })

    const secondAction = actions.removePoint('0')

    expect(points(state, secondAction)).toEqual([
      ...state.slice(1)
    ])

    state.push({
      id: "9000",
      name: 'yellow',
      coordinates: [68, 95]
    })

    const thirdAction = actions.removePoint('9000')

    expect(points(state, thirdAction)).toEqual([
      ...state.slice(0, 4)
    ])
  })

  it('should replace point from old position to new', () => {
    
    let state = [
      {
        id: '0',
        name: 'first',
        coordinates: [12, 34]
      },
      {
        id: '20',
        name: 'twentieth',
        coordinates: [49, 17]
      },
      {
        id: '5335',
        name: 'some',
        coordinates: [85, 42]
      },
      {
        id: "4023",
        name: 'any',
        coordinates: [26, 55]
      },
      {
        id: "9000",
        name: 'yellow',
        coordinates: [68, 95]
      }
    ];


    let oldIndex = 0;
    let newIndex = 2;

    const firstAction = actions.replacePoint({oldIndex, newIndex});
    let expectedState = [
      ...state.slice(0, oldIndex),
      ...state.slice(oldIndex + 1)
    ]
    expectedState = [
      ...expectedState.slice(0, newIndex),
      state[oldIndex],
      ...expectedState.slice(newIndex)
    ];
    expect(points(state, firstAction)).toEqual(expectedState);


    oldIndex = 1;
    newIndex = 3;

    const secondAction = actions.replacePoint({oldIndex, newIndex});
    expectedState = [
      ...state.slice(0, oldIndex),
      ...state.slice(oldIndex + 1)
    ]
    expectedState = [
      ...expectedState.slice(0, newIndex),
      state[oldIndex],
      ...expectedState.slice(newIndex)
    ];
    expect(points(state, secondAction)).toEqual(expectedState)
  })

  it('should change the coordinates or address or name of a point or all', () => {

    let state = [
      {
        id: '0',
        name: 'first',
        coordinates: [12, 34]
      },
      {
        id: '20',
        name: 'twentieth',
        coordinates: [49, 17]
      },
      {
        id: '5335',
        name: 'some',
        coordinates: [85, 42]
      },
      {
        id: "9000",
        name: 'yellow',
        coordinates: [68, 95]
      }
    ];


    let name = "new name";
    const firstAction = actions.changePoint({id: '20', name})
    let expectedState = state;
    expectedState[1].name = name;
    expect(points(state, firstAction)).toEqual(expectedState)


    name = "yet another name";
    const secondtAction = actions.changePoint({id: '5335', name})
    expectedState = state;
    expectedState[2].name = name;
    expect(points(state, secondtAction)).toEqual(expectedState)


    let coordinates = [22, 50]
    const thirdAction = actions.changePoint({id: '9000', coordinates})
    expectedState = state;
    expectedState[3].coordinates = coordinates;
    expect(points(state, thirdAction)).toEqual(expectedState)


    name = 'just name';
    coordinates = [88, 32];
    const fourthAction = actions.changePoint({id: '0', name, coordinates})
    expectedState = state;
    expectedState[0].name = name;
    expectedState[0].coordinates = coordinates;
    expect(points(state, fourthAction)).toEqual(expectedState)
  })
})