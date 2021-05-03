
import { move } from "./abilities/class_move";
import { Dave } from "./class_dave";
import { color_generator } from "./abilities/class_color_generator";

export class Swarm {    

    constructor(numBots, endConditions) {
        this.numBots = numBots;
        let color = new color_generator; 

        this.abilities = [new move()];

        //array type bots
        this.bots = [];
        for (let i = 0; i < numBots; i++) {                      

            // WILD color ist aktiviert
            let newDave = new Dave(this.randPos(1,720),this.randPos(1,400),color.getWildColor(),i ,this.abilities[0].getRandomDirection());
            
            this.bots.push(newDave);
            
        }
        this.taskCompleted = false;
        //irgendein array aber noch nicht sicher was da drin sein soll
        //evtl eine neue klasse?
        //muss irgendwie überprüfbar sein
        this.endConditions = endConditions;

        console.log("Swarm Construction Completed");
    }
    randPos(from ,to){
        let val = Math.floor((Math.random() * to) + from);
        return val;
       
    }
    draw(sk){
        this.bots.forEach((bot)=>{
            bot.draw(sk);
        });
    }
    addBot(bot) {
        this.bots.push(bot);
        this.numBots += 1;
    }

    //early idea on how a swarm can know if all tasks are completed
    //obv not finished!
    checkTaskCompletion() {

        this.endConditions.forEach(element => {
            if(element == "completed Task") {

            }
            else{
                return false;
            }
        });
        return true;

    }
    updateStatus() {
        if(this.checkTaskCompletion) {
            this.taskCompleted = true;
        }
        else{
            this.taskCompleted = false;
        }
    }

    doAbilities(sk){
       
        this.bots.forEach( bot => {
            this.abilities.forEach(ability => {
                ability.execute(bot, sk);
            });
        })     
    } 
}