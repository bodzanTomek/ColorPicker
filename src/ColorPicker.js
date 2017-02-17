import Color from './Color';
import ColorChanger from './ColorChanger';

window.addEventListener('load', () => {
    new ColorPicker({
        id: "colorPicker",
    })
});

class ColorPicker {
    constructor(options) {
        const rootId = options.id;
        this.createDOM(rootId);
        this.setColorPaletteColor({ red: 255, green: 0, blue: 0 });
        this.drawColorPalette(this.paletteColor.toRgb());
        this.setColorSample(130, 130);
        this.drawColorSample(this.sampleColor.toRgb());
        this.setColorAsideElements(this.sampleColor);
        this.addListeners();
    }
    createDOM(rootId) {
        this.root = document.getElementById(rootId);
        this.colorPalette = document.createElement('canvas');
        this.colorPalette.className = "colorPalette";
        this.colorPalette.width = 255;
        this.colorPalette.height = 255;
        this.contextColorPalette = this.colorPalette.getContext('2d');
        this.root.appendChild(this.colorPalette);
        this.sideContainer = document.createElement('div');
        this.sideContainer.className = "sideContainer"
        this.root.appendChild(this.sideContainer);

        this.colorPreview = document.createElement('div');
        this.colorPreview.className = "colorPreview";
        this.sideContainer.appendChild(this.colorPreview);
        this.colorValues = document.createElement('div');
        this.colorValues.className = "colorValues"
        this.sideContainer.appendChild(this.colorValues);
        this.createDOMcolorChanger();
        this.createDOMrgb();
        this.createDOMhex();
        this.createDOMhsl();
        this.createDOMnumber();
    }
    createDOMcolorChanger() {
        this.colorChanger = document.createElement('input');
        this.colorChanger.className = "colorChanger";
        this.colorChanger.type = "range";
        this.colorChanger.min = "0";
        this.colorChanger.max = "1500";
        this.colorChanger.step = "1";
        this.colorChanger.value = 0;
        this.sideContainer.appendChild(this.colorChanger);
    }
    createDOMrgb() {
        let rgb = document.createElement('div');
        rgb.className = "rgb";
        this.colorValues.appendChild(rgb);
        var label = document.createElement('label');
        label.for = "RgbInput";
        label.textContent = "Rgb: "
        rgb.appendChild(label);
        this.RgbInput = document.createElement('input');
        this.RgbInput.className = "RgbInput";
        this.RgbInput.readOnly = true;
        this.RgbInput.type = "text";
        rgb.appendChild(this.RgbInput);

    }
    createDOMhex() {
        let hex = document.createElement('div');
        hex.className = "hex";
        this.colorValues.appendChild(hex);
        let label = document.createElement('label');
        label.for = "hexInput";
        label.textContent = "Hex: "
        hex.appendChild(label);
        this.hexInput = document.createElement('input');
        this.hexInput.className = "hexInput";
        this.hexInput.readOnly = true;
        this.hexInput.type = "text";
        hex.appendChild(this.hexInput);
    }
    createDOMnumber() {
        let number = document.createElement('div');
        number.className = "number";
        this.colorValues.appendChild(number);
        let label = document.createElement('label');
        label.for = "numberInput";
        label.textContent = "Number:"
        number.appendChild(label);
        this.numberInput = document.createElement('input');
        this.numberInput.className = "numberInput";
        this.numberInput.readOnly = true;
        this.numberInput.type = "text";
        number.appendChild(this.numberInput);
    }
    createDOMhsl() {
        let hsl = document.createElement('div');
        hsl.className = "hsl";
        this.colorValues.appendChild(hsl);
        let label = document.createElement('label');
        label.for = "HslInput";
        label.textContent = "Hsl: "
        hsl.appendChild(label);
        this.HslInput = document.createElement('input');
        this.HslInput.className = "HslInput";
        this.HslInput.readOnly = true;
        this.HslInput.type = "text";
        hsl.appendChild(this.HslInput);
    }
    setColorPaletteColor(color) {
        this.paletteColor = new Color(color.red, color.green, color.blue);
    }
    drawColorPalette(color) {
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
    setColorSample(x, y) {
        this.colorSamplePositionX = x;
        this.colorSamplePositionY = y;
        [this.colorSampleRed, this.colorSampleGreen, this.colorSampleBlue] = this.contextColorPalette.getImageData(this.colorSamplePositionX, this.colorSamplePositionY, 1, 1).data;
        this.sampleColor = new Color(this.colorSampleRed, this.colorSampleGreen, this.colorSampleBlue);
    }
    drawColorSample(rgb) {
        this.contextColorPalette.beginPath();
        this.contextColorPalette.arc(this.colorSamplePositionX, this.colorSamplePositionY, 8, 0, 10 * Math.PI);
        this.contextColorPalette.strokeStyle = "white";
        this.contextColorPalette.fillStyle = rgb;
        this.contextColorPalette.lineWidth = 6;
        this.contextColorPalette.stroke();
        this.contextColorPalette.fill();
    }
    setColorAsideElements(color) {
        this.colorPreview.style.background = color.toRgb();
        this.RgbInput.value = color.toRgb();
        this.hexInput.value = color.toHex();
        this.HslInput.value = color.toHsl();
        this.numberInput.value = color.toNumber();
    }
    addListeners() {
        this.colorChanger.addEventListener("change", () => this.runColorChanger(parseInt(this.colorChanger.value)));
        this.functionOnClickedCanvas = (e) => this.onClickedCanvasPixel(e);
        this.colorPalette.addEventListener('mousedown', (e) => {
            this.activateMouseMove();
            this.onClickedCanvasPixel(e);
        });
        this.colorPalette.addEventListener('mouseup', () => this.deactivateMouseMove());
        this.colorPalette.addEventListener('mouseout', () => this.deactivateMouseMove());
        //this.rInput.addEventListener('change', function() { this.changeInput('rgb'); }.bind(this));
    }
    runColorChanger(colorChangerPosition) {
        let colorChanger = new ColorChanger(colorChangerPosition);
        this.setColorPaletteColor(colorChanger);
        this.drawColorPalette(this.paletteColor.toRgb());
        this.setColorSample(this.colorSamplePositionX, this.colorSamplePositionY);
        this.drawColorSample(this.sampleColor.toRgb());
        this.setColorAsideElements(this.sampleColor);
    }
    onClickedCanvasPixel(e) {
        this.drawColorPalette(this.paletteColor.toRgb());
        this.setColorSample(e.offsetX, e.offsetY);
        this.drawColorSample(this.sampleColor.toRgb());
        this.setColorAsideElements(this.sampleColor);
    }
    activateMouseMove() {
        this.colorPalette.addEventListener('mousemove', this.functionOnClickedCanvas);
    }
    deactivateMouseMove() {
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
}