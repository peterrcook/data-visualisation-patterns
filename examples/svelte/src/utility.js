import sortBy from 'lodash/sortBy';

function sortData(data, field) {
    let sorted;
    
    switch(field) {
    case 'country':
        sorted = sortBy(data, function(d) {
            return d.name;
        });
        break;
    case 'renewable':
    case 'hydroelectric':
    case 'oilgascoal':
    case 'nuclear':
        sorted = sortBy(data, function(d) {
            return -d.energyMix[field];
        });
        break;
    }
    return sorted;
}

export { sortData };
