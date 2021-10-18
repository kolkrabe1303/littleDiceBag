app.component('result-display', {
    props: {
        results: {
            type: Array,
            required: true
        }
    },
    template: 
    /*html*/
    `
    <h2>Results</h2>
    <div class="result-display">
        <p v-for="result in results"> <b>{{result.diceCount}}d{{ result.dieType }}</b>: <big>{{ result.value }}</big> <br><small>{{ result.singleRollsDetailsString }}</small></p>
    </div>
    `
})