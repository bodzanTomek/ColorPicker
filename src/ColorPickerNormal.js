import ColorPicker from './ColorPicker';
import { colorChanger, drawGradient, drawColorSample } from './utils';

export default class ColorPickerNormal extends ColorPicker {
    constructor(options) {
        super(options);
        this.setColorSample(130, 130);
        this.drawColorSample();
        this.setColorAsideElements(this.sampleColor);
    }
    createDOM(rootId) {
        this.createRoot(rootId);
        this.createContainer();
        this.addContainerToRoot();

        this.createColorPalette(255);
        this.addColorPaletteToContainer();

        this.createSideContainer();
        this.addSideContainerToContainer();
        this.createColorPreview("colorPreview");
        this.addColorPreviewToSideContainer();
        this.createColorValues("colorValues");
        this.addColorValuesToSideContainer();
        this.createColorChanger("colorChanger");
        this.addColorChangerToSideContainer();
        this.createAndAddColorValuesInputs();
    }

    drawColorPalette(color) {
        this.sizeColorPalette = 255;
        drawGradient({ direction: 'horizontal', from: { distance: 0.02, color: "white" }, to: { distance: 0.98, color: color } }, this.contextColorPalette, this.sizeColorPalette);
        drawGradient({ direction: 'vertical', from: { distance: 0.02, color: 'rgba(255, 255, 255, 0)' }, to: { distance: 0.98, color: "black" } }, this.contextColorPalette, this.sizeColorPalette);
    }
}