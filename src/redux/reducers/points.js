import { ADD_POINT, REMOVE_POINT, REPLACE_POINT, CHANGE_POINT } from "../actionTypes";


const points = (state = [], action) => {
  switch (action.type) {

    case ADD_POINT:
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          address: action.address,
          coordinates: action.coordinates
        }                
      ]

    case REMOVE_POINT:
      let removeIndex = getIndexById(action.id, state);
      return [
        ...state.slice(0, removeIndex),
        ...state.slice(removeIndex + 1)
      ];

    case REPLACE_POINT:
      return replacePoint( state, action )

    case CHANGE_POINT:
      return changePoint( state, action )

    default:
      return state
  }
}


export const getIndexById = (id, points) => {

  let index;

  for (var i = 0; i < points.length; i++){
    if(points[i].id === id){
      index = i;
    }
  }

  return index
}

export const replacePoint = (state, action) => {

  let points = [
    ...state.slice(0, action.oldIndex),
    ...state.slice(action.oldIndex + 1)
  ];

  points = [
    ...points.slice(0, action.newIndex),
    state[action.oldIndex],
    ...points.slice(action.newIndex)
  ]

  return points;

}

export const changePoint = (state, action) => {

  const index = getIndexById(action.id, state);

  let point = { ...state[index] };

  point.coordinates = action.coordinates || point.coordinates;
  point.name = action.name || point.name;
  point.address = action.address || ( action.address === '' ? '' : point.address );

  return [
    ...state.slice(0, index),
    point,
    ...state.slice(index + 1)
  ]
}

export default points;