import Popup from "@flourish/popup";

import { hoveredMeta } from './store.js';

let popup = Popup();

function popupTemplate(d) {
    var html = '';
    html += '<h3>' + d.name + '</h3>';

    if(d.energyMix.renewable) {
        html += '<div>Renewable: ' + d.energyMix.renewable + '%</div>';
    }

    if(d.energyMix.hydroelectric) {
        html += '<div>Hydroelectric: ' + d.energyMix.hydroelectric + '%</div>';
    }

    if(d.energyMix.oilgascoal) {
        html += '<div>Oil, Gas & Coal: ' + d.energyMix.oilgascoal + '%</div>';
    }

    if(d.energyMix.nuclear) {
        html += '<div>Nuclear: ' + d.energyMix.nuclear + '%</div>';
    }

    return html;
}

hoveredMeta.subscribe((value) => {
    if(value) {
        popup
            .point(value.el)
            .html(popupTemplate(value.d.datum))
            .draw();
    } else {
        popup.hide();
    }
});
