import Color from './Color';
import { colorChanger, drawGradient, drawColorSample } from './utils';

export default class ColorPicker {
    constructor(options) {
        console.log("picker");
        const rootId = options.id;
        this.createRoot(rootId);
        this.createDOM(rootId);
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

    createRoot(rootId) {
        this.root = document.getElementById(rootId);
        this.container = document.createElement('div');
        this.container.className = "container";
        this.root.appendChild(this.container);
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
        this.colorChanger.addEventListener("change", () => this.runColorChanger(parseInt(this.colorChanger.value)));
        //this.colorChanger.addEventListener("mousemove", () => this.runColorChanger(parseInt(this.colorChanger.value)));
        this.functionOnClickedCanvas = (e) => this.onClickedCanvasPixel(e);
        this.colorPalette.addEventListener('mousedown', (e) => {
            this.activateMouseMove();
            this.onClickedCanvasPixel(e);
        });
        this.colorPalette.addEventListener('mouseup', () => this.deactivateMouseMove());
        this.colorPalette.addEventListener('mouseout', () => this.deactivateMouseMove());
    }
    runColorChanger(colorChangerPosition) {
        let returnedColorChanger = colorChanger(colorChangerPosition);
        this.setColorPaletteColor(returnedColorChanger);
        this.drawColorPalette(this.paletteColor.toRgb());
        this.setColorSample(this.colorSamplePositionX, this.colorSamplePositionY);
        this.drawColorSample();
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
}