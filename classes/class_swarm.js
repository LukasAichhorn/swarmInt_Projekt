
import { move } from "./abilities/class_move";
import { Dave } from "./class_dave";
import { color_generator } from "./abilities/class_color_generator";
import { WallDetector } from "./abilities/class_wall_detector";
import { ColorChanger } from "./abilities/class_colorChanger";
import { CollisionTreeDetection } from "./abilities/class_collosionTreeDetection";
import { Grow } from "./abilities/class_grow";
import {canvas_width, canvas_height} from "../settings/constants.js";


export class Swarm {    

    constructor(numBots, selectedAbilities, endConditions) {
        this.numBots = numBots;
        let color = new color_generator; 
        this.abilities = this.getSelectedAbilities(selectedAbilities);
        let diameter = 10;
        //array type bots
        this.bots = [];
        this.pickedColors = [];
        for (let i = 0; i < numBots; i++) {                      
            // WILD color ist aktiviert
            var currentColor = {name: color.getWildColor(), number: 1};
            let newDave = new Dave(this.randPos(diameter,canvas_width-diameter),this.randPos(diameter,canvas_height-diameter),currentColor.name,i ,this.abilities[0].getRandomDirection(), diameter);
            this.bots.push(newDave);
            var ind = this.pickedColors.indexOf(currentColor.name);
            if (ind === -1){
                this.pickedColors.push(currentColor);
                console.log("not found");
                ind = this.pickedColors.length-1;
            }
            else {
                this.pickedColors[ind].name++;
            }
            console.log("index:" + ind);
            console.log("expected: " + currentColor.name);
            console.log("color: " + this.pickedColors[ind].name);
        }
        console.log(this.pickedColors);
         
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

    getSelectedAbilities(selectedAbilities) {


        let abilities = [];

        if(selectedAbilities.includes(1))
            abilities.push(new move());
        
        if(selectedAbilities.includes(2))
            abilities.push(new WallDetector());

        if(selectedAbilities.includes(3))
            abilities.push(new CollisionTreeDetection());
        
        if(selectedAbilities.includes(4))
            abilities.push(new ColorChanger());

        return abilities;



    }


    setBotStates(sk){
       for (let ability = 0; ability < this.abilities.length; ability++) {
          
           for (let bot = 0; bot < this.bots.length; bot++) {
            
               this.abilities[ability].checkStates(this.bots,this.bots[bot]);

               
           }
           
       }
       
       return true;
    }
    excecuteAbilities(sk){
        for (let ability = 0; ability < this.abilities.length; ability++) {
            
            for (let bot = 0; bot < this.bots.length; bot++) {
                
                
                this.abilities[ability].execute(this.bots[bot],sk);
                
            }
            
        }
        return true;
        
     }


}