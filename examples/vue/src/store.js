var store = {
    state: {
        data: [],
        selectedSortBy: 'country'
    },
    setData(data) {
        this.state.data = data;
    },
    setSelectedSortBy(newValue) {
        this.state.selectedSortBy = newValue;
    }
}

export default store;
