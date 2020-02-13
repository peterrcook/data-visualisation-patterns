var menuItems = [
    {
        id: 'country',
        label: 'Country'
    },
    {
        id: 'renewable',
        label: 'Renewable'
    },
    {
        id: 'hydroelectric',
        label: 'Hydroelectric'
    },
    {
        id: 'oilgascoal',
        label: 'Oil, Gas & Coal'
    },
    {
        id: 'nuclear',
        label: 'Nuclear'
    }
];

function updateMenu() {
    d3.select('#controls .menu .items')
        .selectAll('.item')
        .data(menuItems)
        .join('div')
        .classed('item', true)
        .classed('selected', function(d) {
            return sortBy === d.id;
        })
        .html(function(d) {
            return '<svg width="18" height="18"><circle class="' + d.id + '" cx="9" cy="9" r="8"></svg><div class="label">' + d.label + '</div>';
        })
        .on('click', function(d) {
            sortBy = d.id;
            update();
        });
}
