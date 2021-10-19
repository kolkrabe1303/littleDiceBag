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
        <p v-for="result in results"> <b>{{result.diceCount}}d{{ result.dieType }}</b>: <span style="font-size: 1.5rem;">{{ result.value }}</span> <br><small>{{ result.singleRollsDetailsString }}</small></p>
    </div>
    `
})