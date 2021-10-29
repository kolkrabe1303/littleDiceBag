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
    <div class="result-display mb-2 px-2 pb-1 pt-3 bg-gray">
        <div v-for="(result, index) in results" class="result">
            <table class="result-table">
                <tr class="tr-result">
                    <td class="td-roll">
                        <strong>
                            {{result.diceCount}}d{{ result.dieType }}<span v-if="result.perDieBonus > 0">+{{ result.perDieBonus * result.diceCount}}</span><span v-else-if="result.perDieBonus < 0">-{{ (result.perDieBonus * -1 * result.diceCount) }}</span>
                            <span v-if="result.globalBonus > 0"> + {{ result.globalBonus }}</span>
                            <span v-else-if="result.globalBonus < 0"> - {{ (result.globalBonus * -1) }}</span>
                        </strong>:
                    </td>
                    <td class="td-sum">
                        {{ result.value }}
                    </td>
                    <td class="td-multiplier">
                        <div class="btn badge btn-secondary d-inline-block" @click="multiply(0.5, index)">&times;&#189;</div>
                        <div class="btn badge btn-secondary d-inline-block" @click="multiply(2, index)">&times;2</div>
                        <div class="btn badge btn-secondary d-inline-block" @click="multiply(3, index)">&times;3</div>
                        <div class="btn badge btn-secondary d-inline-block" @click="multiply(0, index)">&#x2715;</div>

                    </td>
                </tr>
                <tr class="tr-math" v-if="result.diceCount != 1 || result.globalBonus != 0 || result.perDieBonus != 0 || result.multiplier != 1">
                    <td></td>
                    <td class="td-math" colspan="2"><span v-if="result.multiplier != 1">[</span>{{ result.singleRollsDetailsString }}<span v-if="result.multiplier != 1">] &times; {{ result.multiplier }}</span></td>
                </tr>
            </table>
        </div>
    </div>
    `,
    methods: {
        multiply(multiplier, index) {
            if (multiplier == 0) {
                //Reset result value to base result value and multiplier to 1
                this.results[index].value = this.results[index].valueBase
                this.results[index].multiplier = 1
            } else {            
            //Calculate multiplier
            let oldResultMultiplier = this.results[index].multiplier
            this.results[index].multiplier = oldResultMultiplier * multiplier
            
            //Calculate value based on current multiplier and base result value
            this.results[index].value = Math.floor(this.results[index].valueBase * this.results[index].multiplier)
            }
        }
    },
    computed: {

    }

})