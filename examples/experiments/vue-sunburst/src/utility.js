import { nest as d3_nest } from 'd3-collection';
import { hierarchy as d3_hierarchy } from "d3-hierarchy";
import { sum as d3_sum } from 'd3-array';

function radToDeg(a) {
    return 180 * a / Math.PI;
}

function getRoot(data, groupBy, sumBy) {
    let nest = d3_nest();

    groupBy.forEach(g => nest.key(d => d[g]));
    nest.rollup(d => d3_sum(d, d => sumBy ? +d[sumBy] : 1));
    
    let root = {
        name: 'root',
        values: nest.entries(data)
    };
    
    root = d3_hierarchy(root, d => d.values);
    root.sum(function(d) {
        return d.value;
    });

    root.data.key = 'root';

    // Assign unique ids
    root.eachBefore(d => {
        let ancestors = d.ancestors().reverse().map(d => d.data.key);
        d.id = ancestors.join('-');
    });

    return root;
}

export { radToDeg, getRoot };
