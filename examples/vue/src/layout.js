function getLayout(data, args) {
    var cellWidth = args.width / args.numColumns;
    var cellHeight = cellWidth * 1.2;

    var layout = data.map(function(d, i) {
        var ret = {};

        ret.id = d.id;
        
        var col = i % args.numColumns;
        var row = Math.floor(i / args.numColumns);
        ret.x = col * cellWidth + 0.5 * cellWidth;
        ret.y = row * cellHeight + 0.5 * cellHeight;

        ret.oilGasCoalRadius = args.radiusScale(d.energyMix.oilgascoal) || 0;
        ret.renewableRadius = args.radiusScale(d.energyMix.renewable) || 0;
        ret.hydroelectricRadius = args.radiusScale(d.energyMix.hydroelectric) || 0;
        ret.nuclearRadius = args.radiusScale(d.energyMix.nuclear) || 0;

        ret.labelYOffset = cellHeight * 0.45;
        ret.label = d.id;

        if(args.sortBy !== 'country') {
            ret.opacity = d.energyMix[args.sortBy] > 0 ? 1 : 0;
        } else {
            ret.opacity = 1;
        }

        ret.popupOffset = -args.radiusScale(50);
        ret.pickRadius = args.radiusScale(100);
        ret.datum = d;

        return ret;
    });

    return layout;
}


export default getLayout;
