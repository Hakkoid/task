import { CHANGE_CENTER } from "../actionTypes";

const center = (state = [55.75, 37.57], action) => {
  switch (action.type) {

    case CHANGE_CENTER:
      return [
      	...action.coordinates
      ]
    default:
      return state
  }
}


export default center