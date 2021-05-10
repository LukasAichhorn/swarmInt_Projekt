
export class move {
    
    constructor(){              
    this.name = "move";
    }

    moveInDirection(bot, sk,speed){
        //console.log(sk.HALF_PI);
        if(bot.position.x <= 1 || bot.position.x >= 719){
            bot.direction.rotate(sk.HALF_PI);
            
        }
        else if(bot.position.y <= 1 || bot.position.y >= 399){
            bot.direction.rotate(sk.HALF_PI);
            
        }
        let posx = bot.position.x + bot.direction.x*speed;
        let posy = bot.position.y + bot.direction.y*speed;
        return {x:posx,y:posy};
    }

    getRandomDirection(){        
        return p5.Vector.random2D();
    }


    execute(bot, sk){
        

        if(bot.states.wall){
            let n =  sk.createVector(bot.direction.x,bot.direction.y);
            n.rotate(sk.HALF_PI);
            bot.direction.reflect(n);
        }
        if(bot.states.colliding){
            //let n =  sk.createVector(bot.direction.x,bot.direction.y);
            //n.rotate(sk.HALF_PI);
            bot.direction.rotate(sk.HALF_PI);          //console.log(`${bot.name} change direction because of collision`)
        }
       var newPos = this.moveInDirection(bot, sk, 2);
       bot.position = newPos;
    }
    checkStates(){

    }
}