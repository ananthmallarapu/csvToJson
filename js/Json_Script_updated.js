



const fs = require('fs');
  const readline = require('readline');
  const stream = require('stream');




function convert(givenyear) {

  if(arguments.length===0)
    throw new Error("Not a number");
  else if(typeof givenyear!=='string')
    throw new Error("Not a number");





  
  const instream = fs.createReadStream('inputdata/Indicators.csv');
  const outstream = new stream();
  const rl = readline.createInterface(instream, outstream);

  let headers;
  let Line;
  let birthrate;
  let deathrate;
  let year;
  const indiaArr = [];
  let headcount = 0;
  const asianCountries = ['India', 'China', 'Pakistan', 'Bangladesh', 'Nepal', 'Afghanistan', 'Bhutan', 'Japan', 'Singapore', 'Kuwait'];
  const topFivenations = new Map();

  const asianmale = new Map();
  const asianfemale = new Map();
  let lifeexpmale = 0;
  let lifeexpfemale = 0;
  let JSONfile1 = [];
  let JSONfile2 = [];
  let JSONfile3 = [];

  function findasiancountry(element) {
    return (asianCountries.findIndex(e => element === e) !== -1);
  }


  rl.on('line', (line) => {
    if (headcount === 0) {
      headers = line.split(',');
      year = '1960';
      headcount = 1;
    }


    Line = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    if (((Line[headers.indexOf('IndicatorCode')] === 'SP.DYN.LE00.IN') ||
      (Line[headers.indexOf('IndicatorCode')] === 'SP.DYN.LE00.MA.IN') || (Line[headers.indexOf('IndicatorCode')] === 'SP.DYN.LE00.FE.IN'))) {
      if (Line[headers.indexOf('IndicatorCode')] === 'SP.DYN.LE00.IN' && (Line[headers.indexOf('Year')] === givenyear)) {
        topFivenations.set(Line[headers.indexOf('CountryName')], Line[headers.indexOf('Value')]);

      // console.log(Line[headers.indexOf("Value")+1]);
      // console.log(Line[headers.indexOf("CountryName")]);
    }

    if ((findasiancountry(Line[headers.indexOf('CountryName')])) && (Line[headers.indexOf('IndicatorCode')] === 'SP.DYN.LE00.FE.IN')) {
      if (year !== (Line[headers.indexOf('Year')])) {
        // console.log(Line[headers.indexOf("Year")+1])
        // console.log("female");
        asianmale.set(Line[headers.indexOf('Year')], lifeexpmale);
        asianfemale.set(Line[headers.indexOf('Year')], lifeexpfemale);
        lifeexpfemale = 0;
        lifeexpmale = 0;
        year = Line[headers.indexOf('Year')];
      }


      lifeexpfemale += parseFloat(Line[headers.indexOf('Value')]);
      asianfemale.set(Line[headers.indexOf('Year')], lifeexpfemale);


      /* console.log('!!!!!!!!!!!!!!!!!!!!!!!!');
console.log(Line[headers.indexOf("CountryName")]);
console.log(Line[headers.indexOf("Value")+1]);
console.log(Line[headers.indexOf("Year")+1]);
console.log('!!!!!!!!!!!!!!!!!!!!!!!!!'); */
}

if ((findasiancountry(Line[headers.indexOf('CountryName')])) && (Line[headers.indexOf('IndicatorCode')] === 'SP.DYN.LE00.MA.IN')) {
      /* if(year!=(Line[headers.indexOf("Year")+1])
 { //console.log(Line[headers.indexOf("Year")+1]);
//console.log("male");


} */
lifeexpmale += parseFloat(Line[headers.indexOf('Value')]);
asianmale.set(Line[headers.indexOf('Year')], lifeexpmale);

      /* console.log('!!!!!!!!!!!!!!!!!!!!!!!!');
console.log(Line[headers.indexOf("CountryName")]);
.log(Line[headers.indexOf("Value")+1]);
.log(Line[headers.indexOf("Year")+1]);
console.log('!!!!!!!!!!!!!!!!!!!!!!!!!'); */
}
}


if ((Line[(headers.indexOf('CountryName'))] === 'India')
 && ((Line[(headers.indexOf('IndicatorName'))] === '"Birth rate, crude (per 1,000 people)"')
   || (Line[(headers.indexOf('IndicatorName'))] === '"Death rate, crude (per 1,000 people)"'))) {
  if (Line[(headers.indexOf('IndicatorName'))] === '"Birth rate, crude (per 1,000 people)"') {
    birthrate = Line[headers.indexOf('Value')];
    year = Line[headers.indexOf('Year')];
  } else {
    deathrate = Line[headers.indexOf('Value')];

    /* OBJECT CREATION AT THE END OF FILTRATION */
    const ans1 =
    {
     deathrate: parseFloat(deathrate),
     birthrate: parseFloat(birthrate),
     year,
   };

   indiaArr.push(ans1);
 }
}
});


  rl.on('close', () => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(headers);

    const topFivenationsArr = Array.from(topFivenations);
    topFivenationsArr.sort((a, b) => {
      if (a[1] > b[1]) return (-1);
      else if (a[1] < b[1]) return (1);
      return (0);
    });
  // console.log(topFivenationsArr);

  const topFive = [];
  topFivenationsArr.slice(0, 5).forEach((element) => {
    const obj = {
      CountryName: element[0].replace(/^"(.+(?="$))"$/, '$1'),


      Lifeexpectancy: parseFloat(element[1]),
    };
    topFive.push(obj);
  });
  // console.log(topFive);
  JSONfile1 = JSON.stringify(topFive, null, 3);
  console.log(JSONfile1);

  const asianArr = [];
  asianfemale.forEach((element, index) => {
    const obj = {
      year: index,
      female: element / asianCountries.length,
      male: asianmale.get(index) / asianCountries.length,
    };
    asianArr.push(obj);
  });
  JSONfile2 = JSON.stringify(asianArr, null, 3);
  console.log(JSONfile2);

  // console.log(indiaArr);
  JSONfile3 = JSON.stringify(indiaArr, null, 3);
  console.log(JSONfile3);

  fs.writeFile('outputdata/file_01.json', JSONfile1, (err) => {
    if (err) {
      return console.log(err);
    }
    return false;
  });
  fs.writeFile('outputdata/file_02.json', JSONfile2, (err) => {
    if (err) {
      return console.log(err);
    }
    return false;
  });
  fs.writeFile('outputdata/file_03.json', JSONfile3, (err) => {
    if (err) {
      return console.log(err);
    }
    return false;
  });
});
return("JSON written successfully");
}


module.exports=convert;
