export class WallDetector{
    constructor(){
        this.name = "WallDetector";
    }
    
    checkStates(bots,bot){
        
        if(bot.position.x <= 1 || bot.position.x >= 719){
            bot.states.wall = true;
            //console.log(`wall collosion for ${bot.name}`);
            return;
        }
        else if(bot.position.y <= 1 || bot.position.y >= 399){
            bot.states.wall = true;
           // console.log(`wall collosion for ${bot.name}`)
            return
        }
        bot.states.wall = false;
    }
    execute(){

    }

}