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
    <div class="result-display mb-4">
        <h2>Results</h2>
        <p class="border-bottom pb-1" v-for="result in results"> <b>{{result.diceCount}}d{{ result.dieType }}</b>: <span style="font-size: 1.5rem;">{{ result.value }}</span> <br><small>{{ result.singleRollsDetailsString }}</small></p>
    </div>
    `
})