export class color_generator {
    
    constructor(){               
        
        //WILD COLOR 
        var letters = '0123456789ABCDEF';
        var color = '#';

        for (var i = 0; i < 6; i++) 
        {
          color += letters[Math.floor(Math.random() * 16)];
        }
        this.wild_color = color;

        //RANDOM COLOR
        this.color_array = ["#d19c1f", "#8f1c0d", "#c6e82e", "#29612f", "#146096"]
        //orange, rot, limette, dunkelgrün, blau
        this.random_color = this.color_array[Math.floor(Math.random() * 5)];
    }


    getWildColor(){        
        return this.wild_color;
    }

    getRandomColor(){        
        return this.random_color;
    }

    //EINZELNE FARBEN
    getOrange(){        
        return this.color_array[0];
    }

    getRed(){        
        return this.color_array[1];
    }

    getYellow(){        
        return this.color_array[2];
    }

    getGreen(){        
        return this.color_array[3];
    }

    getBlue(){        
        return this.color_array[4];
    }
}