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
    <div class="result-display mb-2 p-2 bg-gray">
        <div v-for="result in results" class="mb-1">
            <div class="result-roll-label d-inline-block text-end pe-2">
                <strong>
                    {{result.diceCount}}d{{ result.dieType }}<span v-if="result.perDieBonus > 0">+{{ result.perDieBonus }}</span><span v-else-if="result.perDieBonus < 0">-{{ (result.perDieBonus * -1) }}</span>
                    <span v-if="result.globalBonus > 0"> + {{ result.globalBonus }}</span>
                    <span v-else-if="result.globalBonus < 0"> - {{ (result.globalBonus * -1) }}</span>
                </strong>:
            </div>
            <div class="result-sum-label fs-2 d-inline-block">{{ result.value }}</div>
            <div class="result-math-label small" v-if="result.singleRollsDetailsString">{{ result.singleRollsDetailsString }}</div>
        </div>
    </div>
    `

})