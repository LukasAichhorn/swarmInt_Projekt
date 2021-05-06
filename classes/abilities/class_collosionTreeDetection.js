
import 'regenerator-runtime/runtime'
export class CollisionTreeDetection{
    
    constructor(){
        

    };


narrowDetection(bot, otherBot,posx1, posy1, posx2, posy2) {
    let circle1 = {radius: bot.size/2, x: posx1, y: posy1};
    let circle2 = {radius: otherBot.size/2, x: posx2, y: posy2};

    let dx = circle1.x - circle2.x;
    let dy = circle1.y - circle2.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < circle1.radius + circle2.radius) {
    return true;
    }
}


    treeSearch(bots){
        let allbots = [...bots];
        allbots.forEach(bot=>{
            bot.states.colliding = false;
            bot.states.collider = null;
        });
        
        //copy to new memory space
        let notVisited = [...allbots];
        notVisited.forEach(bot=>{
            bot.states.colliding = false;
            bot.states.collider = null;
        });
        
        notVisited.shift();


        allbots.forEach(bot => {
            //reset state
            
            if(notVisited.length>=1){
                notVisited.forEach(otherBot =>{
                    
                    if(this.narrowDetection(bot, otherBot, bot.position[0],bot.position[1],otherBot.position[0],otherBot.position[1])){
                        //console.log(`${bot.name} id:${bot.id} collided with ${otherBot.name} id:${otherBot.id}`);

                        bot.states.colliding = true;
                        bot.states.collider = otherBot;
                        otherBot.states.colliding = true;
                        otherBot.states.collider = bot;
                        
                        allbots.shift();
                        notVisited.shift();
                    }
                    else{
                        

                    }
                    
                    
                });
                
                
                notVisited.shift();
            }
                
            
            
           
        });
    }

     checkStates(bots,bot){
          this.treeSearch(bots);
            
    }
    execute(){

    }
        
}//class end

   
