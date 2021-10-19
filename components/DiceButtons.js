app.component('dice-buttons', {
    emits: ['add-to-results'],
    template:
    /*html*/
    `
    <h2>Dice-Board</h2>
    <div class="dice-buttons">
        <table>
            <tr><td><input id="dieCount" v-model="diceCount"><button @click="setDiceCount(1)">1</button><button @click="setDiceCount(2)">2</button><button @click="setDiceCount(3)">3</button></td></tr>
            <tr><td><hr></td></tr>
            <tr><td><button @click="rollDie(4)">d4</button></td></tr>
            <tr><td><button @click="rollDie(6)">d6</button></td></tr>
            <tr><td><button @click="rollDie(8)">d8</button></td></tr>
            <tr><td><button @click="rollDie(10)">d10</button></td></tr>
            <tr><td><button @click="rollDie(12)">d12</button></td></tr>
            <tr><td><button @click="rollDie(20)">d20</button></td></tr>
            <tr><td><button @click="rollDie(100)">d100</button></td></tr>
            <tr><td><form class="button-form" @submit.prevent="rollCustomDie">d<input id="customDie" v-model="customDie"><input class="button" type="submit" value="Roll!"></form></td></tr>
            <tr><td><hr></td></tr>
            <tr><td>Per die bonus <input id="perDieBonus" v-model="perDieBonus"></td></tr>
            <tr><td>Global bonus <input id="globalBonus" v-model="globalBonus"></td></tr>
        </table>
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
        }
    }
})