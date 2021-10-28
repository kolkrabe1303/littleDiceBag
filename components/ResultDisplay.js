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
        <div v-for="result in results" class="result">
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
                </tr>
                <tr class="tr-math" v-if="result.singleRollsDetailsString">
                    <td></td>
                    <td class="td-math">{{ result.singleRollsDetailsString }}</td>
                </tr>
            </table>
        </div>
    </div>
    `

})