import { swarm } from "../UI/ui-generator";

export class finalConditions {
    constructor() {
        this.conditions = [];
    }

    add(condition) {
        this.conditions.push(condition);
    }

    checkFinalConditions() {
        let conditionBalance = 0;

        if (this.conditions.includes("swarmIsMonochrome")) {
            conditionBalance++;
            if(this.swarmIsMonochrome())
                conditionBalance--; 
        }
        return (conditionBalance == 0) ? true : false;
    }

    swarmIsMonochrome() {
        let colorsInSwarm = new Set();
        swarm.bots.forEach(bot => {
            colorsInSwarm.add(bot.colors);
        });
        if (colorsInSwarm.size == 1){
            this.conditions[this.conditions.indexOf("swarmIsMonochrome")] = "completed";
            console.log("Swarm is monochrome");
            return true;
        }
        return false;
    }
}