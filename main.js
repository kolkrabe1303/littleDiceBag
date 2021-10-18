const app = Vue.createApp({
    data () {
        return {
            greetMessage: "Hello friend, roll a die or two!",
            greetMe: true,
            results: []
        }
    },
    methods: {
        addToResults(result) {
            this.results.unshift(result)
        }
    }
})