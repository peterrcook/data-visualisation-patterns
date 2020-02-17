import Popup from "@flourish/popup";

import store from './store';

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

function updatePopup() {
    var c = store.state.hoveredCountry;

    if(c) {
        popup
            .point([100, 100])
            .point(c.el)
            .html(popupTemplate(c.d.datum))
            .draw();
    } else {
        popup.hide();
    }
}

export { updatePopup };
