import { Swarm } from "../classes/class_swarm";


// A $( document ).ready() block.
export const setupData = ["alog1", "algo2", "ALGO3"];
export const UI = $("#UI-container");
export var swarm;
let form = $("<form></form>")
  .attr("id", "UI-Form")
  .attr("class","bg-light border rounded");

  export const FORM  = form;   
var SimSetup = [];










export function renderMenue(FORM,ToogleID,data) {
    console.log(data);
    if (ToogleID == "toogle-sb") {
    FORM.empty();
    addInputElem(
        FORM,
      "daveCount",
      "Dave Count:",
      "text",
      "insert amount of robots"
    );
    addInputElem(
      FORM,
      "SE1",
      "Something else",
      "text",
      "insert something else"
    );

    renderAbilitySection();

    }
      
      else {
        FORM.empty();
    
    addSelectElem(FORM, data, "Startbedingungen");
  }
 
}

export function addInputElem(target, fieldName, labelText, type, placeholder) {
  let s =
    '<div class="m-3">\
    <label for="' +
    fieldName +
    '" class="form-label">' +
    labelText +
    '</label>\
    <input type="' +
    type +
    '" class="form-control" id="' +
    fieldName +
    '" placeholder="' +
    placeholder +
    '"name="'+ fieldName +'">\
    </div>';

  target.append(s);
}
export function addSelectElem(target, optValues, id) {
  let c = $("<div />").attr("class", "m-3");
  let root = $("<select></select>").attr("class", "form-select").attr("id", id);

  optValues.forEach((optText) => {
    let option = $("<option></option").attr("value", optText).text(optText);
    root.append(option);
  });

  target.append(c.append(root));
}

export function addToogleBtn(target, name, type, id, labelText, checked) {
  let b1 = $("<input />")
    .attr("type", "radio")
    .attr("class", "btn-check ")
    .attr("name", name)
    .attr("id", id)
    .attr("autocomplete", "off");
  if (checked == true) {
    b1.attr("checked", "checked");
  }

  b1.on("click", function () {
    let ToogleID = $(this).attr("id");
    
    console.log("toogle button with id: " + ToogleID + " was pressed"); 
    renderMenue(FORM,ToogleID,setupData);
  });

  let label = $("<label />")
    .attr("class", " m-1 btn btn-outline-" + type)
    .attr("for", id)
    .text(labelText);

  target.append(b1);
  target.append(label);
}

function initSim(simSetup){
  let botCount = simSetup[0]["value"];
  console.log("botcount: "+ botCount);
  swarm = new Swarm(parseInt(botCount),"none");
  
  console.log(swarm);
  }

export function renderSubmitSection(target,text,btnType){
    let c = $("<div />").attr("class"," mt-1 p-1 bg-light border rounded");
    let b =$("<button />")
    .attr("type","button")
    .attr("class","btn btn-"+btnType)
    .text(text);   
    b.on("click",function(){
        let simSetup =$("#UI-Form").serializeArray();
        console.log(simSetup);
        initSim(simSetup);
    });
    c.append(b);

    target.append(c);
}

export function renderAbilitySection(){


}
export function createSetupArray(){

}




