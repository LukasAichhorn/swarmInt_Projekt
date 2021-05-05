export class Grow{
    constructor(){};

    execute(bot,sk){
        if(bot.states.colliding){
            console.log("grow");
            bot.size = bot.size + 0.5;
        }

    }
    checkStates(bots,bot){

    }
}