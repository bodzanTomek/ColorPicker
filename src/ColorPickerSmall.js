import ColorPicker from './ColorPicker';
import { colorChanger, drawGradient, drawColorSample } from './utils';

export default class ColorPickerSmall extends ColorPicker {
    constructor(options) {
        super(options);
        console.log("small");
        this.setColorSample(80, 80);
        this.drawColorSample();
        this.setColorAsideElements(this.sampleColor);
    }
    createDOM(rootId) {
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
        this.colorChanger.max = "360";
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
    drawColorPalette(color) {
        this.sizeColorPalette = 155;
        drawGradient({ direction: 'horizontal', from: { distance: 0.02, color: "white" }, to: { distance: 0.98, color: color } }, this.contextColorPalette, this.sizeColorPalette);
        drawGradient({ direction: 'vertical', from: { distance: 0.02, color: 'rgba(255, 255, 255, 0)' }, to: { distance: 0.98, color: "black" } }, this.contextColorPalette, this.sizeColorPalette);
    }
}