import { ADD_POINT, REMOVE_POINT, REPLACE_POINT, CHANGE_POINT, CHANGE_CENTER } from "./actionTypes";

let nextRouteId = 0;

export const addPoint = ({name, coordinates, address}) => ({
  type: ADD_POINT,
  id: nextRouteId++ + "",
  name: name,
  address: address || '',
  coordinates: coordinates
})

export const removePoint = (id) => ({
  type: REMOVE_POINT,
  id: id
})

export const changePoint = ({id, name, coordinates, address}) => ({
  type: CHANGE_POINT,
  id: id,
  name: name,
  address: address,
  coordinates: coordinates
})


export const replacePoint = ({oldIndex, newIndex}) => ({
  type: REPLACE_POINT,
  oldIndex: oldIndex,
  newIndex: newIndex
})

export const changeCenter = ( coordinates ) => ({
  type: CHANGE_CENTER,
  coordinates: coordinates
})