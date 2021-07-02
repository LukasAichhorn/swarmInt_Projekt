import { canvas_height, canvas_width } from "../../settings/constants";

export class WallDetector{
    constructor(){
        this.name = "WallDetector";
    }
    
    checkStates(bots,bot){
        
        if(bot.position.x <= 1 || bot.position.x >= canvas_width-1){
            bot.states.wall = true;
            //console.log(`wall collosion for ${bot.name}`);
            return;
        }
        else if(bot.position.y <= 1 || bot.position.y >= canvas_height-1){
            bot.states.wall = true;
           // console.log(`wall collosion for ${bot.name}`)
            return
        }
        bot.states.wall = false;
    }

    execute(){}

}