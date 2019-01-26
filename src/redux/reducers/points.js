import { ADD_POINT, REMOVE_POINT, SWAP_POINT, CHANGE_POINT } from "../actionTypes";


const points = (state = [], action) => {
  switch (action.type) {

    case ADD_POINT:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          coordinates: action.coordinates
        }                
      ]

    case REMOVE_POINT:
      let removeIndex = getIndexById(action.id, state);
      return [
        ...state.slice(0, removeIndex),
        ...state.slice(removeIndex + 1)
      ];

    case SWAP_POINT:
      return swapPoint( state, action )

    case CHANGE_POINT:
      return changePoint( state, action )

    default:
      return state
  }
}


const getIndexById = (id, points) => {

  let index;

  for (var i = 0; i < points.length; i++){
    if(points[i].id === id){
      index = i;
    }
  }

  return index
}

const swapPoint = ( state, action) => {

  let point = state[action.oldIndex];

  let points = [
    ...state.slice(0, action.oldIndex),
    ...state.slice(action.oldIndex + 1)
  ];

  return [
    ...points.slice(0, action.newIndex),
    point,
    ...points.slice(action.newIndex)
  ];

}

const changePoint = ( state, action ) => {

  const index = getIndexById(action.id, state);

  let point = { ...state[index] };

  point.coordinates = action.coordinates || point.coordinates;
  point.text = action.text || point.text;

  return [
    ...state.slice(0, index),
    point,
    ...state.slice(index + 1)
  ]
}

export default points;