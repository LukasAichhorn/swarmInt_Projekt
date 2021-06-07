
import { move } from "./abilities/class_move";
import { Dave } from "./class_dave";
import { color_generator } from "./abilities/class_color_generator";
import { WallDetector } from "./abilities/class_wall_detector";
import { ColorChanger } from "./abilities/class_colorChanger";
import { CollisionTreeDetection } from "./abilities/class_collosionTreeDetection";
import { Grow } from "./abilities/class_grow";
import {canvas_width, canvas_height} from "../settings/constants.js";
import { pps } from "./abilities/class_pps";


export class Swarm {    

    constructor(numBots, selectedAbilities, endConditions) {
        this.numBots = numBots;
        let color = new color_generator; 
        this.abilities = this.getSelectedAbilities(selectedAbilities);
        //this.abilities.push(new move());
        let diameter = 5;
        //array type bots
        this.bots = [];
        for (let i = 0; i < numBots; i++) {                      
            // WILD color ist aktiviert
            var currentColor = {name: color.getWildColor(), number: 1};
            let newDave = new Dave(this.PosSpawnY(diameter, canvas_width, i, numBots),this.PosSpawnX(diameter, canvas_height, i, numBots),currentColor.name,i ,p5.Vector.random2D(), diameter);
            this.bots.push(newDave);
        }
        this.taskCompleted = false;
        this.speed = 2;
        //irgendein array aber noch nicht sicher was da drin sein soll
        //evtl eine neue klasse?
        //muss irgendwie überprüfbar sein
        this.endConditions = endConditions;
        console.log("Swarm Construction Completed");
    }

    PosSpawnX(from, to, nr, numBots){    
        let numPerRow = Math.ceil(Math.sqrt(numBots));
        let interval = Math.floor(to / numPerRow);
        let pos = Math.floor(nr / numPerRow);        
        let val = from + pos * interval;
        return val;
    }


    PosSpawnY(from, to, nr, numBots){    
        let numPerRow = Math.ceil(Math.sqrt(numBots));
        let interval = Math.floor(to / numPerRow);
        let pos = nr % numPerRow;        
        let val = from + pos *interval;
        return val;
    }

    randPos(from ,to){
        let val = Math.floor((Math.random() * to) + from);
        return val;
    }

    // This function draws each bot while simultaniously tracking the colors present in the swarm
    draw(sk){
        let colorsInSwarm = new Set();
        this.bots.forEach((bot)=>{
            bot.speed = this.speed;
            bot.draw(sk);
            colorsInSwarm.add(bot.colors);
        });
        if ((colorsInSwarm.size === 1) && (this.endConditions.includes("swarmIsMonochrome"))){
            this.endConditions[this.endConditions.indexOf("swarmIsMonochrome")] = "completed";
            console.log("Swarm is monochrome");
        }
    }

    addBot(bot) {
        this.bots.push(bot);
        this.numBots += 1;
    }

    setSpeed(speed){
        this.speed = speed;
    }


    //early idea on how a swarm can know if all tasks are completed
    //obv not finished!
    checkTaskCompletion() {
        for (let i = 0; i < this.endConditions.length; i++){
            if (this.endConditions[i] !== "completed")
                return false;
        }
        return true;
    }
    
    updateStatus() {
        if(this.checkTaskCompletion()) {
            console.log("tasks completed");
            this.tasksCompleted = true;
        }
        else{
            this.tasksCompleted = false;
        }
    }

    getSelectedAbilities(selectedAbilities) {
    console.log("inside get select");

    function search(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].name === nameKey) {
                return myArray[i];
            }
        }
    }

        let abilities = []; 
        if(search("move", selectedAbilities)){
            console.log("i add move module"),  
            abilities.push(new move());
        }      
        if(search("PPS", selectedAbilities)){
            console.log("i add PPS module"),  
            abilities.push(new pps());
        }    
                
        if(search("Wall Collision", selectedAbilities)){
            console.log("i add wall collision"),  
            abilities.push(new WallDetector());
        }
            

        if(search("Collision Detection", selectedAbilities))
            abilities.push(new CollisionTreeDetection());
        
        if(search("Color Changer", selectedAbilities))
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