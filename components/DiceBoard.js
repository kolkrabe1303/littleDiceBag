app.component('dice-board', {
    emits: ['add-to-results', 'clearResults'],
    template:
    /*html*/
    `
    <div class="dice-board pb-2 mb-2">
        <div class="dice-count mb-1 row">
            <div class="col-6 text-center"><label class="no-wrap">Number of dice</label><br><div class="no-wrap w-100 d-flex align-items-center"><div @click="changeDiceCount(-1)" class="btn-pls-mns w-25 btn btn-sm btn-secondary">-</div><input id="dieCount" v-model="diceCount" class="w-50 form-control"><div @click="changeDiceCount(1)" class="btn-pls-mns w-25 btn btn-sm btn-secondary">+</div></div></div>
            <div class="col-6 text-center"><label class="no-wrap">Per die bonus</label><br><div class="no-wrap w-100 d-flex align-items-center"><div @click="changePerDieBonus(-1)" class="btn-pls-mns w-25 btn btn-sm btn-secondary">-</div><input id="perDieBonus" v-model="perDieBonus" class="w-50 form-control"><div @click="changePerDieBonus(1)" class="btn-pls-mns w-25 btn btn-sm btn-secondary">+</div></div></div>
        </div>
        <div class="dice-count pb-2 mb-2 row">
            <div class="col-6"></div>        
            <div class="col-6 text-center"><label class="no-wrap">Global bonus</label><br><div class="no-wrap w-100 d-flex align-items-center"><div @click="changeGlobalBonus(-1)" class="btn-pls-mns w-25 btn btn-sm btn-secondary">-</div><input id="globalBonus" v-model="globalBonus" class="w-50 form-control"><div @click="changeGlobalBonus(1)" class="btn-pls-mns w-25 btn btn-sm btn-secondary">+</div></div></div>
        </div>
        <div class="dice-buttons">
            <div class="row mb-2">
                <div class="col-4 text-center"><div @click="rollDie(4)" class="w-100 btn btn-secondary">d4</div></div>
                <div class="col-4 text-center"><div @click="rollDie(6)" class="w-100 btn btn-secondary ">d6</div></div>
                <div class="col-4 text-center"><div @click="rollDie(8)" class="w-100 btn btn-secondary">d8</div></div>
            </div>
            <div class="row mb-2">
                <div class="col-4 text-center"><div @click="rollDie(10)" class="w-100 btn btn-secondary">d10</div></div>
                <div class="col-4 text-center"><div @click="rollDie(12)" class="w-100 btn btn-secondary">d12</div></div>
                <div class="col-4 text-center"><div @click="rollDie(20)" class="w-100 btn btn-secondary">d20</div></div>
            </div>
            <div class="row mb-2">
                <div class="col-4 text-center"><div @click="rollDie(100)" class="w-100 btn btn-secondary">d100</div></div>
                <div class="col-4 text-center d-flex align-items-center"><div @click="rollCustomDie()" class="w-50 btn btn-secondary">d</div><input id="customDie" v-model="customDie" class="text-start w-50 form-control" placeholder="x"></div>
                <div class="col-4 text-center"><div @click="clearBoard()" class="w-100 btn btn-secondary">Clear</div></div>
            </div>
        </div>
        
    </div>
    `,
    data() {
        return {
            customDie: null,
            diceCount: 1,
            perDieBonus: 0,
            globalBonus: 0,
            customDieFlag: false
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
            if (this.globalBonus != 0) resultValue += parseInt(this.globalBonus)

            //prepare result string for multiple dice
            let singleRollsDetailsString = ""
            if (this.diceCount > 1 || this.globalBonus != 0 || this.perDieBonus != 0) {
                singleRollsDetailsString += "("
                for (let i=0; i<this.diceCount; i++) {
                    if (i > 0) singleRollsDetailsString += ", "
                    singleRollsDetailsString += singleRolls[i]
                    if (this.perDieBonus > 0) singleRollsDetailsString += "+" + this.perDieBonus
                    else if (this.perDieBonus < 0) singleRollsDetailsString += "-" + (-1 * this.perDieBonus)
                }
                singleRollsDetailsString += ")"
                if (this.globalBonus > 0) singleRollsDetailsString += " + " + this.globalBonus
                else if (this.globalBonus < 0) singleRollsDetailsString += " - " + (-1 * this.globalBonus)
            } else {
                singleRollsDetailsString += singleRolls[0]
            }
        
            //Prepare result struct
            let result = {
                value: resultValue,         //current shown result value modified by multiplier
                valueBase: resultValue,     //unmodified base result value
                dieType: dieType,
                diceCount: this.diceCount,
                singleRolls: singleRolls,
                singleRollsDetailsString:  singleRollsDetailsString,
                perDieBonus: this.perDieBonus,
                globalBonus: this.globalBonus,
                multiplier: 1,
                isCustomDie: this.customDieFlag //true if custom die type
            }

            //Log event and emit result to main.js
            console.log("Rolled " + result.diceCount + " die of type: " + result.dieType + " Result: " + result.value)
            this.$emit('add-to-results', result)
            this.customDieFlag = false
        },
        rollCustomDie() {
            this.customDieFlag = true
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
        },
        clearBoard() {
            this.customDie = null
            this.diceCount = 1
            this.perDieBonus = 0
            this.globalBonus = 0

            this.$emit('clearResults')
        }
    }
})