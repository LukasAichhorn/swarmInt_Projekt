import { finalConditions } from "../classes/class_finalConditions";
import { Swarm } from "../classes/class_swarm";

// A $( document ).ready() block.
export const setupData = ["alog1", "algo2", "ALGO3"];
export const abilityOptions = ["move","PPS","Wall Collision","Collision Detection", "Color Changer", ];
export const UI = $("#UI-container");
export var swarm;
export var endConditions;
let form = $("<form></form>")
  .attr("id", "UI-Form")
  .attr("class", "bg-light border rounded");

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
    '"name="' +
    fieldName +
    '">\
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
    renderMenue(FORM, ToogleID, setupData);
  });

  let label = $("<label />")
    .attr("class", " m-1 btn btn-outline-" + type)
    .attr("for", id)
    .text(labelText);

  target.append(b1);
  target.append(label);
}

function initSim(simSetup) {
  console.log(simSetup);
  let botCount = simSetup[0]["value"];
  console.log("botcount: " + botCount);
  swarm = new Swarm(parseInt(botCount), "none");

  //enabling speed slider
  /*function before changing to framerate
  
  let speedSlider = document.getElementById("speedRange");
  speedSlider.addEventListener("input", function () {
    let newSpeed = parseFloat(speedSlider.value);

    //frameRate = newSpeed;
    //console.log(frameRate);
    let speedDescription = document.getElementById("currentSpeed");
    speedDescription.innerHTML = newSpeed + " xSpeed";
  });*/
  //let abilities = [];
  endConditions = new finalConditions();
  endConditions.add("swarmIsMonochrome");
  swarm = new Swarm(parseInt(botCount), simSetup);

  //BUILD LOG OF SWARM
  if(!swarm.search("PPS",swarm.abilities)){
    console.log("testing......");
    buildLog(swarm);
  }
  

  //console.log(swarm);
}

export function renderSubmitSection(target, text, btnType) {
  let c = $("<div />").attr("class", " mt-1 p-1 bg-light border rounded");
  let b = $("<button />")
    .attr("type", "button")
    .attr("class", "btn btn-" + btnType)
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
}
export function createSetupArray() {}

//LOG
function buildLog(swarm) {
  $("#logs-container").append("<div class = 'col' id ='log-table-box'><div>");
  $("#log-table-box").append("<table class='table' id ='log-table'></table>");
 
  //alle 2 sekunden updaten
  updateLog();
  let logUpdater = setInterval(updateLog, 2000);
   

  function updateLog() {
    $(".table-cell").remove();
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
