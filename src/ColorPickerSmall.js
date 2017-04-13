import ColorPicker from './ColorPicker';
import { colorChanger, drawGradient, drawColorSample } from './utils';
import {
    createRoot,
    createContainer,
    createPickerContainer,
    createColorPalette,
    createColorPreview,
    createSideContainer,
    createColorValues,
    createAndAddColorValueInput,
    createColorChanger
} from './createDOMhelpers';

export default class ColorPickerSmall extends ColorPicker {
    constructor(options) {
        super(options, { colorPaletteSize: 155, colorSamplePositionX: 80, colorSamplePositionY: 80 });
    }
    createDOM(rootId) {
        const root = createRoot(rootId);
        const container = createContainer();
        root.appendChild(container);

        const pickerContainer = createPickerContainer();
        container.appendChild(pickerContainer);
        this.colorPalette = createColorPalette(155);
        this.contextColorPalette = this.colorPalette.getContext('2d');
        pickerContainer.appendChild(this.colorPalette);
        this.colorPreview = createColorPreview("colorPreviewSmall");
        pickerContainer.appendChild(this.colorPreview);

        const sideContainer = createSideContainer();
        container.appendChild(sideContainer);
        let colorValues = createColorValues("colorValuesSmall");
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
        this.colorChanger = createColorChanger("colorChangerSmall");
        sideContainer.appendChild(this.colorChanger);
    }
}