var store = {
    state: {
        data: [],
        message: 'Hello!!!!'
    },
    setMessageAction (newValue) {
        this.state.message = newValue
    },
    clearMessageAction () {
        this.state.message = ''
    },

    setData(data) {
        this.state.data = data;
    }
}

export default store;
