app.component('dice-buttons', {
    emits: ['add-to-results'],
    template:
    /*html*/
    `
    <h2>Dice-Board</h2>
    <div class="dice-buttons">
        <table>
            <tr><td><input id="dieCount" v-model="diceCount"><button @click="setDiceCount(1)">1</button><button @click="setDiceCount(2)">2</button><button @click="setDiceCount(3)">3</button></td></tr>
            <tr><td><button @click="rollDie(4)">d4</button></td></tr>
            <tr><td><button @click="rollDie(6)">d6</button></td></tr>
            <tr><td><button @click="rollDie(8)">d8</button></td></tr>
            <tr><td><button @click="rollDie(10)">d10</button></td></tr>
            <tr><td><button @click="rollDie(12)">d12</button></td></tr>
            <tr><td><button @click="rollDie(20)">d20</button></td></tr>
            <tr><td><button @click="rollDie(100)">d100</button></td></tr>
            <tr><td><form class="button-form" @submit.prevent="rollCustomDie">d<input id="customDie" v-model="customDie"><input class="button" type="submit" value="Roll!"></form></td></tr>
        </table>
    </div>
    `,
    data() {
        return {
            customDie: null,
            diceCount: 1
        }
    },
    methods: {
        rollDie(dieType) {

            //prepare result
            const singleRolls = []
            let resultValue = 0
            for (let i = 0; i<this.diceCount; i++) {
                singleRolls.push(this.randomIntFromInterval(1, dieType))   
                resultValue += singleRolls[i]
            }

            //prepare result string for multiple dice
            let singleRollsDetailsString = ""
            if (this.diceCount > 1) {
                singleRollsDetailsString += "("
                for (let i=0; i<this.diceCount; i++) {
                    if (i > 0) singleRollsDetailsString += ", "
                    singleRollsDetailsString += singleRolls[i]
                }
                singleRollsDetailsString += ")"
            }
            let result = {
                value: resultValue,
                dieType: dieType,
                diceCount: this.diceCount,
                singleRolls: singleRolls,
                singleRollsDetailsString:  singleRollsDetailsString
            }
            this.emitRollResult(result)
        },
        rollCustomDie() {
            const singleRolls = []
            let resultValue = 0
            for (let i = 0; i<this.diceCount; i++) {
                singleRolls.push(this.randomIntFromInterval(1, this.customDie))
                resultValue += singleRolls[singleRolls.length - 1]
            }
            //prepare result string for multiple dice
            let singleRollsDetailsString = ""
            if (this.diceCount > 1) {
                singleRollsDetailsString += "("
                for (let i=0; i<this.diceCount; i++) {
                    if (i > 0) singleRollsDetailsString += ", "
                    singleRollsDetailsString += singleRolls[i]
                }
                singleRollsDetailsString += ")"
            }
            let result = {
                value: resultValue,
                dieType: this.customDie,
                diceCount: this.diceCount,
                singleRolls: singleRolls,
                singleRollsDetailsString:  singleRollsDetailsString
            }
            this.emitRollResult(result)
        },
        emitRollResult(result) {
            console.log("Rolled " + result.diceCount + " die of type: " + result.dieType + " Result: " + result.value)
            this.$emit('add-to-results', result)
        },
        randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
        setDiceCount(diceCount) {
            this.diceCount = diceCount
        }
    }
})