

export class Dave {
    constructor(posx, posy, colorInHex, id, abilities) {

        this.position = [posx, posy];
        this.color = colorInHex;
        this.id = id;
        this.abilities=abilities;

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

    draw(){
        //call ability:
         this.position = this.abilities[0].moveInDirection(this.position[0],this.position[1]);
         console.log(this.position);
        circle(this.position[0], this.position[1], 10);
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

var namesList = [
    "Dave",
    "Lukas",
    "Yasmine",
    "Johannes",
    "JaCob",
    "Doris",
    "Paolo",
    "Angela Merkel",
    "Hugo",
    "Mortimer",
    "Timothy",
    "Sandra",
    "Maria",
    "Magdalena",
    "Ingrid",
    "Nelly",
    "JaKob",
    "Sophie",
    "Gerald",
    "Frau Huber",
    "Babsi",
    "Roland",
    "Klaus",
    "Norbert",
    "Scooter",
    "Orlando",
    "Virginia Woolf",
    "Queen Elisabeth",
    "Nora",
    "Tom",
    "Bimbolino",
    "Ronaldinho",
    "Flupsi",
    "Betti",
    "Jesus",
    "John Schnee",
    "Aragorn",
    "Gimli",
    "Prince Harry",
    "Maria Magdalena",
    "Scotty",
    "Bulli",
    "Betti",
    "Rudi",
    "Herwig",
    "Verena",
    "Wolfgang",
    "Stefan",
    "Stephanie",
    "Alex",
    "Ferdl",
    "Franzl",
    "Sissi",
    "Göthe",
    "Pam",
    "Sigi",
    "Beate",
    "Klenk",
    "Mimi"
];
