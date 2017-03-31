import { Color } from './Color';
import { colorChanger, drawGradient, drawColorSample } from './utils';



window.addEventListener('load', () => {
    new ColorPickerSmall({
        id: "colorPicker",
        size: 'small'
    })
    new ColorPickerNormal({
        id: "colorPicker2",
        size: 'normal'
    })
});


class ColorPicker {
    constructor(options) {
        const rootId = options.id;
        this.size = options.size;
        this.createDOM(rootId);
        this.setColorPaletteColor({ red: 255, green: 0, blue: 0 });
        this.drawColorPalette(this.paletteColor.toRgb());
        if (this.size == "small")
            this.setColorSample(80, 80);
        if (this.size == "normal")
            this.setColorSample(130, 130);
        drawColorSample({
            color: this.sampleColor.toRgb(),
            context: this.contextColorPalette,
            positionX: this.colorSamplePositionX,
            positionY: this.colorSamplePositionY
        });
        this.setColorAsideElements(this.sampleColor);
        this.addEventListeners();
    }
    setColorPaletteColor(color) {
        this.paletteColor = new Color(color);
    }
    drawColorPalette(color) {
        drawGradient({ direction: 'horizontal', from: { distance: 0.02, color: "white" }, to: { distance: 0.98, color: color } }, this.contextColorPalette, this.size);
        drawGradient({ direction: 'vertical', from: { distance: 0.02, color: 'rgba(255, 255, 255, 0)' }, to: { distance: 0.98, color: "black" } }, this.contextColorPalette, this.size);
    }
    setColorSample(x, y) {
        this.colorSamplePositionX = x;
        this.colorSamplePositionY = y;
        [this.colorSampleRed, this.colorSampleGreen, this.colorSampleBlue] = this.contextColorPalette.getImageData(this.colorSamplePositionX, this.colorSamplePositionY, 1, 1).data;
        this.sampleColor = new Color({ red: this.colorSampleRed, green: this.colorSampleGreen, blue: this.colorSampleBlue });
    }
    setColorAsideElements(color) {
        this.colorPreview.style.background = color.toRgb();
        this.rgbInput.value = color.toRgb();
        this.hexInput.value = color.toHex();
        this.hslInput.value = color.toHsl();
        this.numberInput.value = color.toNumber();
    }
    addEventListeners() {
        this.colorChanger.addEventListener("change", () => this.runColorChanger(parseInt(this.colorChanger.value)));
        this.colorChanger.addEventListener("mousemove", () => this.runColorChanger(parseInt(this.colorChanger.value)));
        this.functionOnClickedCanvas = (e) => this.onClickedCanvasPixel(e);
        this.colorPalette.addEventListener('mousedown', (e) => {
            this.activateMouseMove();
            this.onClickedCanvasPixel(e);
        });
        this.colorPalette.addEventListener('mouseup', () => this.deactivateMouseMove());
        this.colorPalette.addEventListener('mouseout', () => this.deactivateMouseMove());
        //this.rgbInput.addEventListener('change', function() { this.changeInput('rgb'); }.bind(this));
    }
    runColorChanger(colorChangerPosition) {
        console.log(colorChangerPosition);
        let returnedColorChanger = colorChanger(colorChangerPosition);
        console.log(returnedColorChanger);
        this.setColorPaletteColor(returnedColorChanger);
        this.drawColorPalette(this.paletteColor.toRgb());
        this.setColorSample(this.colorSamplePositionX, this.colorSamplePositionY);
        drawColorSample({
            color: this.sampleColor.toRgb(),
            context: this.contextColorPalette,
            positionX: this.colorSamplePositionX,
            positionY: this.colorSamplePositionY
        });
        this.setColorAsideElements(this.sampleColor);
    }
    onClickedCanvasPixel(e) {
        this.drawColorPalette(this.paletteColor.toRgb());
        this.setColorSample(e.offsetX, e.offsetY);
        drawColorSample({
            color: this.sampleColor.toRgb(),
            context: this.contextColorPalette,
            positionX: this.colorSamplePositionX,
            positionY: this.colorSamplePositionY
        });
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
        //         let r = 80;
        //         let g = 190;
        //         let b = 190;
        //         this.inputColor = new Color(r, g, b);
        //         console.log(this.inputColor);

    // let hsl = this.inputColor.toHsl();
    // console.log(hsl);
    // hsl.saturation = "100";
    // hsl.lightness = "50";

    // console.log(hsl, typeof(hsl.saturation));
    // let rgb = new Color(hsl.hue, hsl.saturation, hsl.lightness);
    // console.log(rgb);
    // console.log(rgb.rgb.red);
    // this.setColorPaletteColor(rgb.rgb.red, rgb.rgb.green, rgb.rgb.blue);
    // this.drawColorPalette(this.paletteColor.toRgb());
    // this.setColorSample(this.colorSamplePositionX, this.colorSamplePositionY);
    // this.drawColorSample(this.sampleColor.toRgb());
    // this.setColorAsideElements(this.sampleColor);
    // }
    // }
}


class ColorPickerSmall extends ColorPicker {
    constructor(options) {
        super(options);
    }
    createDOM(rootId) {
        this.root = document.getElementById(rootId);
        this.container = document.createElement('div');
        this.container.className = "container";
        this.root.appendChild(this.container);

        this.pickerContainer = document.createElement('div');
        this.pickerContainer.className = "pickerContainer";
        this.container.appendChild(this.pickerContainer);
        this.colorPalette = document.createElement('canvas');
        this.colorPalette.className = "colorPalette";
        this.colorPalette.width = 155;
        this.colorPalette.height = 155;
        this.contextColorPalette = this.colorPalette.getContext('2d');
        this.pickerContainer.appendChild(this.colorPalette);
        this.colorPreview = document.createElement('div');
        this.colorPreview.classList.add("colorPreviewSmall");
        this.colorPreview.classList.add("colorPreview");
        this.pickerContainer.appendChild(this.colorPreview);

        this.sideContainer = document.createElement('div');
        this.sideContainer.className = "sideContainer";
        this.container.appendChild(this.sideContainer);
        this.colorValues = document.createElement('div');
        this.colorValues.classList.add("colorValuesSmall");
        this.colorValues.classList.add("colorValues");
        this.sideContainer.appendChild(this.colorValues);
        this.createDOMcolorChanger();
        this.rgbInput = this.createDOMcolorValuesInput({
            divClassName: "rgb",
            labelFor: "rgbInput",
            labelTextContent: "Rgb: ",
            inputClassName: "rgbInput"
        });
        this.hslInput = this.createDOMcolorValuesInput({
            divClassName: "hsl",
            labelFor: "hslInput",
            labelTextContent: "Hsl: ",
            inputClassName: "hslInput"
        });
        this.hexInput = this.createDOMcolorValuesInput({
            divClassName: "hex",
            labelFor: "hexInput",
            labelTextContent: "Hex: ",
            inputClassName: "hexInput"
        });
        this.numberInput = this.createDOMcolorValuesInput({
            divClassName: "number",
            labelFor: "numberInput",
            labelTextContent: "Number: ",
            inputClassName: "numberInput"
        });
    }
    createDOMcolorChanger() {
        this.colorChanger = document.createElement('input');
        this.colorChanger.classList.add("colorChangerSmall");
        this.colorChanger.classList.add("colorChanger");
        this.colorChanger.type = "range";
        this.colorChanger.min = "1";
        this.colorChanger.max = "1530";
        this.colorChanger.step = "1";
        this.colorChanger.value = 1;
        this.sideContainer.appendChild(this.colorChanger);
    }
    createDOMcolorValuesInput(config) {
        let divElement = document.createElement('div');
        divElement.className = config.divClassName;
        this.colorValues.appendChild(divElement);
        let label = document.createElement('label');
        label.for = config.labelFor;
        label.textContent = config.labelTextContent;
        divElement.appendChild(label);
        let Input = document.createElement('input');
        Input.className = config.inputClassName;
        Input.readOnly = false;
        Input.type = "text";
        divElement.appendChild(Input);
        return Input;
    }
}


class ColorPickerNormal extends ColorPicker {
    constructor(options) {
        super(options);
    }
    createDOM(rootId) {
        this.root = document.getElementById(rootId);
        this.container = document.createElement('div');
        this.container.className = "container";
        this.root.appendChild(this.container);
        this.colorPalette = document.createElement('canvas');
        this.colorPalette.className = "colorPalette";
        this.colorPalette.width = 255;
        this.colorPalette.height = 255;
        this.contextColorPalette = this.colorPalette.getContext('2d');
        this.container.appendChild(this.colorPalette);
        this.sideContainer = document.createElement('div');
        this.sideContainer.className = "sideContainer";
        this.container.appendChild(this.sideContainer);

        this.colorPreview = document.createElement('div');
        this.colorPreview.className = "colorPreview";
        this.sideContainer.appendChild(this.colorPreview);
        this.colorValues = document.createElement('div');
        this.colorValues.className = "colorValues"
        this.sideContainer.appendChild(this.colorValues);
        this.createDOMcolorChanger();
        this.rgbInput = this.createDOMcolorValuesInput({
            divClassName: "rgb",
            labelFor: "rgbInput",
            labelTextContent: "Rgb: ",
            inputClassName: "rgbInput"
        });
        this.hslInput = this.createDOMcolorValuesInput({
            divClassName: "hsl",
            labelFor: "hslInput",
            labelTextContent: "Hsl: ",
            inputClassName: "hslInput"
        });
        this.hexInput = this.createDOMcolorValuesInput({
            divClassName: "hex",
            labelFor: "hexInput",
            labelTextContent: "Hex: ",
            inputClassName: "hexInput"
        });
        this.numberInput = this.createDOMcolorValuesInput({
            divClassName: "number",
            labelFor: "numberInput",
            labelTextContent: "Number: ",
            inputClassName: "numberInput"
        });
    }
    createDOMcolorChanger() {
        this.colorChanger = document.createElement('input');
        this.colorChanger.className = "colorChanger";
        this.colorChanger.type = "range";
        this.colorChanger.min = "1";
        this.colorChanger.max = "1530";
        this.colorChanger.step = "1";
        this.colorChanger.value = 1;
        this.sideContainer.appendChild(this.colorChanger);
    }
    createDOMcolorValuesInput(config) {
        let divElement = document.createElement('div');
        divElement.className = config.divClassName;
        this.colorValues.appendChild(divElement);
        let label = document.createElement('label');
        label.for = config.labelFor;
        label.textContent = config.labelTextContent;
        divElement.appendChild(label);
        let Input = document.createElement('input');
        Input.className = config.inputClassName;
        Input.readOnly = false;
        Input.type = "text";
        divElement.appendChild(Input);
        return Input;
    }
}