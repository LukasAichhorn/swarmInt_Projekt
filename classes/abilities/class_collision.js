export class CollisionDetector{

    constructor(){
    }

    // 1.) Rough subdivision to find potential collisions (To-Do)

    broadDetection(posx1, posy1) {
        potentialCollidingDaves = []

        //method to create a list of Daves in the environment

        potentialCollidingDaves.forEach(secondDave => {
            narrowDetection(posx1, posy1, secondDave.posx2, secondDave.posy2)
        });

    }

    // 2.) Elaborate and precise thrust differentiation

    narrowDetection(posx1, posy1, posx2, posy2) {
        let circle1 = {radius: 10, x: posx1, y: posy1};
        let circle2 = {radius: 10, x: posx2, y: posy2};

        let dx = circle1.x - circle2.x;
        let dy = circle1.y - circle2.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < circle1.radius + circle2.radius) {
        // collision detected!
        }
    }
    
}