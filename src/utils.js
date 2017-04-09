import Color from './Color';

export function padLeft(word, expectedChars, fill) {
    let returnedWord = word;
    while (returnedWord.length < expectedChars) {
        returnedWord = fill + returnedWord;
    }
    return returnedWord;
}

export function drawGradient(setGradient, contextColorPalette, size) {
    if (setGradient.direction === 'horizontal') {
        var gradient = contextColorPalette.createLinearGradient(0, 0, size, 0);
    }
    if (setGradient.direction === 'vertical') {
        var gradient = contextColorPalette.createLinearGradient(0, 0, 0, size);
    }
    gradient.addColorStop(setGradient.from.distance, setGradient.from.color);
    gradient.addColorStop(setGradient.to.distance, setGradient.to.color);
    contextColorPalette.fillStyle = gradient;
    contextColorPalette.fillRect(0, 0, size, size);
}


export function drawColorSample(config) {
    config.context.beginPath();
    config.context.arc(config.positionX, config.positionY, 8, 0, 10 * Math.PI);
    config.context.strokeStyle = "white";
    config.context.fillStyle = config.color;
    config.context.lineWidth = 6;
    config.context.stroke();
    config.context.fill();
}

export function colorChanger(colorChangerPosition) {
    let color = Color.fromHsl({ h: colorChangerPosition, s: 100, l: 50 });
    return {
        red: color.rgb.red,
        green: color.rgb.green,
        blue: color.rgb.blue,
    }
}