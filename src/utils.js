export function padLeft(word, expectedChars, fill) {
    let returnedWord = word;
    while (returnedWord.length < expectedChars) {
        returnedWord = fill + returnedWord;
    }
    return returnedWord;
}

export function drawGradient(setGradient, contextColorPalette, size) {
    console.log(size);
    if (setGradient.direction === 'horizontal') {
        // if (size == "small")
        var gradient = contextColorPalette.createLinearGradient(0, 0, size, 0);
        // if (size == 'normal')
        //     var gradient = contextColorPalette.createLinearGradient(0, 0, 255, 0);
    }
    if (setGradient.direction === 'vertical') {
        // if (size == "small")
        //     var gradient = contextColorPalette.createLinearGradient(0, 0, 0, 155);
        // if (size == 'normal')
        var gradient = contextColorPalette.createLinearGradient(0, 0, 0, size);
    }
    gradient.addColorStop(setGradient.from.distance, setGradient.from.color);
    gradient.addColorStop(setGradient.to.distance, setGradient.to.color);
    contextColorPalette.fillStyle = gradient;
    // if (size == "small")
    //     contextColorPalette.fillRect(0, 0, 155, 155);
    // if (size == 'normal')
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
    let r, g, b;
    if (colorChangerPosition <= 255) {
        r = 255;
        g = 0;
        b = colorChangerPosition;
    }
    if ((255 < colorChangerPosition) && (colorChangerPosition <= 510)) {
        r = 510 - colorChangerPosition;
        g = 0;
        b = 255;
    }
    if ((510 < colorChangerPosition) && (colorChangerPosition <= 765)) {
        r = 0;
        g = colorChangerPosition - 510;
        b = 255;
    }
    if ((765 < colorChangerPosition) && (colorChangerPosition <= 1020)) {
        r = 0;
        g = 255;
        b = 1020 - colorChangerPosition;
    }
    if ((1020 < colorChangerPosition) && (colorChangerPosition <= 1275)) {
        r = colorChangerPosition - 1020;
        g = 255;
        b = 0;
    }
    if ((1275 < colorChangerPosition) && (colorChangerPosition <= 1530)) {
        r = 255;
        g = 1530 - colorChangerPosition;
        b = 0;
    }

    return {
        red: r,
        green: g,
        blue: b,
    }
}