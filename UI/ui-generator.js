// A $( document ).ready() block.
const setupData = ["alog1", "algo2", "ALGO3"];
var SimSetup = [];


$(document).ready(function () {
    
    var ToogleID = "toogle-sb";

  console.log("Hy from the Ui-generator");
  const UI = $("#UI-container");
  const FORM = $("<form></form>")
  .attr("id", "UI-Form")
  .attr("class","bg-light border rounded");
  console.log(FORM);

  addToogleBtn(UI, "sandbox", "primary", "toogle-sb", "Sandbox Mode", false);
  addToogleBtn(UI, "predefinded", "primary", "toogle-pd", "predefined values",false);

  UI.append(FORM);
  renderMenue(FORM,ToogleID,setupData);
  
  renderSubmitSection(UI,"Start Simulation","success");
  
});









function renderMenue(FORM,ToogleID,data) {
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

function addInputElem(target, fieldName, labelText, type, placeholder) {
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
function addSelectElem(target, optValues, id) {
  let c = $("<div />").attr("class", "m-3");
  let root = $("<select></select>").attr("class", "form-select").attr("id", id);

  optValues.forEach((optText) => {
    let option = $("<option></option").attr("value", optText).text(optText);
    root.append(option);
  });

  target.append(c.append(root));
}

function addToogleBtn(target, name, type, id, labelText, checked) {
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
    ToogleID = id;
    
    console.log("toogle button with id: " + ToogleID + " was pressed");
    let FORM = $("#UI-Form"); 
    renderMenue(FORM,ToogleID,setupData);
  });

  let label = $("<label />")
    .attr("class", " m-1 btn btn-outline-" + type)
    .attr("for", id)
    .text(labelText);

  target.append(b1);
  target.append(label);
}
function renderSubmitSection(target,text,btnType){
    let c = $("<div />").attr("class"," mt-1 p-1 bg-light border rounded");
    let b =$("<button />")
    .attr("type","button")
    .attr("class","btn btn-"+btnType)
    .text(text);   
    b.on("click",function(){
        SimSetup =$("#UI-Form").serializeArray();
        console.group(SimSetup);
    });
    c.append(b);

    target.append(c);
}

function renderAbilitySection(){


}
function createSetupArray(){

}


