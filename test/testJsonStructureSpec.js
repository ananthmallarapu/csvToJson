var chai = require('chai');
var expect = chai.expect;
var jsonDiff = require('./jsondiff');
var totalObjectKeys = require('./totalObjectKeys');


var expectedJSON = require('./ExpectedJSON/lifeExpectancy3.json');
var actualJSON = require('../outputdata/file_01.json');



describe('Test Application as Blackbox', function(){
  it ('Test JSON is well formed', function(done){
    done();
  });

   it('JSON has expected Number of Objects', function(done){

   var expectedObjMatrix = totalObjectKeys(expectedJSON);
   
   var actualObjMatrix = totalObjectKeys(actualJSON);
    //To DO
  expect(actualObjMatrix.totalNoObjects).to.equal(expectedObjMatrix.totalNoObjects);
  expect(actualObjMatrix.totalNoKeys).to.equal(expectedObjMatrix.totalNoKeys);
    done();
   });
  it('Test JSON is as expected', function(done){
    var compareResult = jsonDiff.compareJSONObjects(expectedJSON, actualJSON);
   expect(compareResult.diffs).equal(0);
    done();
   });
  
});
