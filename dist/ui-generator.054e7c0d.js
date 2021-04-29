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
})({"classes/class_swarm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Swarm = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import { canvas_height, canvas_width, randPos } from "../main";
//import { Dave } from "./class_dave";
var Swarm = /*#__PURE__*/function () {
  function Swarm(numBots, endConditions) {
    _classCallCheck(this, Swarm);

    this.numBots = numBots; //array type bots

    this.bots = [];

    for (var i = 0; i < numBots; i++) {
      var newDave = new Dave(randPos(1, canvas_width), randPos(1, canvas_width), "#328fa8", i);
      this.bots.push(newDave);
    }

    this.taskCompleted = false; //irgendein array aber noch nicht sicher was da drin sein soll
    //evtl eine neue klasse?
    //muss irgendwie überprüfbar sein

    this.endConditions = endConditions;
    console.log("Swarm Construction Completed");
  }

  _createClass(Swarm, [{
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
},{}],"main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;
exports.draw = draw;

var _class_swarm = require("./classes/class_swarm");

var canvas_width = 720;
var canvas_height = 400;

function randPos(from, to) {
  var x = Math.floor(Math.random() * to + from);
  var y = Math.floor(Math.random() * to + from);
}

function initSim(simSetup) {
  var botCount = simSetup["daveCount"];
  var swarm = new _class_swarm.Swarm(botCount, "none");
  console.log("swarm");
} // The statements in the setup() function
// execute once when the program begins


function setup() {
  console.log("canvas setup"); // createCanvas must be the first statement

  var cnv = createCanvas(600, 250);
  cnv.parent("Canvas-container");
  background(153);
  line(0, 0, width, height);
  frameRate(30);
} // The statements in draw() are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.


function draw() {}
},{"./classes/class_swarm":"classes/class_swarm.js"}],"UI/ui-generator.js":[function(require,module,exports) {
"use strict";

var _main = require("../main");

// A $( document ).ready() block.
var setupData = ["alog1", "algo2", "ALGO3"];
var SimSetup = [];
$(document).ready(function () {
  var ToogleID = "toogle-sb";
  console.log("Hy from the Ui-generator");
  var UI = $("#UI-container");
  var FORM = $("<form></form>").attr("id", "UI-Form").attr("class", "bg-light border rounded");
  console.log(FORM);
  addToogleBtn(UI, "sandbox", "primary", "toogle-sb", "Sandbox Mode", false);
  addToogleBtn(UI, "predefinded", "primary", "toogle-pd", "predefined values", false);
  UI.append(FORM);
  renderMenue(FORM, ToogleID, setupData);
  renderSubmitSection(UI, "Start Simulation", "success");
});

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
    var FORM = $("#UI-Form");
    renderMenue(FORM, ToogleID, setupData);
  });
  var label = $("<label />").attr("class", " m-1 btn btn-outline-" + type).attr("for", id).text(labelText);
  target.append(b1);
  target.append(label);
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

(0, _main.setup)();
(0, _main.draw)();
},{"../main":"main.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60700" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","UI/ui-generator.js"], null)
//# sourceMappingURL=/ui-generator.054e7c0d.js.map