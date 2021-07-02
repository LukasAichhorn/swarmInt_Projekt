import p5 from "p5";

export class pps{
    // 3, 180, 16, 6

    constructor(speed,spin,radius,beta){
        this.speed = speed;
        this.spin = spin;
        this.radius = radius;
        this.beta = beta;
    };
    
    calcDist(x1,y1,x2,y2){
        let x = Math.abs(x1-x2);
        let y = Math.abs(y1-y2);
        return Math.sqrt(x*x + y*y); 
    }
    checkHemisphere(x1,y1,x2,y2){
        //y2 < y1 = uH;
        if(y2 < y1){

        }

    };

    checkStates(bots,bot){
        //reset neighbours
        bot.states.UHcount = 0;
        bot.states.LHcount = 0;
        //calculate if neighbours are inside radius
        bots.forEach( otherBot => {
            let distanceToOtherBot = this.calcDist(bot.position.x,bot.position.y,otherBot.position.x,otherBot.position.y);
            if(distanceToOtherBot< this.radius){
                //check for Uh or LH
                if(otherBot.position.y < bot.position.y){
                    bot.states.UHcount+=1;
                };
                if(otherBot.position.y > bot.position.y){
                    bot.states.LHcount+=1;
                };
            };
            
        });
        
    };

    execute(bot, sk){
    let UoD = 1;
    let nt = bot.states.UHcount + bot.states.LHcount;
    let alpha = this.spin * sk.PI/180;
    
        //rotate direction:
        if(bot.states.UHcount > bot.states.LHcount){
            UoD = -1;
        }
        let v = bot.direction;
        v.rotate(alpha + (this.beta*nt* UoD));

        //change x,y positions
        bot.position.x = bot.position.x + bot.direction.x*this.speed;
        bot.position.y = bot.position.y + bot.direction.y*this.speed;
        //sk.line(bot.position.x-10,bot.position.y,bot.position.x+10,bot.position.y);
        sk.noFill();
        sk.circle(bot.position.x, bot.position.y, this.radius);
        
        sk.circle(bot.position.x,bot.position.y,bot.radius);
        
    }

}