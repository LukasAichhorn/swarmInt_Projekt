import { Swarm } from "./classes/class_swarm";
import { addToogleBtn, renderMenue, renderSubmitSection,setupData,UI,FORM,swarm } from "./UI/ui-generator";
import  'p5';
import 'regenerator-runtime/runtime'







$(document).ready(function () {
const canvas_width = 720;
const canvas_height = 400;





    let ToogleID = "toogle-sb";

  console.log("Hy from the Ui-generator");
  
 console.log(FORM);

  addToogleBtn(UI, "sandbox", "primary", "toogle-sb", "Sandbox Mode", false);
  addToogleBtn(UI, "predefinded", "primary", "toogle-pd", "predefined values",false);

  UI.append(FORM);
  renderMenue(FORM,ToogleID,setupData);
  
  renderSubmitSection(UI,"Start Simulation","success");


let s = (sk) => {    
    sk.setup = () =>{
        console.log("setup function");
        let cnv =sk.createCanvas(canvas_width, canvas_height);
        cnv.parent("Canvas-container");
      sk.background("#F9F9F9"); // Set line drawing color to white
      sk.frameRate(30);
    }

    sk.draw =  async () =>{
        if(swarm!= null){
          sk.background("#F9F9F9");

        
          await swarm.setBotStates(sk);
          await swarm.excecuteAbilities(sk);
         swarm.draw(sk);
          
          
            
            //sk.line(2, 2, 2, 400);
            //sk.line(2, 2, 720, 2);
         }  
    }
    
      sk.keyPressed = ( )=>{
      if(sk.keyCode === sk.LEFT_ARROW ){
          console.log("pause");
          sk.noLoop();
          console.log(swarm.bots);
        }
        if(sk.keyCode === sk.RIGHT_ARROW ){
          console.log("play");
          sk.loop();
      }

    }

}
const P5 = new p5(s);



});//onload end 
