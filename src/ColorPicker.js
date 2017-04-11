import Color from './Color';
import { colorChanger, drawGradient, drawColorSample } from './utils';

export default class ColorPicker {
    constructor(options) {

        this.createDOM(options.id);


        this.setColorPaletteColor({ red: 255, green: 0, blue: 0 });
        this.drawColorPalette(this.paletteColor.toRgb());
        // // if (this.size == "small")
        // //     this.setColorSample(80, 80);
        // // if (this.size == "normal")
        // //     this.setColorSample(130, 130);
        // drawColorSample({
        //     color: this.sampleColor.toRgb(),
        //     context: this.contextColorPalette,
        //     positionX: this.colorSamplePositionX,
        //     positionY: this.colorSamplePositionY
        // });
        //this.setColorAsideElements(this.sampleColor);
        this.addEventListeners();
    }


    createRoot(root) {
        this.root = document.getElementById(root);
    }
    createContainer() {
        this.container = document.createElement('div');
        this.container.className = "container";
    }
    addContainerToRoot() {
        this.root.appendChild(this.container);
    }
    createPickerContainer() {
        this.pickerContainer = document.createElement('div');
        this.pickerContainer.className = "pickerContainer";
    }
    addPickerContainerToContainer() {
        this.container.appendChild(this.pickerContainer);
    }
    createColorPalette(size) {
        this.colorPalette = document.createElement('canvas');
        this.colorPalette.className = "colorPalette";
        this.colorPalette.width = size;
        this.colorPalette.height = size;
        this.contextColorPalette = this.colorPalette.getContext('2d');
    }
    addColorPaletteToPickerContainer() {
        this.pickerContainer.appendChild(this.colorPalette);
    }
    addColorPaletteToContainer() {
        this.container.appendChild(this.colorPalette);
    }
    createColorPreview(className) {
        this.colorPreview = document.createElement('div');
        this.colorPreview.classList.add(className);
        this.colorPreview.classList.add("colorPreview");
    }
    addColorPreviewToPickerContainer() {
        this.pickerContainer.appendChild(this.colorPreview);
    }
    createSideContainer() {
        this.sideContainer = document.createElement('div');
        this.sideContainer.className = "sideContainer";
    }
    addSideContainerToContainer() {
        this.container.appendChild(this.sideContainer);
    }
    addColorPreviewToSideContainer() {
        this.sideContainer.appendChild(this.colorPreview);
    }
    createColorValues(className) {
        this.colorValues = document.createElement('div');
        this.colorValues.classList.add(className);
        this.colorValues.classList.add("colorValues");
    }
    addColorValuesToSideContainer() {
        this.sideContainer.appendChild(this.colorValues);
    }
    createColorChanger(className) {
        this.colorChanger = document.createElement('input');
        this.colorChanger.classList.add(className);
        this.colorChanger.classList.add("colorChanger");
        this.colorChanger.type = "range";
        this.colorChanger.min = "1";
        this.colorChanger.max = "360";
        this.colorChanger.step = "1";
        this.colorChanger.value = 1;
    }
    addColorChangerToSideContainer() {
        this.sideContainer.appendChild(this.colorChanger);
    }
    createAndAddColorValuesInputs() {
        this.rgbInput = this.createAndAddColorValuesInput({
            divClassName: "rgb",
            labelFor: "rgbInput",
            labelTextContent: "Rgb: ",
            inputClassName: "rgbInput"
        });
        this.hslInput = this.createAndAddColorValuesInput({
            divClassName: "hsl",
            labelFor: "hslInput",
            labelTextContent: "Hsl: ",
            inputClassName: "hslInput"
        });
        this.hexInput = this.createAndAddColorValuesInput({
            divClassName: "hex",
            labelFor: "hexInput",
            labelTextContent: "Hex: ",
            inputClassName: "hexInput"
        });
        this.numberInput = this.createAndAddColorValuesInput({
            divClassName: "number",
            labelFor: "numberInput",
            labelTextContent: "Number: ",
            inputClassName: "numberInput"
        });
    }
    createAndAddColorValuesInput(config) {
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







    setColorPaletteColor(color) {
            this.paletteColor = new Color(color);
        }
        // drawColorPalette(color) {
        //     drawGradient({ direction: 'horizontal', from: { distance: 0.02, color: "white" }, to: { distance: 0.98, color: color } }, this.contextColorPalette, this.size);
        //     drawGradient({ direction: 'vertical', from: { distance: 0.02, color: 'rgba(255, 255, 255, 0)' }, to: { distance: 0.98, color: "black" } }, this.contextColorPalette, this.size);
        // }
    setColorSample(x, y) {
        this.colorSamplePositionX = x;
        this.colorSamplePositionY = y;
        [this.colorSampleRed, this.colorSampleGreen, this.colorSampleBlue] = this.contextColorPalette.getImageData(this.colorSamplePositionX, this.colorSamplePositionY, 1, 1).data;
        this.sampleColor = new Color({ red: this.colorSampleRed, green: this.colorSampleGreen, blue: this.colorSampleBlue });
    }
    drawColorSample() {
        drawColorSample({
            color: this.sampleColor.toRgb(),
            context: this.contextColorPalette,
            positionX: this.colorSamplePositionX,
            positionY: this.colorSamplePositionY
        });
    }
    setColorAsideElements(color) {
        this.colorPreview.style.background = color.toRgb();
        this.rgbInput.value = color.toRgb();
        this.hexInput.value = color.toHex();
        this.hslInput.value = color.toHsl();
        this.numberInput.value = color.toNumber();
    }
    addEventListeners() {
        this.aaa = () => this.runColorChanger(parseInt(this.colorChanger.value));
        this.colorChanger.addEventListener("mousedown", () => {
            this.activateMouseMove();
            this.runColorChanger(parseInt(this.colorChanger.value));
        });
        this.colorChanger.addEventListener('mouseup', () => this.deactivateMouseMove());
        this.colorChanger.addEventListener('mouseout', () => this.deactivateMouseMove());


        this.functionOnClickedCanvas = (e) => this.onClickedCanvasPixel(e);
        this.colorPalette.addEventListener('mousedown', (e) => {
            this.activateMouseMove();
            this.onClickedCanvasPixel(e);
        });
        this.colorPalette.addEventListener('mouseup', () => this.deactivateMouseMove());
        this.colorPalette.addEventListener('mouseout', () => this.deactivateMouseMove());
    }
    runColorChanger(colorChangerPosition) {
        //console.log(colorChangerPosition);
        let returnedColorChanger = colorChanger(colorChangerPosition);
        this.setColorPaletteColor(returnedColorChanger);
        this.drawColorPalette(this.paletteColor.toRgb());
        this.setColorSample(this.colorSamplePositionX, this.colorSamplePositionY);
        this.drawColorSample();
        this.setColorAsideElements(this.sampleColor);
    }
    onClickedCanvasPixel(e) {
        //console.log(e)
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
        this.colorChanger.addEventListener("mousemove", () => this.aaa());
        this.colorPalette.addEventListener('mousemove', this.functionOnClickedCanvas);
    }
    deactivateMouseMove() {
        this.colorChanger.removeEventListener("mousemove", () => this.aaa());
        this.colorPalette.removeEventListener("mousemove", this.functionOnClickedCanvas);
    }
}