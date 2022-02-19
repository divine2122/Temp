const procedureData = require("./procedureData.json");
const salesData = require("./salesData.json");


function elephantFinder(procedureData,salesData){
  let output = []
  let currentIndex = 0;

  //Sort salesData & proecedureData from high to low
  salesData.sort(function(a, b) {
    return b.volume - a.volume;
  });

  procedureData.sort(function(a, b) {
    return b.volume - a.volume;
  });

  for (let i=0; i<procedureData.length-1; i++) {  
    for (let j=currentIndex; j<salesData.length-1; j++){
      if (procedureData[i].volume>salesData[j].volume){
        //if index in procedureData has greater vol than the current row in the sorted salesData
        //then we know we will not find it further in salesData array, so we break
        break
      }
      else if (procedureData[i].volume===salesData[j].volume){
        if (procedureData[i].hcp===salesData[j].hcp && procedureData[i].soc===salesData[j].soc){
        //If volume of both entires match, proceed to check that hcp and soc are a match. If yes, push to output array
          output.push(salesData[j])
        }
        break
      }
      else if (procedureData[i].volume<salesData[j].volume){
        //Optimization implemented to reduce number of unneccesary iterations. 'slides' starting index of inner loop along.
        //If salesData volume is lower than iterated procedureData, we set starting index for inner loop to that value's index
        currentIndex=j
      }
    }
    if (output.length>=5){break}
      //If we have reached five matches, we end loop
  }
  return output
}

elephantFinder(procedureData,salesData)