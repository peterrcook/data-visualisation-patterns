var store = {
    state: {
        data: [],
        selectedSegment: null
    },
    setData(data) {
        this.state.data = data;
    },
    setSelectedSegment(d) {
        if(this.state.selectedSegment && this.state.selectedSegment.id === d.id)
            this.state.selectedSegment = d.parent;
        else
            this.state.selectedSegment = d;
    }
}

export default store;
