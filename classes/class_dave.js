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
        sk.circle(this.position.x, this.position.y, this.size);
        
        let s = this.name;
        sk.textSize(10);
        sk.text(s,this.position.x - this.size ,this.position.y - this.size);
        
        

        
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


