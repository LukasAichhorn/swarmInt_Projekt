import { Swarm } from "./classes/class_swarm";
import { addToogleBtn, renderMenue, renderSubmitSection,setupData,UI,FORM,swarm } from "./UI/ui-generator";
import  'p5';







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


//   window.setup = ()=>{
//     console.log("setup function");
//     let cnv =createCanvas(canvas_width, canvas_height);
//     cnv.parent("Canvas-container");
//   background(134); // Set line drawing color to white
//   frameRate(30);

//   };

//  window.draw = ()=>{
//      if(swarm!= null){
//         background(134);
//         swarm.draw();
//      }  
// }

let s = (sk) => {    
    sk.setup = () =>{
        console.log("setup function");
        let cnv =sk.createCanvas(canvas_width, canvas_height);
        cnv.parent("Canvas-container");
      sk.background(134); // Set line drawing color to white
      sk.frameRate(30);
    }

    sk.draw = () =>{
        if(swarm!= null){
            sk.background(134);
            swarm.draw(sk);
            sk.line(2, 2, 2, 400);
            sk.line(2, 2, 720, 2);
         }  
    }
}
const P5 = new p5(s);



});//onload end 
