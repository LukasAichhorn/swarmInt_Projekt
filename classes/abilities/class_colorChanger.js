export class ColorChanger{
    constructor()
    {
        this.name = "colorChanger";
    };

    changeColorToWhite(bot){   
        bot.colors = "#FFFFFF";
        
    }

    checkStates(bot){
        
    }

    execute(bot){
        
        if(bot.states.wall){

            console.log(`trigger colorchange for ${bot.name}`);
            this.changeColorToWhite(bot);
        }

    }
}