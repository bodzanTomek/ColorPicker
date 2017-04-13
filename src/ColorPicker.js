import Color from './Color';
import { colorChanger, drawGradient, drawColorSample } from './utils';

export default class ColorPicker {
    constructor(options, sizes) {
        this.sizeColorPalette = sizes.colorPaletteSize;
        this.createDOM(options.id);
        this.setColorPaletteColor({ red: 255, green: 0, blue: 0 });
        this.drawColorPalette(this.paletteColor.toRgb());
        this.setColorSample(sizes.colorSamplePositionX, sizes.colorSamplePositionY);
        this.drawColorSample();
        this.setColorAsideElements(this.sampleColor);
        this.addEventListeners();
    }

    setColorPaletteColor(color) {
        this.paletteColor = new Color(color);
    }
    drawColorPalette(color) {
        drawGradient({ direction: 'horizontal', from: { distance: 0.02, color: "white" }, to: { distance: 0.98, color: color } }, this.contextColorPalette, this.sizeColorPalette);
        drawGradient({ direction: 'vertical', from: { distance: 0.02, color: 'rgba(255, 255, 255, 0)' }, to: { distance: 0.98, color: "black" } }, this.contextColorPalette, this.sizeColorPalette);
    }
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