/* jshint esnext:true */
var turfrandom = require('@turf/random');
var bbox = [142, -37.9, 147, -36];


function fakeName(type) {
    function pick(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    var prefix = 'Upper Lower West South North Middle East New'.split(' ');
    var first = ('Wiggle Dunn Water Surry Eccle Kim Kyle Bets High Hurst Johns Williams Hughs Marys Gladys Edith Brecken Firth Eagle ' + 
    'New Stephen Ari Eber Bray Wart Turtle Badger Hare Lions Fire Hard Tree Kate Fins Gills Ellens Fitz Rich Kylie Gold').split(' ');
    var middle = "ing worth o".split(' ');
    var last = 'wood bridge cross stone worth mont ridge bury ville rock town pond smith dale vale kin van rick stein bourne field acres worthy wick wich dock water view'.split(' ');
    var typeText = {
        primary: ['Primary School'],
        secondary: ['Secondary School', 'Secondary College', 'High School']
    }[type];

    return (Math.random() > 0.5 ? pick(prefix) + ' ' : '') + pick(first) + (Math.random() >1 ? pick(middle) : '') + pick(last) + ' ' + pick(typeText);
}


module.exports.makeBoundaries = function(schools, type, schoolInfo) {
    var voronoi = require('turf-voronoi-polygons');
    var polygons = voronoi(schools, bbox);
    const rnd = x => Math.round(Math.random() * x) * {primary: 0.5, secondary: 1}[type];

    var years = {primary: ['Prep', 1, 2,3,4,5,6], secondary: [7,8,9,10,11,12]}[type];
    polygons.features.forEach((p, i) => {
        var id = i + {primary: 1000, secondary: 0}[type];
        p.properties = { id: id };

        schoolInfo[id] = {
            id: id,
            name: fakeName(type),
            base: rnd(600),
            relocatables: rnd(100),
            enrolments: years.map(y => ({ year: y, students: rnd(150) })),

            attendGov: rnd(500),
            attendNonGov: rnd(100), 

            demand: ['Primary School', 'Secondary School', 'Year 7'].map(y => ({ year: y, attendGov: rnd(100), attendNonGov: rnd(50) })),

        };
        // just for datavis
        p.properties.demandTotal = schoolInfo[id].attendGov + schoolInfo[id].attendNonGov;
    });
    return polygons;
};

module.exports.makePrimarySchools = function() {
    var schools = turfrandom('points', 1528, { bbox: bbox });
    schools.features.forEach((s, i) => s.properties.id = i + 10000);
    return schools;
};

module.exports.makeSecondarySchools = function() {
    var schools = turfrandom('points', 600, { bbox: bbox });
    schools.features.forEach((s, i) => s.properties.id = i);
    return schools;
};