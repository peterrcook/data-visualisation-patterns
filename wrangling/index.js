let d3 = require('d3');
let fs = require('fs');

let f = fs.readFileSync('world-bank-electricity-sources.csv', 'utf8');
let data = d3.csvParse(f);

var countries = {};
var year = 2015;

// key substitutes
var subs = {
    'Oil, gas and coal': 'oilgascoal',
    'Renewable sources, excluding hydroelectric': 'renewable',
    'Hydroelectric': 'hydroelectric'
};

data.forEach(d => {
    var key = d['Country Code'];

    if (!countries[key]) {
        countries[key] = {
            id: key,
            name: d['Country Name'],
            energyMix: {}
        };
    }

    var indicator = d['Indicator Name'];
    indicator = subs[indicator] || indicator.toLowerCase();
    if(d[year] !== '')
        countries[key].energyMix[indicator] = +d[year];
});

var out = [];
Object.keys(countries).forEach(k => {
    if(Object.keys(countries[k].energyMix).length > 0)
        out.push(countries[k]);
});

fs.writeFileSync('data.json', JSON.stringify(out, null, 2));
