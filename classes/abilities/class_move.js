
export class move {
    
    constructor(){
        this.direction = p5.Vector.random2D();
        

    }


    moveInDirection(currX,currY){
        let posx = currX + this.direction.x;
        let posy = currY + this.direction.y;
        return [posx,posy];
    }

}