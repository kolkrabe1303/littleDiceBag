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
    <div class="result-display mb-2 ps-2">
        <div v-for="result in results" class="mb-1">
            <div class="d-inline-block w-25 pe-2 text-end"><b>{{result.diceCount}}d{{ result.dieType }}</b>:</div>
            <div class="d-inline-block w-75" style="font-size: 1.5rem;">{{ result.value }}</div>
            <div class="d-inline-block small" v-bind:class="{ ms25: result.singleRollsDetailsString }">{{ result.singleRollsDetailsString }}</div>
        </div>
    </div>
    `
})