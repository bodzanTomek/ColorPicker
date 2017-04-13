import ColorPicker from './ColorPicker';
import { colorChanger, drawGradient, drawColorSample } from './utils';
import {
    createRoot,
    createContainer,
    createColorPalette,
    createColorPreview,
    createSideContainer,
    createColorValues,
    createAndAddColorValueInput,
    createColorChanger
} from './createDOMhelpers';

export default class ColorPickerNormal extends ColorPicker {
    constructor(options) {
        super(options, { colorPaletteSize: 255, colorSamplePositionX: 130, colorSamplePositionY: 130 });
    }
    createDOM(rootId) {
        const root = createRoot(rootId);
        const container = createContainer();
        root.appendChild(container);

        this.colorPalette = createColorPalette(255);
        this.contextColorPalette = this.colorPalette.getContext('2d');
        container.appendChild(this.colorPalette);

        const sideContainer = createSideContainer();
        container.appendChild(sideContainer);
        this.colorPreview = createColorPreview("colorPreview");
        sideContainer.appendChild(this.colorPreview);

        let colorValues = createColorValues("colorValues");
        sideContainer.appendChild(colorValues);

        this.rgbInput = createAndAddColorValueInput(colorValues, {
            divClassName: "rgb",
            labelFor: "rgbInput",
            labelTextContent: "Rgb: ",
            inputClassName: "rgbInput"
        });
        this.hslInput = createAndAddColorValueInput(colorValues, {
            divClassName: "hsl",
            labelFor: "hslInput",
            labelTextContent: "Hsl: ",
            inputClassName: "hslInput"
        });
        this.hexInput = createAndAddColorValueInput(colorValues, {
            divClassName: "hex",
            labelFor: "hexInput",
            labelTextContent: "Hex: ",
            inputClassName: "hexInput"
        });
        this.numberInput = createAndAddColorValueInput(colorValues, {
            divClassName: "number",
            labelFor: "numberInput",
            labelTextContent: "Number: ",
            inputClassName: "numberInput"
        });
        this.colorChanger = createColorChanger("colorChanger");
        sideContainer.appendChild(this.colorChanger);
    }
}