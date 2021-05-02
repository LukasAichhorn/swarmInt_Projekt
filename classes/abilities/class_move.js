
export class move {
    
    constructor(){
        this.direction = p5.Vector.random2D();
        

    }


    moveInDirection(currX,currY,sk){
        //console.log(sk.HALF_PI);
        if(currX <= 1 || currX >= 719){
            this.direction.rotate(sk.HALF_PI);
            
        }
        else if(currY <= 1 || currY >= 399){
            this.direction.rotate(sk.HALF_PI);
            
        }
        let posx = currX + this.direction.x;
        let posy = currY + this.direction.y;
        return [posx,posy];
    }
    


}