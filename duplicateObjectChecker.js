  const checkDifferences = async (original, newData)=> {
   return Object.entries(original).reduce((mergeObject, currentData, key)=>{
        if(!(Object.values(newData)[key] == currentData[1])){
            mergeObject[currentData[0]] = currentData[1];
        }
        return mergeObject;
      },{})
  }
