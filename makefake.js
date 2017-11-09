var fakedata=require('./fakedata');
var jsonfile = require('jsonfile');
var fs =require('fs');
/* jshint esnext:true */
var out = {};

out['primary-future-schools'] = fakedata.makePrimarySchools();
out['primary-2018-schools'] = {type:'FeatureCollection',features:out['primary-future-schools'].features.slice(50)};
out['primary-2017-schools'] = {type:'FeatureCollection',features:out['primary-future-schools'].features.slice(20)};

out['secondary-future-schools'] = fakedata.makeSecondarySchools();
out['secondary-2018-schools'] = {type:'FeatureCollection',features:out['secondary-future-schools'].features.slice(50)};
out['secondary-2017-schools'] = {type:'FeatureCollection',features:out['secondary-future-schools'].features.slice(20)};

['primary','secondary'].forEach(type =>
    ['2017','2018','future'].forEach(year => {
        jsonfile.writeFileSync(`fakedata/${type}-${year}-schools.geojson`, out[`${type}-${year}-schools`]);
        console.log(out[`${type}-${year}-schools`].features.length);
        jsonfile.writeFileSync(`fakedata/${type}-${year}-boundaries.geojson`, fakedata.makeBoundaries(out[`${type}-${year}-schools`], type, []));        
        var locations = out[`${type}-${year}-schools`].features.map(school => [school.properties.name, ...school.geometry.coordinates]);
        fs.writeFileSync(`${type}-${year}-locations.csv`, 'name,lon,lat\n' + locations.join('\n'));        
    })
);
