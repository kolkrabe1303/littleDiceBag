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
            <div class="row">
                <div class="result-roll-label col-sm-5 col-6 pe-2 d-flex align-items-end justify-content-end">
                    <div class="fw-bold">
                        {{result.diceCount}}d{{ result.dieType }}<span v-if="result.perDieBonus > 0">+{{ result.perDieBonus }}</span><span v-else-if="result.perDieBonus < 0">-{{ (result.perDieBonus * -1) }}</span>
                        <span v-if="result.globalBonus > 0"> + {{ result.globalBonus }}</span>
                        <span v-else-if="result.globalBonus < 0"> - {{ (result.globalBonus * -1) }}</span>
                    </div>
                    :
                </div>
                <div class="result-sum-label col-sm-7 col-6 ps-0 d-flex align-items-end justify-content-start"><span>{{ result.value }}</span></div>
                <div class="row" v-if="result.singleRollsDetailsString">
                    <div class="col-sm-5 col-6"></div>
                    <div class="small result-math-label col-sm-7 col-6 d-flex align-items-end justify-content-start" v-bind:class="">{{ result.singleRollsDetailsString }}</div>
                </div>
            </div>
        </div>
    </div>
    <!--{ ms35: result.singleRollsDetailsString }-->
    `

})