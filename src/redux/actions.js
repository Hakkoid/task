import { ADD_POINT, REMOVE_POINT, SWAP_POINT, CHANGE_POINT, CHANGE_CENTER } from "./actionTypes";

let nextRouteId = 0;

export const addPoint = ({text, coordinates}) => ({
  type: ADD_POINT,
  id: nextRouteId++ + "",
  text: text,
  coordinates: coordinates
})

export const removePoint = (id) => ({
  type: REMOVE_POINT,
  id: id
})

export const changePoint = ({id, text, coordinates}) => ({
  type: CHANGE_POINT,
  id: id,
  text: text,
  coordinates: coordinates
})


export const swapPoint = ({oldIndex, newIndex}) => ({
  type: SWAP_POINT,
  oldIndex: oldIndex,
  newIndex: newIndex
})

export const changeCenter = ( coordinates ) => ({
  type: CHANGE_CENTER,
  coordinates: coordinates
})