function multiply(list, matrix){
  let res = [];
  for(let i = 0; i < list.length; i++){
    res.push(0);
    for(let j = 0; j < matrix[i].length; j++){
      res[i] += matrix[i][j] * list[i];
    }
  }
  return res;
}

module.exports = {
  multiply : multiply
}
