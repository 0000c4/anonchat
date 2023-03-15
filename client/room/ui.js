let colorCount = 0;
function changeNameColor(elem) {
    let colors = [
        "black",
        "Gray",
        "Fuchsia",
        "Purple",
        "Red",
        "Maroon",
        "Olive",
        "Lime",
        "Green",
        "Aqua",
        "Teal",
        "Blue",
        "Navy"]
    colorCount++;
    if(colorCount == colors.length -1){colorCount = 0;}
    elem.style.backgroundColor = colors[colorCount]
}
