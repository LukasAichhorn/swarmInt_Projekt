export class ColorChanger{
    constructor()
    {
        this.name = "colorChanger";
    };

    changeColorToWhite(bot){   
        bot.colors = "#FFFFFF";
        
    }

    checkStates(bots,bot){
        
    }

    execute(bot){
        
        if(bot.states.wall){

            //console.log(`trigger colorchange for ${bot.name}`);
            //this.changeColorToWhite(bot);
        }
        if(bot.states.colliding){
            bot.colors = bot.states.collider.colors;
        }

    }
}