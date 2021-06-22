import  'p5';
import { namesList } from '../ressources/dave_names';

export class Dave {

    constructor(posx, posy, colorInHex, id, direction, diameter) {

        this.position = {x:posx, y:posy};
        this.colors = colorInHex;
        this.randColor = Math.floor((Math.random() * 5) + 0);
        this.id = id;
        this.speed = 1.5;
        this.size = diameter;
        this.states ={
            UHcount:0,
            LHcount:0,
            wall:false,
            colliding: false,
            collider: null
        };
        //this.abilities = abilities;

        this.direction = direction;
        let NamesListIndex = getRandomInt(0, namesList.length);
        this.name = namesList[NamesListIndex];


        //Gewährleistung der "Uniquness" des Names mithilfe einer nachfolgenden Nummer

        //letzen Buchstaben von Namen 
        let lastChar = this.name[this.name.length - 1];

        //Schauen ob letzter Buchstabe eine Zahl ist
       
        if (isNaN(parseInt(lastChar))) {

            //Wenn nicht wird eine 2 im namesList array ergänzt
            namesList[NamesListIndex] += " 2";  

        }
        else {
            //Wenn letzter Buchstabe eine Zahl ist, wird sie erhöht
            let newLastChar = parseInt(lastChar) + 1;
            namesList[NamesListIndex] = namesList[NamesListIndex].replace(lastChar, newLastChar);  
        }

        console.log("I am ", this.name, "!");

    }

    draw(sk){ 
         
         //set draw color to bots current color;
        sk.fill(this.colors); 
        if(this.states.LHcount+this.states.UHcount > 0){
            sk.fill(58,0,247);
            this.color = "#3A00F7";
        }
        if(this.states.LHcount+this.states.UHcount > 2){
            sk.fill(245,58,114);
            this.color = "#F53A72";
        } 
        if(this.states.LHcount+this.states.UHcount > 4){
            sk.fill(191,0,0);
            this.color = "#bf0000";
        }       
        sk.circle(this.position.x, this.position.y, this.size);
        
        let s = this.name;
        sk.textSize(10);
        //sk.text(s,this.position.x - this.size ,this.position.y - this.size);
        
        

        
    }
    getID(){
        return this.id;
    }
    getColor(){
        return this.color;
    }
    getPosition(){
        return this.position;
    }
    getName(){
        return this.name;
    }
}




function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


