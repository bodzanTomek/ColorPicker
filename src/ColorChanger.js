export default class ColorChanger {
    constructor(colorChangerPosition) {
        if (colorChangerPosition <= 255) {
            this.red = 255;
            this.green = 0;
            this.blue = colorChangerPosition;
        }
        if ((255 < colorChangerPosition) && (colorChangerPosition <= 500)) {
            this.red = 500 - colorChangerPosition;
            this.green = 0;
            this.blue = 255;
        }
        if ((500 < colorChangerPosition) && (colorChangerPosition <= 750)) {
            this.red = 0;
            this.green = colorChangerPosition - 500;
            this.blue = 255;
        }
        if ((750 < colorChangerPosition) && (colorChangerPosition <= 1000)) {
            this.red = 0;
            this.green = 255;
            this.blue = 1000 - colorChangerPosition;
        }
        if ((1000 < colorChangerPosition) && (colorChangerPosition <= 1250)) {
            this.red = colorChangerPosition - 1000;
            this.green = 255;
            this.blue = 0;
        }
        if ((1250 < colorChangerPosition) && (colorChangerPosition <= 1500)) {
            this.red = 255;
            this.green = 1500 - colorChangerPosition;
            this.blue = 0;
        }
    }
}