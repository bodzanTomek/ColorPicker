import { padLeft } from './utils';
export class Color {
    /**
     * Takes Color in RGB Format
     * 
     * @param {Object} color RGB format
     */
    constructor(color) {
        // if ((arguments.length == 3) && (typeof(arguments[1]) == "number")) { //czy  rgb
        //     this.rgb = this.parseRgb(arguments);
        // }
        // if ((arguments.length == 1) && (typeof(arguments[0]) == "number")) { //czy  number
        //     this.rgb = this.parseNumber(arguments);
        // }
        // if ((arguments.length == 3) && (typeof(arguments[1]) == "string")) { //czy  hsl
        //     this.rgb = this.parseHsl(arguments);
        // }
        // if ((arguments.length == 1) && (typeof(arguments[0]) == "string")) { //czy  hex
        //     this.rgb = this.parseHex(arguments);
        // }

        this.rgb = {
            red: color.red,
            green: color.green,
            blue: color.blue,
        };
    }

    // static fromRgb(color) {
    //     return new Color(this.parseRgb(color));
    // }

    // static parseRgb(color) {
    //     return {
    //         red: color.red,
    //         green: color.green,
    //         blue: color.blue
    //     }
    // }

    // parseNumber(args) {
    //     return {
    //         red: Math.floor(args[0] / (256 * 256)),
    //         green: Math.floor(args[0] / 256) % 256,
    //         blue: args[0] % 256,
    //     }
    // }

    // parseHex(args) {
    //     return {
    //         red: parseInt(args[0].substr(1, 2), 16),
    //         green: parseInt(args[0].substr(3, 2), 16),
    //         blue: parseInt(args[0].substr(5, 2), 16),
    //     }
    // }
    // parseHsl(args) {
    //     let r, g, b;
    //     const h = parseInt(args[0]);
    //     const s = parseInt(args[1]) / 100;
    //     const l = parseInt(args[2]) / 100;
    //     const c = ((1 - Math.abs(2 * l - 1)) * s);
    //     const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    //     const m = l - c / 2;

    //     if (0 <= h && h <= 60) {
    //         r = c;
    //         g = x;
    //         b = 0;
    //     }
    //     if (60 <= h && h <= 120) {
    //         r = x;
    //         g = c;
    //         b = 0;
    //     }
    //     if (120 <= h && h <= 180) {
    //         r = 0;
    //         g = c;
    //         b = x;
    //     }
    //     if (180 <= h && h <= 240) {
    //         r = 0;
    //         g = x;
    //         b = c;
    //     }
    //     if (240 <= h && h <= 300) {
    //         r = x;
    //         g = 0;
    //         b = c;
    //     }
    //     if (300 <= h && h <= 360) {
    //         r = c;
    //         g = 0;
    //         b = x;
    //     }
    //     return {
    //         red: Math.round((r + m) * 255),
    //         green: Math.round((g + m) * 255),
    //         blue: Math.round((b + m) * 255),
    //     }
    // }
    toNumber() {
        return this.rgb.red * 256 * 256 + this.rgb.green * 256 + this.rgb.blue;
    }
    toRgb() {
        return `rgb( ${this.rgb.red}, ${this.rgb.green}, ${this.rgb.blue} )`;
    }
    toHex() {
        let hex = "#";
        hex += padLeft(this.rgb.red.toString(16), 2, "0");
        hex += padLeft(this.rgb.green.toString(16), 2, "0");
        hex += padLeft(this.rgb.blue.toString(16), 2, "0");
        return hex;
    }
    toHsl() {
        const r = this.rgb.red / 255;
        const g = this.rgb.green / 255;
        const b = this.rgb.blue / 255;
        const cmax = Math.max(r, g, b);
        const cmin = Math.min(r, g, b);
        const delta = cmax - cmin;
        let l = (cmax + cmin) / 2;
        let s, h, hsl;

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
        return "hsl(" + hsl + ")";
    }
}