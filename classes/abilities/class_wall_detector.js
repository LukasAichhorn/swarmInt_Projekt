export class WallDetector{
    constructor(){
        this.name = "WallDetector";
    }
    
    checkStates(bots,bot){
        
        if(bot.position[0] <= 1 || bot.position[0] >= 719){
            bot.states.wall = true;
            //console.log(`wall collosion for ${bot.name}`);
            return;
        }
        else if(bot.position[1] <= 1 || bot.position[1] >= 399){
            bot.states.wall = true;
           // console.log(`wall collosion for ${bot.name}`)
            return
        }
        bot.states.wall = false;
    }
    execute(){

    }

}