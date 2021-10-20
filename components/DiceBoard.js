app.component('dice-board', {
    emits: ['add-to-results'],
    template:
    /*html*/
    `
    <div class="dice-board mb-4">
        <h2>Dice-Board</h2>
        <div class="dice-count pb-3 mb-3 border-bottom text-center">
            <label>Number of dice</label><br><button @click="changeDiceCount(-1)" class="btn-pls-mns">-</button><input id="dieCount" v-model="diceCount"><button @click="changeDiceCount(1)" class="btn-pls-mns">+</button>
        </div>
        <div class="dice-buttons pb-3 mb-2 border-bottom">
            <div class="row mb-2">
                <div class="col-4 text-center"><button @click="rollDie(4)" class="w-100">d4</button></div>
                <div class="col-4 text-center"><button @click="rollDie(6)" class="w-100">d6</button></div>
                <div class="col-4 text-center"><button @click="rollDie(8)" class="w-100">d8</button></div>
            </div>
            <div class="row mb-2">
                <div class="col-4 text-center"><button @click="rollDie(10)" class="w-100">d10</button></div>
                <div class="col-4 text-center"><button @click="rollDie(12)" class="w-100">d12</button></div>
                <div class="col-4 text-center"><button @click="rollDie(20)" class="w-100">d20</button></div>
            </div>
            <div class="row">
                <div class="col-4 text-center"><button @click="rollDie(100)" class="w-100">d100</button></div>
                <div class="col-8 text-center">d<input id="customDie" v-model="customDie"><button @click="rollCustomDie()">Roll!</button></div>
            </div>
        </div>
        <div class="dice-bonus row mb-3">
            <div class="col-6 text-center"><label>Per die bonus</label><br><button @click="changePerDieBonus(-1)" class="btn-pls-mns">-</button><input id="perDieBonus" v-model="perDieBonus"><button @click="changePerDieBonus(1)" class="btn-pls-mns">+</button></div>
            <div class="col-6 text-center"><label>Global bonus</label><br><button @click="changeGlobalBonus(-1)" class="btn-pls-mns">-</button><input id="globalBonus" v-model="globalBonus"><button @click="changeGlobalBonus(1)" class="btn-pls-mns">+</button></div>
            </table>
        </div>
    </div>
    `,
    data() {
        return {
            customDie: null,
            diceCount: 1,
            perDieBonus: 0,
            globalBonus: 0,
        }
    },
    methods: {
        changePerDieBonus(amount) {
            this.perDieBonus = this.perDieBonus + amount
        },
        changeGlobalBonus(amount) {
            this.globalBonus = this.globalBonus + amount
        },
        rollDie(dieType) {

            //prepare result
            const singleRolls = []
            let resultValue = 0
            for (let i = 0; i<this.diceCount; i++) {
                singleRolls.push(this.randomIntFromInterval(1, dieType))   
                resultValue = resultValue + singleRolls[i] + parseInt(this.perDieBonus)
            }
            if (this.globalBonus > 0) resultValue += parseInt(this.globalBonus)

            //prepare result string for multiple dice
            let singleRollsDetailsString = ""
            if (this.diceCount > 1 || this.globalBonus > 0 || this.perDieBonus > 0) {
                singleRollsDetailsString += "("
                for (let i=0; i<this.diceCount; i++) {
                    if (i > 0) singleRollsDetailsString += ", "
                    singleRollsDetailsString += singleRolls[i]
                    if (this.perDieBonus > 0) singleRollsDetailsString += "+" + this.perDieBonus
                }
                singleRollsDetailsString += ")"
                if (this.globalBonus > 0) singleRollsDetailsString += " + " + this.globalBonus
            }
        
            //Prepare result struct
            let result = {
                value: resultValue,
                dieType: dieType,
                diceCount: this.diceCount,
                singleRolls: singleRolls,
                singleRollsDetailsString:  singleRollsDetailsString
            }

            //Log event and emit result to main.js
            console.log("Rolled " + result.diceCount + " die of type: " + result.dieType + " Result: " + result.value)
            this.$emit('add-to-results', result)
        },
        rollCustomDie() {
            this.rollDie(this.customDie)
        },
        randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
        setDiceCount(diceCount) {
            this.diceCount = diceCount
        },
        changeDiceCount(amount) {
            this.diceCount = this.diceCount + amount
        }
    }
})