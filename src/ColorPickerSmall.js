import ColorPicker from './ColorPicker';
import { colorChanger, drawGradient, drawColorSample } from './utils';

export default class ColorPickerSmall extends ColorPicker {
    constructor(options) {
        super(options);
        this.setColorSample(80, 80);
        this.drawColorSample();
        this.setColorAsideElements(this.sampleColor);
    }
    createDOM(rootId) {
        this.createRoot(rootId);
        this.createContainer();
        this.addContainerToRoot();

        this.createPickerContainer();
        this.addPickerContainerToContainer();
        this.createColorPalette(155);
        this.addColorPaletteToPickerContainer();
        this.createColorPreview("colorPreviewSmall");
        this.addColorPreviewToPickerContainer();

        this.createSideContainer();
        this.addSideContainerToContainer();
        this.createColorValues("colorValuesSmall");
        this.addColorValuesToSideContainer();
        this.createColorChanger("colorChangerSmall");
        this.addColorChangerToSideContainer();
        this.createAndAddColorValuesInputs();
    }

    drawColorPalette(color) {
        this.sizeColorPalette = 155;
        drawGradient({ direction: 'horizontal', from: { distance: 0.02, color: "white" }, to: { distance: 0.98, color: color } }, this.contextColorPalette, this.sizeColorPalette);
        drawGradient({ direction: 'vertical', from: { distance: 0.02, color: 'rgba(255, 255, 255, 0)' }, to: { distance: 0.98, color: "black" } }, this.contextColorPalette, this.sizeColorPalette);
    }
}