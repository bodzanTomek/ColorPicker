export default class Color {
    constructor() {
        if ((arguments.length == 3) && (typeof(arguments[1]) == "number")) { //czy konstruktor to rgb
            this.rgb = this.parseRgb(arguments);
        }
        if ((arguments.length == 1) && (typeof(arguments[0]) == "number")) { //czy konstruktor to number
            this.rgb = this.parseNumber(arguments);
        }
        if ((arguments.length == 3) && (typeof(arguments[1]) == "string")) { //czy konstruktor to hsl
            this.rgb = this.parseHsl(arguments);
        }
        if ((arguments.length == 1) && (typeof(arguments[0]) == "string")) { //czy konstruktor to hex
            this.rgb = this.parseHex(arguments);
        }
    }

    parseNumber(args) {
        return {
            red: Math.floor(args[0] / (256 * 256)),
            green: Math.floor(args[0] / 256) % 256,
            blue: args[0] % 256,
        }
    }
    parseRgb(args) {
        return {
            red: args[0],
            green: args[1],
            blue: args[2],
        }
    }
    parseHex(args) {
        return {
            red: parseInt(args[0].substr(1, 2), 16),
            green: parseInt(args[0].substr(3, 2), 16),
            blue: parseInt(args[0].substr(5, 2), 16),
        }
    }
    parseHsl(args) {
        var r, g, b;
        var h = parseInt(args[0]);
        var s = parseInt(args[1]) / 100;
        var l = parseInt(args[2]) / 100;
        var c = ((1 - Math.abs(2 * l - 1)) * s);
        var x = c * (1 - Math.abs((h / 60) % 2 - 1));
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
            blue: Math.round((b + m) * 255),
        }
    }
    toNumber() {

        var number = ((this.rgb.red * (256 * 256)) + (this.rgb.green * 256) + this.rgb.blue);
        return (number);
    }
    toRgb() {
        var rgb = "";
        for (let key in this.rgb) {
            rgb += this.rgb[key] + ",";
        }
        rgb = rgb.substr(0, (rgb.length - 1)); //usówamy ostatni przecinek
        return ("rgb(" + rgb + ")");
    }
    toHex() {
        var hex = "#";
        for (let key in this.rgb) {
            if (this.rgb[key].toString(16).length == 1) {
                hex += "0" + this.rgb[key].toString(16);
            } else {
                hex += this.rgb[key].toString(16);
            }

        }
        return (hex);
    }
    toHsl() {
        var r = this.rgb.red / 255;
        var g = this.rgb.green / 255;
        var b = this.rgb.blue / 255;
        var cmax = Math.max(r, g, b);
        var cmin = Math.min(r, g, b);
        var delta = cmax - cmin;
        var l = (cmax + cmin) / 2;
        var s, h, hsl;

        if (cmax === r) {
            h = 60 * (((g - b) / delta) % 6);
        }
        if (cmax === g) {
            h = 60 * (((b - r) / delta) + 2);
        }
        if (cmax === b) {
            h = 60 * (((r - g) / delta) + 4);
        }
        if (delta == 0) {
            s = 0;
        } else {
            s = delta / (1 - Math.abs((2 * l) - 1));
        }
        l = Math.round(100 * l) + "%";
        s = Math.round(100 * s) + "%";
        h = Math.round((h < 0) ? h + 360 : h) + "°";
        hsl = h + "," + s + "," + l;
        return ("hsl(" + hsl + ")");
    }


}

//(module || {}).exports = Color; // tak przekazuję samą klasę