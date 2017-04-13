export function createRoot(root) {
    return document.getElementById(root);
}
export function createContainer() {
    let container = document.createElement('div');
    container.className = "container";
    return container;
}
export function createPickerContainer() {
    let pickerContainer = document.createElement('div');
    pickerContainer.className = "pickerContainer";
    return pickerContainer;
}
export function createColorPalette(size) {
    let colorPalette = document.createElement('canvas');
    colorPalette.className = "colorPalette";
    colorPalette.width = size;
    colorPalette.height = size;
    return colorPalette;
}
export function createColorPreview(className) {
    let colorPreview = document.createElement('div');
    colorPreview.classList.add(className);
    colorPreview.classList.add("colorPreview");
    return colorPreview;
}
export function createSideContainer() {
    let sideContainer = document.createElement('div');
    sideContainer.className = "sideContainer";
    return sideContainer;
}
export function createColorValues(className) {
    let colorValues = document.createElement('div');
    colorValues.classList.add(className);
    colorValues.classList.add("colorValues");
    return colorValues;
}
export function createAndAddColorValueInput(colorValues, config) {
    let divElement = document.createElement('div');
    divElement.className = config.divClassName;
    colorValues.appendChild(divElement);

    let label = document.createElement('label');
    label.for = config.labelFor;
    label.textContent = config.labelTextContent;
    divElement.appendChild(label);

    let Input = document.createElement('input');
    Input.className = config.inputClassName;
    Input.readOnly = false;
    Input.type = "text";
    divElement.appendChild(Input);
    return Input;
}
export function createColorChanger(className) {
    let colorChanger = document.createElement('input');
    colorChanger.classList.add(className);
    colorChanger.classList.add("colorChanger");
    colorChanger.type = "range";
    colorChanger.min = "1";
    colorChanger.max = "360";
    colorChanger.step = "1";
    colorChanger.value = 1;
    return colorChanger;
}