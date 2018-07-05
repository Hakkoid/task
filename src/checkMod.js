function checkMod(mods, name){
  if(typeof mods == "object"){
    
    if(mods[name]){
      return true
    }
  }
  return false
}

export default checkMod