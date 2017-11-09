var fakedata=require('./fakedata');
var jsonfile = require('jsonfile');

var pschoolsfuture = fakedata.makePrimarySchools();
var pschools2018 = {type:'FeatureCollection',features:pschoolsfuture.features.slice(50)};
var pschools2017 = {type:'FeatureCollection',features:pschoolsfuture.features.slice(20)};

var sschoolsfuture = fakedata.makeSecondarySchools();
var sschools2018 = {type:'FeatureCollection',features:sschoolsfuture.features.slice(50)};
var sschools2017 = {type:'FeatureCollection',features:sschoolsfuture.features.slice(20)};


var pboundsfuture = fakedata.makeBoundaries(pschoolsfuture, 'primary',[]);
var pbounds2018 = fakedata.makeBoundaries(pschools2018, 'primary',[]);
var pbounds2017 = fakedata.makeBoundaries(pschools2017, 'primary',[]);

var sboundsfuture = fakedata.makeBoundaries(sschoolsfuture, 'secondary',[]);
var sbounds2018 = fakedata.makeBoundaries(sschools2018, 'secondary',[]);
var sbounds2017 = fakedata.makeBoundaries(sschools2017, 'secondary',[]);


jsonfile.writeFileSync('fakedata/primary-2017-boundaries.geojson', pbounds2017);
jsonfile.writeFileSync('fakedata/primary-2018-boundaries.geojson', pbounds2018);
jsonfile.writeFileSync('fakedata/primary-future-boundaries.geojson', pboundsfuture);

jsonfile.writeFileSync('fakedata/secondary-2017-boundaries.geojson', sbounds2017);
jsonfile.writeFileSync('fakedata/secondary-2018-boundaries.geojson', sbounds2018);
jsonfile.writeFileSync('fakedata/secondary-future-boundaries.geojson', sboundsfuture);


jsonfile.writeFileSync('fakedata/primary-2017-schools.geojson', pschools2017);
jsonfile.writeFileSync('fakedata/primary-2018-schools.geojson', pschools2018);
jsonfile.writeFileSync('fakedata/primary-future-schools.geojson', pschoolsfuture);

jsonfile.writeFileSync('fakedata/secondary-2017-schools.geojson', sschools2017);
jsonfile.writeFileSync('fakedata/secondary-2018-schools.geojson', sschools2018);
jsonfile.writeFileSync('fakedata/secondary-future-schools.geojson', sschoolsfuture);