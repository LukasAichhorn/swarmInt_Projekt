
export class move {
    
    constructor(){              
    this.name = "move";
    }

    moveInDirection(bot, sk){
        //console.log(sk.HALF_PI);
        if(bot.position[0] <= 1 || bot.position[0] >= 719){
            bot.direction.rotate(sk.HALF_PI);
            
        }
        else if(bot.position[1] <= 1 || bot.position[1] >= 399){
            bot.direction.rotate(sk.HALF_PI);
            
        }
        let posx = bot.position[0] + bot.direction.x;
        let posy = bot.position[1] + bot.direction.y;
        return [posx,posy];
    }

    getRandomDirection(){        
        return p5.Vector.random2D();
    }


    execute(bot, sk){

        if(bot.states.wall){
            bot.direction.rotate(sk.HALF_PI);
        }
       var newPos = this.moveInDirection(bot, sk);
       bot.position = newPos;
    }
    checkStates(){

    }
}