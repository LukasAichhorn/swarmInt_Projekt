class unit {


	constructor() {
		this.posX = randomInt(unitSize, CanvasWidth - unitSize);
		this.posY = randomInt(unitSize, CanvasHeight - unitSize);
		this.size = randomInt(5, unitSize);
		this.sensor = this.size + random(5, 10);
		this.pulsModifier = random(0.1, 0.5);


		//Colormanager
		this.colorPalAMain = 'rgba(244,224,77,0.9)';
		this.colorPalBMain = 'rgba(241,147,92,0.9)';

		this.colorPalASensor = 'rgba(244,224,77,0.25)';
		this.colorPalBSensor = 'rgba(241,147,92,0.4)';

		this.colorMain = this.colorPalAMain;
		this.colorSensor = this.colorPalASensor;

		this.colorFlag = 0;
		this.detectingFlag = 0;


		this.xSpeed = round(randomInt(-2, 2));
		this.ySpeed = round(randomInt(-2, 2));


	}


	changeColor() {

		if (this.colorFlag == 0) {

			this.colorMain = this.colorPalBMain;
			this.colorSensor = this.colorPalBSensor;

			this.colorFlag = 1;
			return;
		}

		if (this.colorFlag == 1) {


			this.colorMain = this.colorPalAMain;
			this.colorSensor = this.colorPalASensor;

			this.colorFlag = 0;
			return;
		}
	}

	detectInSensor(pointx, pointy) {

		if ((pow(pointx - this.posX, 2) + pow(pointy - this.posY, 2)) < pow(this.sensor, 2)) {

			/*this.colorMain = "rgba(123, 17, 58, 1)";
			this.colorSensor = "rgba(123, 17, 58, 0.2)";
			*/
			
			this.detectingFlag = 1;			
		}
	}



	createUnit() {
		noStroke();
		fill(this.colorMain);
		circle(this.posX, this.posY, this.size);


		//pulsing

		let maxRad = unitSize + 20;
		let minRad = this.size + 5;



		if (this.sensor > maxRad || this.sensor < minRad) {
			this.pulsModifier = this.pulsModifier * (-1);
		}

		this.sensor = this.sensor + this.pulsModifier;

		fill(this.colorSensor);
		circle(this.posX, this.posY, this.sensor);

	}





	moveUnit() {
		if (this.posX < 0 || this.posX > CanvasWidth)
			this.xSpeed *= -1;

		if (this.posY < 0 || this.posY > CanvasHeight)
			this.ySpeed *= -1;


		this.posX += this.xSpeed;
		this.posY += this.ySpeed;

	}

	dodgeUnit() {
		this.changeColor();
		this.xSpeed *= -1;
		this.ySpeed *= -1;
	}

}


class swarm {

	constructor() {
		this.units = [];
		this.unitsPosX = [];
		this.unitsPosY = [];
	}

	fillSwarm(num) {
		for (let i = 0; i < num; i++) {
			this.units.push(new unit());
			this.unitsPosX.push(this.units[i].posX);
			this.unitsPosY.push(this.units[i].posY);
		}
	}

	killSwarm() {
		let length = this.units.length;
		for (let i = 0; i < length; i++) {
			this.units.pop();
			this.unitsPosX.pop();
			this.unitsPosY.pop();
		}
	}


	speedUpSwarm() {

		for (let i = 0; i < this.units.length; i++) {




			if (this.units[i].xSpeed > 0) {
				this.units[i].xSpeed += 1;
			}

			if (this.units[i].xSpeed < 0) {
				this.units[i].xSpeed -= 1;
			}


			if (this.units[i].ySpeed > 0) {
				this.units[i].ySpeed += 1;
			}

			if (this.units[i].ySpeed < 0) {
				this.units[i].ySpeed -= 1;
			}


			if (this.units[i].xSpeed == 0 && this.units[i].ySpeed == 0) {

				this.units[i].xSpeed = round(random(-2, 2));
				this.units[i].ySpeed = round(random(-2, 2));
			}


		}
	}

	speedDownSwarm() {

		for (let i = 0; i < this.units.length; i++) {
			if (this.units[i].xSpeed > 0) {
				this.units[i].xSpeed -= 1;
			}

			if (this.units[i].xSpeed < 0) {
				this.units[i].xSpeed += 1;
			}


			if (this.units[i].ySpeed > 0) {
				this.units[i].ySpeed -= 1;
			}

			if (this.units[i].ySpeed < 0) {
				this.units[i].ySpeed += 1;
			}
		}
	}

	updatePositions() {

		if (this.units.length != 0) {
			for (let i = 0; i < this.units.length; i++) {

				this.unitsPosX[i] = this.units[i].posX;
				this.unitsPosY[i] = this.units[i].posY;
			}
		}

	}

	collisionCheck() {

		if (this.units.length != 0) {

			for (let i = 0; i < this.units.length; i++) {

				for (let j = i + 1; j < this.units.length; j++) {

					if (this.unitsPosX[i] == (this.unitsPosX[j])) {
						if ((this.unitsPosY[i]) == (this.unitsPosY[j])) {
							this.units[i].dodgeUnit();
							this.units[j].dodgeUnit();
							console.log("COLLISION");

						}
					}
				}
			}
		}

	}

	detectNeighbours() {

		if (this.units.length != 0) {

			for (let i = 0; i < this.units.length; i++) {

				this.units[i].detectingFlag = 0;
				for (let j = 0; j < this.units.length; j++) {

					if (i != j) {
						this.units[i].detectInSensor(this.unitsPosX[j], this.unitsPosY[j]);
						
					}

					
				}



				if (this.units[i].detectingFlag == 1) {
					this.units[i].colorMain = "rgba(171, 67, 54, 1)";
					this.units[i].colorSensor = "rgba(171, 67, 54, 0.2)";

				}

				else {
					if (this.units[i].colorFlag == 1) {
						this.units[i].colorMain = this.units[i].colorPalBMain;
						this.units[i].colorSensor = this.units[i].colorPalBSensor;

					}


					if (this.units[i].colorFlag == 0) {

						this.units[i].colorMain = this.units[i].colorPalAMain;
						this.units[i].colorSensor = this.units[i].colorPalASensor;
					}

				}

			}

		}

	}

}
//INPUT

//number of units

//types

// - fight

// - flight

//generate sizes between 

let CanvasWidth = 1200;
let CanvasHeight = 600;
let run = false;

let numUnits;
let unitSize = 15;

let bounceMode = 0;
let detectionMode = 0;

let myswarm = new swarm();

function setup() {

	frameRate(50);


	let myCanvas = createCanvas(CanvasWidth, CanvasHeight);
	myCanvas.parent('gamebox');


	// INPUT MENU
	let numUnitsInp = createInput('', "number");
	numUnitsInp.position(17, 35);
	numUnitsInp.size(150);
	numUnitsInp.id("numUnitsInp");
	numUnitsInp.class("menu");


	SwarmButton = createButton('Generate Swarm');
	SwarmButton.position(17, 70);
	SwarmButton.size(150);
	SwarmButton.mousePressed(generateSwarm);
	SwarmButton.class("menu");

	SwarmKiLLButton = createButton('Kill Swarm');
	SwarmKiLLButton.position(17, 105);
	SwarmKiLLButton.size(150);
	SwarmKiLLButton.mousePressed(kill);
	SwarmKiLLButton.class("menu");

	speeUpButton = createButton('Speed Up');
	speeUpButton.position(17, 140);
	speeUpButton.size(150);
	speeUpButton.mousePressed(speedUp);
	speeUpButton.class("menu");

	speeDownButton = createButton('Speed down');
	speeDownButton.position(17, 175);
	speeDownButton.size(150);
	speeDownButton.mousePressed(speedDown);
	speeDownButton.class("menu");

	toggleBounceButton = createButton('Toggle Bounce');
	toggleBounceButton.position(17, 210);
	toggleBounceButton.size(150);
	toggleBounceButton.mousePressed(toggleBounce);
	toggleBounceButton.class("menu");

	toggledetectButton = createButton('Toggle Detect');
	toggledetectButton.position(17, 245);
	toggledetectButton.size(150);
	toggledetectButton.mousePressed(toggleColl);
	toggledetectButton.class("menu");

	HideMenuButton = createButton('Hide Menu');
	HideMenuButton.position(17, 290);
	HideMenuButton.size(150);
	HideMenuButton.mousePressed(hideMenu);
	HideMenuButton.id("HideMenuButton");


}

function draw() {

	background("rgba(0, 117, 128, 1)");

	if (run == true) {

		numUnits = document.getElementById("numUnitsInp").value;
		numUnits = parseInt(numUnits);

		myswarm.fillSwarm(numUnits);

		run = false;

	}


	
	for (let i = 0; i < myswarm.units.length; i++) {
		
		myswarm.units[i].moveUnit();
		myswarm.units[i].createUnit();

	}

	myswarm.updatePositions();
	

	if(bounceMode == 1){
		myswarm.collisionCheck();
	}
	

	if(detectionMode == 1){
		myswarm.detectNeighbours();
	}
	
}


function toggleBounce(){

	if(bounceMode == 0){
		bounceMode = 1;
	}
	else{
		bounceMode = 0;
	}

	//console.log(bounceMode);
}

function toggleColl(){

	if(detectionMode == 0){
		detectionMode = 1;
	}
	else{
		detectionMode = 0;
	}

	//console.log(detectionMode);
}

function generateSwarm() {
	run = true;

}

function kill() {
	myswarm.killSwarm();
	run = false;

}

function speedDown() {

	myswarm.speedDownSwarm();
}



function speedUp() {

	myswarm.speedUpSwarm();

}

function hideMenu() {

	var elements = document.getElementsByClassName("menu");

	for (let i = 0; i < elements.length; i++) {
		elements[i].style.visibility = "hidden";

	}


	//$( ".menu" ).fadeOut();

	let button = select("#HideMenuButton");
	button.position(17, 35);
	button.mousePressed(showMenu);
	button.html("Show Menu");


}


function showMenu() {

	var elements = document.getElementsByClassName("menu");

	for (let i = 0; i < elements.length; i++) {
		elements[i].style.visibility = "visible";
	}

	//$( ".menu" ).fadeIn();


	let button = select("#HideMenuButton");
	button.position(17, 290);
	button.mousePressed(hideMenu);
	button.html("Hide Menu");

}


function randomInt(min, max) {
	return round(Math.random() * (max - min) + min);
}

