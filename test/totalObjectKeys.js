function traverse(ob1) {
 var totalNoObjects = 0, totalNoKeys = 0;
  
  // Traverse expected json
 function traverserec(obj) {
    if (obj instanceof Array) {
       
      obj.forEach(function (value, index) {
        if (typeof value == "object" && value) {
          traverserec(value);
        } else {
          totalNoKeys++;
        }
      })
    } else {
      totalNoObjects++;
      Object.keys(obj).forEach(function(value,index){
    
        if (typeof obj[index] == "object" && obj[index]) {
          traverserec(obj[index]);
        } else {
          totalNoKeys++;
        }
      });
    }
    return {
      totalNoObjects : totalNoObjects,
      totalNoKeys    : totalNoKeys
    }
    
  }
  var val=traverserec(ob1);
  return val;
}


module.exports=traverse;