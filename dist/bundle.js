/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = function () {
    function Color() {
        _classCallCheck(this, Color);

        if (arguments.length == 3 && typeof arguments[1] == "number") {
            //czy konstruktor to rgb
            this.rgb = this.parseRgb(arguments);
        }
        if (arguments.length == 1 && typeof arguments[0] == "number") {
            //czy konstruktor to number
            this.rgb = this.parseNumber(arguments);
        }
        if (arguments.length == 3 && typeof arguments[1] == "string") {
            //czy konstruktor to hsl
            this.rgb = this.parseHsl(arguments);
        }
        if (arguments.length == 1 && typeof arguments[0] == "string") {
            //czy konstruktor to hex
            this.rgb = this.parseHex(arguments);
        }
    }

    _createClass(Color, [{
        key: "parseNumber",
        value: function parseNumber(args) {
            return {
                red: Math.floor(args[0] / (256 * 256)),
                green: Math.floor(args[0] / 256) % 256,
                blue: args[0] % 256
            };
        }
    }, {
        key: "parseRgb",
        value: function parseRgb(args) {
            return {
                red: args[0],
                green: args[1],
                blue: args[2]
            };
        }
    }, {
        key: "parseHex",
        value: function parseHex(args) {
            return {
                red: parseInt(args[0].substr(1, 2), 16),
                green: parseInt(args[0].substr(3, 2), 16),
                blue: parseInt(args[0].substr(5, 2), 16)
            };
        }
    }, {
        key: "parseHsl",
        value: function parseHsl(args) {
            var r, g, b;
            var h = parseInt(args[0]);
            var s = parseInt(args[1]) / 100;
            var l = parseInt(args[2]) / 100;
            var c = (1 - Math.abs(2 * l - 1)) * s;
            var x = c * (1 - Math.abs(h / 60 % 2 - 1));
            var m = l - c / 2;

            if (0 <= h && h <= 60) {
                r = c;
                g = x;
                b = 0;
            }
            if (60 <= h && h <= 120) {
                r = x;
                g = c;
                b = 0;
            }
            if (120 <= h && h <= 180) {
                r = 0;
                g = c;
                b = x;
            }
            if (180 <= h && h <= 240) {
                r = 0;
                g = x;
                b = c;
            }
            if (240 <= h && h <= 300) {
                r = x;
                g = 0;
                b = c;
            }
            if (300 <= h && h <= 360) {
                r = c;
                g = 0;
                b = x;
            }
            return {
                red: Math.round((r + m) * 255),
                green: Math.round((g + m) * 255),
                blue: Math.round((b + m) * 255)
            };
        }
    }, {
        key: "toNumber",
        value: function toNumber() {

            var number = this.rgb.red * (256 * 256) + this.rgb.green * 256 + this.rgb.blue;
            return number;
        }
    }, {
        key: "toRgb",
        value: function toRgb() {
            var rgb = "";
            for (var key in this.rgb) {
                rgb += this.rgb[key] + ",";
            }
            rgb = rgb.substr(0, rgb.length - 1); //usówamy ostatni przecinek
            return "rgb(" + rgb + ")";
        }
    }, {
        key: "toHex",
        value: function toHex() {
            var hex = "#";
            for (var key in this.rgb) {
                if (this.rgb[key].toString(16).length == 1) {
                    hex += "0" + this.rgb[key].toString(16);
                } else {
                    hex += this.rgb[key].toString(16);
                }
            }
            return hex;
        }
    }, {
        key: "toHsl",
        value: function toHsl() {
            var r = this.rgb.red / 255;
            var g = this.rgb.green / 255;
            var b = this.rgb.blue / 255;
            var cmax = Math.max(r, g, b);
            var cmin = Math.min(r, g, b);
            var delta = cmax - cmin;
            var l = (cmax + cmin) / 2;
            var s, h, hsl;

            if (cmax === r) {
                h = 60 * ((g - b) / delta % 6);
            }
            if (cmax === g) {
                h = 60 * ((b - r) / delta + 2);
            }
            if (cmax === b) {
                h = 60 * ((r - g) / delta + 4);
            }
            if (delta == 0) {
                s = 0;
            } else {
                s = delta / (1 - Math.abs(2 * l - 1));
            }
            l = Math.round(100 * l) + "%";
            s = Math.round(100 * s) + "%";
            h = Math.round(h < 0 ? h + 360 : h) + "°";
            hsl = h + "," + s + "," + l;
            return "hsl(" + hsl + ")";
        }
    }]);

    return Color;
}();

//(module || {}).exports = Color; // tak przekazuję samą klasę


exports.default = Color;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColorChanger = function ColorChanger(colorChangerPosition) {
    _classCallCheck(this, ColorChanger);

    if (colorChangerPosition <= 255) {
        this.red = 255;
        this.green = 0;
        this.blue = colorChangerPosition;
    }
    if (255 < colorChangerPosition && colorChangerPosition <= 500) {
        this.red = 500 - colorChangerPosition;
        this.green = 0;
        this.blue = 255;
    }
    if (500 < colorChangerPosition && colorChangerPosition <= 750) {
        this.red = 0;
        this.green = colorChangerPosition - 500;
        this.blue = 255;
    }
    if (750 < colorChangerPosition && colorChangerPosition <= 1000) {
        this.red = 0;
        this.green = 255;
        this.blue = 1000 - colorChangerPosition;
    }
    if (1000 < colorChangerPosition && colorChangerPosition <= 1250) {
        this.red = colorChangerPosition - 1000;
        this.green = 255;
        this.blue = 0;
    }
    if (1250 < colorChangerPosition && colorChangerPosition <= 1500) {
        this.red = 255;
        this.green = 1500 - colorChangerPosition;
        this.blue = 0;
    }
};

exports.default = ColorChanger;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Color = __webpack_require__(0);

var _Color2 = _interopRequireDefault(_Color);

var _ColorChanger = __webpack_require__(1);

var _ColorChanger2 = _interopRequireDefault(_ColorChanger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener('load', function () {
    new ColorPicker({
        id: "colorPicker"
    });
});

var ColorPicker = function () {
    function ColorPicker(options) {
        _classCallCheck(this, ColorPicker);

        var rootId = options.id;
        this.createDOM(rootId);
        this.setColorPaletteColor({ red: 255, green: 0, blue: 0 });
        this.drawColorPalette(this.paletteColor.toRgb());
        this.setColorSample(130, 130);
        this.drawColorSample(this.sampleColor.toRgb());
        this.setColorAsideElements(this.sampleColor);
        this.addListeners();
    }

    _createClass(ColorPicker, [{
        key: 'createDOM',
        value: function createDOM(rootId) {
            this.root = document.getElementById(rootId);
            this.colorPalette = document.createElement('canvas');
            this.colorPalette.className = "colorPalette";
            this.colorPalette.width = 255;
            this.colorPalette.height = 255;
            this.contextColorPalette = this.colorPalette.getContext('2d');
            this.root.appendChild(this.colorPalette);
            this.sideContainer = document.createElement('div');
            this.sideContainer.className = "sideContainer";
            this.root.appendChild(this.sideContainer);

            this.colorPreview = document.createElement('div');
            this.colorPreview.className = "colorPreview";
            this.sideContainer.appendChild(this.colorPreview);
            this.colorValues = document.createElement('div');
            this.colorValues.className = "colorValues";
            this.sideContainer.appendChild(this.colorValues);
            this.createDOMcolorChanger();
            this.createDOMrgb();
            this.createDOMhex();
            this.createDOMhsl();
            this.createDOMnumber();
        }
    }, {
        key: 'createDOMcolorChanger',
        value: function createDOMcolorChanger() {
            this.colorChanger = document.createElement('input');
            this.colorChanger.className = "colorChanger";
            this.colorChanger.type = "range";
            this.colorChanger.min = "0";
            this.colorChanger.max = "1500";
            this.colorChanger.step = "1";
            this.colorChanger.value = 0;
            this.sideContainer.appendChild(this.colorChanger);
        }
    }, {
        key: 'createDOMrgb',
        value: function createDOMrgb() {
            var rgb = document.createElement('div');
            rgb.className = "rgb";
            this.colorValues.appendChild(rgb);
            var label = document.createElement('label');
            label.for = "RgbInput";
            label.textContent = "Rgb: ";
            rgb.appendChild(label);
            this.RgbInput = document.createElement('input');
            this.RgbInput.className = "RgbInput";
            this.RgbInput.readOnly = true;
            this.RgbInput.type = "text";
            rgb.appendChild(this.RgbInput);
        }
    }, {
        key: 'createDOMhex',
        value: function createDOMhex() {
            var hex = document.createElement('div');
            hex.className = "hex";
            this.colorValues.appendChild(hex);
            var label = document.createElement('label');
            label.for = "hexInput";
            label.textContent = "Hex: ";
            hex.appendChild(label);
            this.hexInput = document.createElement('input');
            this.hexInput.className = "hexInput";
            this.hexInput.readOnly = true;
            this.hexInput.type = "text";
            hex.appendChild(this.hexInput);
        }
    }, {
        key: 'createDOMnumber',
        value: function createDOMnumber() {
            var number = document.createElement('div');
            number.className = "number";
            this.colorValues.appendChild(number);
            var label = document.createElement('label');
            label.for = "numberInput";
            label.textContent = "Number:";
            number.appendChild(label);
            this.numberInput = document.createElement('input');
            this.numberInput.className = "numberInput";
            this.numberInput.readOnly = true;
            this.numberInput.type = "text";
            number.appendChild(this.numberInput);
        }
    }, {
        key: 'createDOMhsl',
        value: function createDOMhsl() {
            var hsl = document.createElement('div');
            hsl.className = "hsl";
            this.colorValues.appendChild(hsl);
            var label = document.createElement('label');
            label.for = "HslInput";
            label.textContent = "Hsl: ";
            hsl.appendChild(label);
            this.HslInput = document.createElement('input');
            this.HslInput.className = "HslInput";
            this.HslInput.readOnly = true;
            this.HslInput.type = "text";
            hsl.appendChild(this.HslInput);
        }
    }, {
        key: 'setColorPaletteColor',
        value: function setColorPaletteColor(color) {
            this.paletteColor = new _Color2.default(color.red, color.green, color.blue);
        }
    }, {
        key: 'drawColorPalette',
        value: function drawColorPalette(color) {
            var gradient = this.contextColorPalette.createLinearGradient(0, 0, 255, 0);
            gradient.addColorStop(0.02, "white");
            gradient.addColorStop(0.98, color);
            this.contextColorPalette.fillStyle = gradient;
            this.contextColorPalette.fillRect(0, 0, 255, 255);

            var gradient1 = this.contextColorPalette.createLinearGradient(0, 0, 0, 255);
            gradient1.addColorStop(0.02, 'rgba(255, 255, 255, 0)');
            gradient1.addColorStop(0.98, "black");
            this.contextColorPalette.fillStyle = gradient1;
            this.contextColorPalette.fillRect(0, 0, 255, 255);
        }
    }, {
        key: 'setColorSample',
        value: function setColorSample(x, y) {
            this.colorSamplePositionX = x;
            this.colorSamplePositionY = y;

            var _contextColorPalette$ = _slicedToArray(this.contextColorPalette.getImageData(this.colorSamplePositionX, this.colorSamplePositionY, 1, 1).data, 3);

            this.colorSampleRed = _contextColorPalette$[0];
            this.colorSampleGreen = _contextColorPalette$[1];
            this.colorSampleBlue = _contextColorPalette$[2];

            this.sampleColor = new _Color2.default(this.colorSampleRed, this.colorSampleGreen, this.colorSampleBlue);
        }
    }, {
        key: 'drawColorSample',
        value: function drawColorSample(rgb) {
            this.contextColorPalette.beginPath();
            this.contextColorPalette.arc(this.colorSamplePositionX, this.colorSamplePositionY, 8, 0, 10 * Math.PI);
            this.contextColorPalette.strokeStyle = "white";
            this.contextColorPalette.fillStyle = rgb;
            this.contextColorPalette.lineWidth = 6;
            this.contextColorPalette.stroke();
            this.contextColorPalette.fill();
        }
    }, {
        key: 'setColorAsideElements',
        value: function setColorAsideElements(color) {
            this.colorPreview.style.background = color.toRgb();
            this.RgbInput.value = color.toRgb();
            this.hexInput.value = color.toHex();
            this.HslInput.value = color.toHsl();
            this.numberInput.value = color.toNumber();
        }
    }, {
        key: 'addListeners',
        value: function addListeners() {
            var _this = this;

            this.colorChanger.addEventListener("change", function () {
                return _this.runColorChanger(parseInt(_this.colorChanger.value));
            });
            this.functionOnClickedCanvas = function (e) {
                return _this.onClickedCanvasPixel(e);
            };
            this.colorPalette.addEventListener('mousedown', function (e) {
                _this.activateMouseMove();
                _this.onClickedCanvasPixel(e);
            });
            this.colorPalette.addEventListener('mouseup', function () {
                return _this.deactivateMouseMove();
            });
            this.colorPalette.addEventListener('mouseout', function () {
                return _this.deactivateMouseMove();
            });
            //this.rInput.addEventListener('change', function() { this.changeInput('rgb'); }.bind(this));
        }
    }, {
        key: 'runColorChanger',
        value: function runColorChanger(colorChangerPosition) {
            var colorChanger = new _ColorChanger2.default(colorChangerPosition);
            this.setColorPaletteColor(colorChanger);
            this.drawColorPalette(this.paletteColor.toRgb());
            this.setColorSample(this.colorSamplePositionX, this.colorSamplePositionY);
            this.drawColorSample(this.sampleColor.toRgb());
            this.setColorAsideElements(this.sampleColor);
        }
    }, {
        key: 'onClickedCanvasPixel',
        value: function onClickedCanvasPixel(e) {
            this.drawColorPalette(this.paletteColor.toRgb());
            this.setColorSample(e.offsetX, e.offsetY);
            this.drawColorSample(this.sampleColor.toRgb());
            this.setColorAsideElements(this.sampleColor);
        }
    }, {
        key: 'activateMouseMove',
        value: function activateMouseMove() {
            this.colorPalette.addEventListener('mousemove', this.functionOnClickedCanvas);
        }
    }, {
        key: 'deactivateMouseMove',
        value: function deactivateMouseMove() {
            this.colorPalette.removeEventListener("mousemove", this.functionOnClickedCanvas);
        }

        // changeInput(changedValue) {
        //     if ('rgb' == changedValue) {
        //         let r = parseInt(this.rInput.value);
        //         let g = parseInt(this.gInput.value);
        //         let b = parseInt(this.bInput.value);
        //         console.log(r, typeof(r));
        //         console.log(g);
        //         console.log(b);
        //         this.inputColor = new Color(r, g, b);
        //         console.log(this.inputColor);
        //         let hsl = this.inputColor.toHsl();
        //         console.log(hsl);
        //         hsl.saturation = "100";
        //         hsl.lightness = "50";

        //         console.log(hsl, typeof(hsl.saturation));
        //         let rgb = new Color(hsl.hue, hsl.saturation, hsl.lightness);
        //         console.log(rgb);
        //         console.log(rgb.rgb.red);
        //         this.setColorPaletteColor(rgb.rgb.red, rgb.rgb.green, rgb.rgb.blue);
        //         this.drawColorPalette(this.paletteColor.toRgb());
        //         this.setColorSample(this.colorSamplePositionX, this.colorSamplePositionY);
        //         this.drawColorSample(this.sampleColor.toRgb());
        //         this.setColorAsideElements(this.sampleColor);
        //     }
        // }

    }]);

    return ColorPicker;
}();

/***/ })
/******/ ]);