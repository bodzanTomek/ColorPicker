import ColorPickerSmall from './ColorPickerSmall';
import ColorPickerNormal from './ColorPickerNormal';

window.addEventListener('load', () => {
    console.log("aaa");
    new ColorPickerSmall({
        id: "colorPicker",
    })
    new ColorPickerNormal({
        id: "colorPicker2",
    })
});