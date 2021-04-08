

// A $( document ).ready() block.
$( document ).ready(function() {

    console.log("Hy from the Ui-generator");
    const UI = $("#UI-container");
    const FORM = $("<form></form>").attr("id","UI-Form");
    const UI_FORM = $("#UI-FORM");



    UI.append(FORM);
    addInputElem(FORM,"daveCount","Dave Count:","text","insert amount of robots");
    
});





function addInputElem(target,fieldName,labelText,type,placeholder){
    let s = 
    '<div class="m-3">\
    <label for="'+ fieldName +'" class="form-label">'+ labelText +'</label>\
    <input type="'+ type +'" class="form-control" id="'+ fieldName +'" placeholder="'+ placeholder +'">\
    </div>'

    target.append(s);
}


