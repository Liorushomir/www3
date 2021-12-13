import {validate_dropped_file} from "./utils";

var dragged;

/* events fired on the draggable target */
document.addEventListener("drag", (event) => {

});

document.addEventListener("dragstart", (event) =>{
    // store a ref. on the dragged elem
    console.log("Started dragging")
    dragged = event.target;
    // make it half transparent
    reduceOpacity(event)
});

document.addEventListener("dragend", (event) => {
    // reset the transparency
    resetOpacity(event);

});

/* events fired on the drop targets */
document.addEventListener("dragover", (event) => {
    // prevent default to allow drop
    event.preventDefault();
    console.log("Dragging over drop zone")
});

document.addEventListener("dragenter", (event) => {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className === "dropzone") {
        reduceOpacity(event);
    }

});

document.addEventListener("dragleave", (event) => {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className === "dropzone") {
        resetOpacity(event);
    }

});

document.addEventListener("drop", (event)=> {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className === "dropzone") {
        event.target.style.background = "";
        dragged.parentNode.removeChild( dragged );
        event.target.appendChild( dragged );
        console.log("Dropped file")
        let csv_file = validate_dropped_file(ev)
        console.log(csv_file.type, csv_file)
    }
    else{
        console.log("Failed to drop")
    }
});

