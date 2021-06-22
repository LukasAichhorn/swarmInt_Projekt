
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

    constructor(numBots, selectedAbilities) {
        this.numBots = numBots;
        let color = new color_generator; 
        this.abilities = this.getSelectedAbilities(selectedAbilities);
        //this.abilities.push(new move());
        let diameter = 10;
        //array type bots
        this.bots = [];
        for (let i = 0; i < numBots; i++) {                      
            // WILD color ist aktiviert
            var currentColor = {name: color.getWildColor(), number: 1};
            let newDave = new Dave(this.PosSpawnY(diameter, canvas_width, i, numBots),this.PosSpawnX(diameter, canvas_height, i, numBots),currentColor.name,i ,p5.Vector.random2D(), diameter);
            this.bots.push(newDave);
        }
        this.speed = 2;        
        console.log("Swarm Construction Completed");
    }

    PosSpawnX(from, to, nr, numBots){    
        let numPerRow = Math.ceil(Math.sqrt(numBots));
        let interval = Math.floor(to / (numPerRow + 1));
        let pos = Math.floor(nr / numPerRow);        
        let val = (pos * interval) + interval;
        return val;
    }


    PosSpawnY(from, to, nr, numBots){    
        let numPerRow = Math.ceil(Math.sqrt(numBots));
        let interval = Math.floor(to / (numPerRow + 1));
        let pos = nr % numPerRow;        
        let val =  (pos * interval) + interval;
        return val;
    }

    randPos(from ,to){
        let val = Math.floor((Math.random() * to) + from);
        return val;
    }

    // This function draws each bot while simultaniously tracking the colors present in the swarm
    draw(sk){
        this.bots.forEach((bot)=>{
            bot.speed = this.speed;
            bot.draw(sk);
        });
    }

    addBot(bot) {
        this.bots.push(bot);
        this.numBots += 1;
    }

    setSpeed(speed){
        this.speed = speed;
    }s

    search(nameKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].name === nameKey) {
                return myArray[i];
            }
        }
    }
    getSelectedAbilities(selectedAbilities) {
    console.log("inside get select");

   

        let abilities = []; 

        if(this.search("select", selectedAbilities)){
            console.log("i found a selected Algorithm");
            console.log(selectedAbilities);
            let algo = selectedAbilities.find( elem => elem.name =="select");
             if(algo.value == "PPS"){
                abilities.push(new pps(
                    selectedAbilities.find( elem => elem.name =="Speed").value,
                    selectedAbilities.find( elem => elem.name =="Spin").value,
                    selectedAbilities.find( elem => elem.name =="Radius").value,
                    selectedAbilities.find( elem => elem.name =="beta").value
                ));
             }
            
        }  

        if(this.search("move", selectedAbilities)){
            console.log("i add move module"),  
            abilities.push(new move());
        }      
        // if(this.search("PPS", selectedAbilities)){
        //     console.log("i add PPS module"),  
        //     abilities.push(new pps());
        // }      
        if(this.search("Wall Collision", selectedAbilities)){
            console.log("i add wall collision"),  
            abilities.push(new WallDetector());
        }
        if(this.search("Collision Detection", selectedAbilities))
            abilities.push(new CollisionTreeDetection());
        
        if(this.search("Color Changer", selectedAbilities))
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