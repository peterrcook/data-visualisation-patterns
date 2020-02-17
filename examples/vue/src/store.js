import { updatePopup } from './popup';

var store = {
    state: {
        data: [],
        selectedSortBy: 'country',
        hoveredCountry: null
    },
    setData(data) {
        this.state.data = data;
    },
    setSelectedSortBy(newValue) {
        this.state.selectedSortBy = newValue;
    },
    setHoveredCountry(d) {
        this.state.hoveredCountry = d;
        updatePopup();
    }
}

export default store;
