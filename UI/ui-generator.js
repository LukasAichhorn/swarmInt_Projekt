import { finalConditions } from "../classes/class_finalConditions";
import { Swarm } from "../classes/class_swarm";

// A $( document ).ready() block.
export const setupData = ["PPS","other"];
export const abilityOptions = ["move","Wall Collision","Collision Detection", "Color Changer", ];
export const UI = $("#UI-container");
export var swarm;
export var endConditions;
let interval;
let form = $("<form></form>")
  .attr("id", "UI-Form")
  .attr("class", "bg-light border rounded shadow-sm");

export const FORM = form;

//export let frameRate;

export function renderMenue(FORM, ToogleID, data) {
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

    renderAbilitySection(FORM, abilityOptions);
  } else {
    FORM.empty();
//Predefined values :: 

    addSelectElem(FORM, data, "Startbedingungen");
    let CONT = $("<div></div>")
    .attr("id", "container");
    $("#Startbedingungen").after(CONT);
    $("#Startbedingungen").val(" ");
    $("#Startbedingungen").change(()=>{
      
      CONT.empty();
      if($("#Startbedingungen").val() =="PPS"){
        addInputElem(
          CONT,
          "daveCount",
          "Dave Count:",
          "text",
          "insert amount of robots"
        );

        addInputElem(
          CONT,
          "Speed",
          "Speed",
          "text",
          "_"
        );
        addInputElem(
          CONT,
          "Spin",
          "Spin",
          "text",
          "_"
        );
        addInputElem(
          CONT,
          "Radius",
          "Radius",
          "text",
          "_"
        );
        addInputElem(
          CONT,
          "beta",
          "Beta",
          "text",
          "_"
        );
      }
      else if(($("#Startbedingungen").val() =="other")){
        addInputElem(
          CONT,
          "Other",
          "Other",
          "text",
          "insert other option"
        );
      }
    })
      
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
    '"name="' +
    fieldName +
    '">\
    </div>';

  target.append(s);
}
export function addSelectElem(target, optValues, id) {
  let c = $("<div />").attr("class", "m-3");
  let root = $("<select></select>").attr("class", "form-select").attr("id", id).attr("name","select");

  optValues.forEach((optText) => {
    let option = $("<option></option").attr("value", optText).text(optText);
    root.append(option);
  });

  target.append(c.append(root));
}

export function addToogleBtn(target, name, type, id, labelText, checked) {
  let b1 = $("<input />")
    .attr("type", "radio")
    .attr("class", "btn-check")
    .attr("name", name)
    .attr("id", id)
    .attr("autocomplete", "off");
  if (checked == true) {
    b1.attr("checked", "checked");
  }

  b1.on("click", function () {
    let ToogleID = $(this).attr("id");

    console.log("toogle button with id: " + ToogleID + " was pressed");
    renderMenue(FORM, ToogleID, setupData);
  });

  let label = $("<label />")
    .attr("class", " btn mb-2 w-100 btn-outline-" + type)
    .attr("for", id)
    .text(labelText);

  target.append(b1);
  target.append(label);
}

function initSim(simSetup) {
  console.log(simSetup);

  let botCount = simSetup.find(value => value.name =="daveCount").value;
  console.log("botcount: " + botCount);
  swarm = new Swarm(parseInt(botCount), "none");

  endConditions = new finalConditions();
  endConditions.add("swarmIsMonochrome");
  swarm = new Swarm(parseInt(botCount), simSetup);

  //BUILD LOG OF SWARM
  if(!simSetup.find(value => value.name =="select")){
    console.log("no selected alog => build log");
    buildLog(swarm);
  }

}

export function renderSubmitSection(target, text, btnType) {
  let c = $("<div />").attr("class", "   mt-1 p-1");
  let b = $("<button />")
    .attr("type", "button")
    .attr("class", "btn shadow-sm w-100 btn-" + btnType)
    .text(text);
  b.on("click", function () {
    let simSetup = $("#UI-Form").serializeArray();  
    console.log(simSetup);
    initSim(simSetup);
    let speedSlider = document.getElementById("speedRange");
    speedSlider.disabled = false;
    document.getElementById("currentSpeed").hidden;
    //speedDescription.hidden = false;
  });
  c.append(b);

  target.append(c);
}

export function renderAbilitySection(target, optionList) {
  let div = $('<div class="m-3 dropdown">');
  let b = $("<button />")
    .attr("type", "button")
    .attr("class", "btn btn-secondary dropdown-toggle")
    .attr("id", "abilitiesMenuButton")
    .attr("data-toggle", "dropdown")
    .attr("aria-haspopup", "true")
    .attr("aria-expanded", "false")
    .text("Select Abilities");
  let list = $("<ul />");
  list.attr("class", "dropdown-menu keep-open");
  let index = 1;
  optionList.forEach((option) => {
    let li = $("<li />");
    let la = $("<label />");
    let i = $("<input/>");
    i.attr("type", "checkbox");
    i.attr("name", option);
    i.attr("value", index);
    la.text(" " + option);
    la.attr("class", "dropdown-item");

    la.append(i), li.append(la), list.append(li);
    index++;
  });

  div.append(b);
  div.append(list);

  target.append(div);

  $(".dropdown-toggle").on("click", function () {
    $(this).next().toggle();
  });
  $(".dropdown-menu.keep-open").on("click", function (e) {
    e.stopPropagation();
  });

  window.onclick = function(event) {
    if (!event.target.matches(".dropdown-toggle")){
      $(".dropdown-toggle").next().toggle();
    }
  };
}
export function createSetupArray() {}

//LOG
function buildLog(swarm) {
  console.log("we build log");
  
  $("#logs-container").empty();
  $("#logs-container").append("<div class = 'col' id ='log-table-box'><div>");
  $("#log-table-box").append("<table class='table' id ='log-table'></table>");
 
  //reset log if already set:
  if(interval){
    console.log("interval is set thus we reset");
    clearInterval(interval);
    interval = null;
  }
  updateLog();
  //alle 2 sekunden updaten
  interval = setInterval(updateLog, 2000);
  

  function updateLog() {
    $("#log-table").empty();
    $("#log-table").append( "<tr><th class = 'table-cell'>Color</th> <th class = 'table-cell'>Amount of bots</th></tr>");


    let ColorMap = new Map();

    //iterate over swarm to create color map
    for (let i = 0; i < swarm.numBots; i++) {
      ColorMap.set(swarm.bots[i].colors, 0);
    }
    for (let i = 0; i < swarm.numBots; i++) {
      let prevVal = ColorMap.get(swarm.bots[i].colors);
      ColorMap.set(swarm.bots[i].colors, prevVal + 1);
    }

    //fill rows of table
    for (var [key, value] of ColorMap.entries()) {
      $("#log-table").append(
        "<tr><td style ='color:" +
          key +
          "' class = 'table-cell'>" +
          key +
          "</td> <td class = 'table-cell'> " +
          value +
          "</td></tr>"
      );
    }
  }
}

//Update Log function needs swarm
