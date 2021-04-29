// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"classes/abilities/class_move.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.move = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var move = /*#__PURE__*/function () {
  function move() {
    _classCallCheck(this, move);

    this.direction = p5.Vector.random2D();
  }

  _createClass(move, [{
    key: "moveInDirection",
    value: function moveInDirection(currX, currY) {
      var posx = currX + this.direction.x;
      var posy = currY + this.direction.y;
      return [posx, posy];
    }
  }]);

  return move;
}();

exports.move = move;
},{}],"classes/class_dave.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dave = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dave = /*#__PURE__*/function () {
  function Dave(posx, posy, colorInHex, id, abilities) {
    _classCallCheck(this, Dave);

    this.position = [posx, posy];
    this.color = colorInHex;
    this.id = id;
    this.abilities = abilities;
    var NamesListIndex = getRandomInt(0, namesList.length);
    this.name = namesList[NamesListIndex]; //Gewährleistung der "Uniquness" des Names mithilfe einer nachfolgenden Nummer
    //letzen Buchstaben von Namen 

    var lastChar = this.name[this.name.length - 1]; //Schauen ob letzter Buchstabe eine Zahl ist

    if (isNaN(parseInt(lastChar))) {
      //Wenn nicht wird eine 2 im namesList array ergänzt
      namesList[NamesListIndex] += " 2";
    } else {
      //Wenn letzter Buchstabe eine Zahl ist, wird sie erhöht
      var newLastChar = parseInt(lastChar) + 1;
      namesList[NamesListIndex] = namesList[NamesListIndex].replace(lastChar, newLastChar);
    }

    console.log("I am ", this.name, "!");
  }

  _createClass(Dave, [{
    key: "draw",
    value: function draw() {
      //call ability:
      this.position = this.abilities[0].moveInDirection(this.position[0], this.position[1]);
      console.log(this.position);
      circle(this.position[0], this.position[1], 10);
    }
  }, {
    key: "getID",
    value: function getID() {
      return this.id;
    }
  }, {
    key: "getColor",
    value: function getColor() {
      return this.color;
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return this.position;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }]);

  return Dave;
}();

exports.Dave = Dave;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var namesList = ["Dave", "Lukas", "Yasmine", "Johannes", "JaCob", "Doris", "Paolo", "Angela Merkel", "Hugo", "Mortimer", "Timothy", "Sandra", "Maria", "Magdalena", "Ingrid", "Nelly", "JaKob", "Sophie", "Gerald", "Frau Huber", "Babsi", "Roland", "Klaus", "Norbert", "Scooter", "Orlando", "Virginia Woolf", "Queen Elisabeth", "Nora", "Tom", "Bimbolino", "Ronaldinho", "Flupsi", "Betti", "Jesus", "John Schnee", "Aragorn", "Gimli", "Prince Harry", "Maria Magdalena", "Scotty", "Bulli", "Betti", "Rudi", "Herwig", "Verena", "Wolfgang", "Stefan", "Stephanie", "Alex", "Ferdl", "Franzl", "Sissi", "Göthe", "Pam", "Sigi", "Beate", "Klenk", "Mimi"];
},{}],"classes/class_swarm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Swarm = void 0;

var _class_move = require("./abilities/class_move");

var _class_dave = require("./class_dave");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Swarm = /*#__PURE__*/function () {
  function Swarm(numBots, endConditions) {
    _classCallCheck(this, Swarm);

    this.numBots = numBots; //array type bots

    this.bots = [];

    for (var i = 0; i < numBots; i++) {
      var newDave = new _class_dave.Dave(this.randPos(1, 400), this.randPos(1, 720), "#328fa8", i, [new _class_move.move()]);
      this.bots.push(newDave);
    }

    this.taskCompleted = false; //irgendein array aber noch nicht sicher was da drin sein soll
    //evtl eine neue klasse?
    //muss irgendwie überprüfbar sein

    this.endConditions = endConditions;
    console.log("Swarm Construction Completed");
  }

  _createClass(Swarm, [{
    key: "randPos",
    value: function randPos(from, to) {
      var val = Math.floor(Math.random() * to + from);
      return val;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.bots.forEach(function (bot) {
        bot.draw();
      });
    }
  }, {
    key: "addBot",
    value: function addBot(bot) {
      this.bots.push(bot);
      this.numBots += 1;
    } //early idea on how a swarm can know if all tasks are completed
    //obv not finished!

  }, {
    key: "checkTaskCompletion",
    value: function checkTaskCompletion() {
      this.endConditions.forEach(function (element) {
        if (element == "completed Task") {} else {
          return false;
        }
      });
      return true;
    }
  }, {
    key: "updateStatus",
    value: function updateStatus() {
      if (this.checkTaskCompletion) {
        this.taskCompleted = true;
      } else {
        this.taskCompleted = false;
      }
    }
  }]);

  return Swarm;
}();

exports.Swarm = Swarm;
},{"./abilities/class_move":"classes/abilities/class_move.js","./class_dave":"classes/class_dave.js"}],"UI/ui-generator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderMenue = renderMenue;
exports.addInputElem = addInputElem;
exports.addSelectElem = addSelectElem;
exports.addToogleBtn = addToogleBtn;
exports.renderSubmitSection = renderSubmitSection;
exports.renderAbilitySection = renderAbilitySection;
exports.createSetupArray = createSetupArray;
exports.FORM = exports.swarm = exports.UI = exports.setupData = void 0;

var _class_swarm = require("../classes/class_swarm");

// A $( document ).ready() block.
var setupData = ["alog1", "algo2", "ALGO3"];
exports.setupData = setupData;
var UI = $("#UI-container");
exports.UI = UI;
var swarm;
exports.swarm = swarm;
var form = $("<form></form>").attr("id", "UI-Form").attr("class", "bg-light border rounded");
var FORM = form;
exports.FORM = FORM;
var SimSetup = [];

function renderMenue(FORM, ToogleID, data) {
  console.log(data);

  if (ToogleID == "toogle-sb") {
    FORM.empty();
    addInputElem(FORM, "daveCount", "Dave Count:", "text", "insert amount of robots");
    addInputElem(FORM, "SE1", "Something else", "text", "insert something else");
    renderAbilitySection();
  } else {
    FORM.empty();
    addSelectElem(FORM, data, "Startbedingungen");
  }
}

function addInputElem(target, fieldName, labelText, type, placeholder) {
  var s = '<div class="m-3">\
    <label for="' + fieldName + '" class="form-label">' + labelText + '</label>\
    <input type="' + type + '" class="form-control" id="' + fieldName + '" placeholder="' + placeholder + '"name="' + fieldName + '">\
    </div>';
  target.append(s);
}

function addSelectElem(target, optValues, id) {
  var c = $("<div />").attr("class", "m-3");
  var root = $("<select></select>").attr("class", "form-select").attr("id", id);
  optValues.forEach(function (optText) {
    var option = $("<option></option").attr("value", optText).text(optText);
    root.append(option);
  });
  target.append(c.append(root));
}

function addToogleBtn(target, name, type, id, labelText, checked) {
  var b1 = $("<input />").attr("type", "radio").attr("class", "btn-check ").attr("name", name).attr("id", id).attr("autocomplete", "off");

  if (checked == true) {
    b1.attr("checked", "checked");
  }

  b1.on("click", function () {
    var ToogleID = $(this).attr("id");
    console.log("toogle button with id: " + ToogleID + " was pressed");
    renderMenue(FORM, ToogleID, setupData);
  });
  var label = $("<label />").attr("class", " m-1 btn btn-outline-" + type).attr("for", id).text(labelText);
  target.append(b1);
  target.append(label);
}

function initSim(simSetup) {
  var botCount = simSetup[0]["value"];
  console.log("botcount: " + botCount);
  exports.swarm = swarm = new _class_swarm.Swarm(parseInt(botCount), "none");
  console.log(swarm);
}

function renderSubmitSection(target, text, btnType) {
  var c = $("<div />").attr("class", " mt-1 p-1 bg-light border rounded");
  var b = $("<button />").attr("type", "button").attr("class", "btn btn-" + btnType).text(text);
  b.on("click", function () {
    var simSetup = $("#UI-Form").serializeArray();
    console.log(simSetup);
    initSim(simSetup);
  });
  c.append(b);
  target.append(c);
}

function renderAbilitySection() {}

function createSetupArray() {}
},{"../classes/class_swarm":"classes/class_swarm.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _class_swarm = require("./classes/class_swarm");

var _uiGenerator = require("./UI/ui-generator");

$(document).ready(function () {
  var canvas_width = 720;
  var canvas_height = 400;
  var ToogleID = "toogle-sb";
  console.log("Hy from the Ui-generator");
  console.log(_uiGenerator.FORM);
  (0, _uiGenerator.addToogleBtn)(_uiGenerator.UI, "sandbox", "primary", "toogle-sb", "Sandbox Mode", false);
  (0, _uiGenerator.addToogleBtn)(_uiGenerator.UI, "predefinded", "primary", "toogle-pd", "predefined values", false);

  _uiGenerator.UI.append(_uiGenerator.FORM);

  (0, _uiGenerator.renderMenue)(_uiGenerator.FORM, ToogleID, _uiGenerator.setupData);
  (0, _uiGenerator.renderSubmitSection)(_uiGenerator.UI, "Start Simulation", "success");

  window.setup = function () {
    console.log("setup function");
    var cnv = createCanvas(canvas_width, canvas_height);
    cnv.parent("Canvas-container");
    background(134); // Set line drawing color to white

    frameRate(30);
  };

  window.draw = function () {
    if (_uiGenerator.swarm != null) {
      background(134);

      _uiGenerator.swarm.draw();
    }
  };
}); //onload end
},{"./classes/class_swarm":"classes/class_swarm.js","./UI/ui-generator":"UI/ui-generator.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55309" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map