import { addToogleBtn, renderMenue, renderSubmitSection,setupData,UI,FORM,swarm,frameRate, endConditions } from "./UI/ui-generator";
import  'p5';
import {canvas_width, canvas_height} from "./settings/constants.js";

$(document).ready(function () {

  let ToogleID = "toogle-sb";

  console.log("Hy from the Ui-generator");
  
  console.log(FORM);

  
  document.getElementById("speedRange").disabled = true;
  document.getElementById("currentSpeed").hidden = true;
  let togglesection1 = $(".toggleSection1");
  let togglesection2 = $(".toggleSection2");       

  addToogleBtn(togglesection1, "sandbox", "primary", "toogle-sb", "Sandbox Mode", false);
  addToogleBtn(togglesection2, "predefinded", "primary", "toogle-pd", "Algorithms",false);

  UI.append(FORM);
  renderMenue(FORM,ToogleID,setupData);
  
  renderSubmitSection(UI,"Start Simulation","success");
  let fr = 24; //minimum for smooth animation

  let s = (sk) => {    
    sk.setup = () =>{
        console.log("setup function");
        let cnv =sk.createCanvas(canvas_width, canvas_height);
        cnv.parent("Canvas-container");
      sk.background("#F9F9F9"); // Set line drawing color to white
      sk.line(2, 2, 2, 400);
      sk.line(2, 2, 720, 2);
      sk.line(720, 2, 720, 400);
      sk.line(2, 400, 720, 400);
      sk.frameRate(fr);
    }

    sk.draw =  async () =>{
      if(swarm!= null){
        sk.background("#F9F9F9");

        await swarm.setBotStates(sk);
        await swarm.excecuteAbilities(sk);
        swarm.draw(sk);
        let speedslider = document.getElementById("speedRange");
        fr =  parseFloat(speedslider.value);
        sk.frameRate(fr);
        
        if(endConditions.checkFinalConditions())
          sk.noLoop();            
          
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