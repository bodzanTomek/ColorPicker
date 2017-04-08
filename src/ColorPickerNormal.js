import ColorPicker from './ColorPicker';

export default class ColorPickerNormal extends ColorPicker {
    constructor(options) {
        super(options);
        this.setColorSample(130, 130);
        this.drawColorSample();
        this.setColorAsideElements(this.sampleColor);
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
        const divElement = document.createElement('div');
        divElement.className = config.divClassName;
        this.colorValues.appendChild(divElement);
        const label = document.createElement('label');
        label.for = config.labelFor;
        label.textContent = config.labelTextContent;
        divElement.appendChild(label);
        const Input = document.createElement('input');
        Input.className = config.inputClassName;
        Input.readOnly = false;
        Input.type = "text";
        divElement.appendChild(Input);
        return Input;
    }
    drawColorPalette(color) {
        this.sizeColorPalette = 255;
        drawGradient({ direction: 'horizontal', from: { distance: 0.02, color: "white" }, to: { distance: 0.98, color: color } }, this.contextColorPalette, this.sizeColorPalette);
        drawGradient({ direction: 'vertical', from: { distance: 0.02, color: 'rgba(255, 255, 255, 0)' }, to: { distance: 0.98, color: "black" } }, this.contextColorPalette, this.sizeColorPalette);
    }
}