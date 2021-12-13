

let entered_dropzone_counter=0 //used to prevent opacity from changing when "leaving dragzone because entering children"

const csv_dropzone = document.getElementById('csv_dropzone')
const csv_dropzone_visual_elems = document.querySelectorAll('.csv_dropzone_visuals');





/* events fired on the draggable target */


csv_dropzone.addEventListener("dragenter", (event) => {
    // highlight potential drop target when the draggable element enters it
    event.preventDefault()
    entered_dropzone_counter++
    event.target.style.opacity = '0.5';
});

csv_dropzone.addEventListener("dragleave", (event) => {
    // reset background of potential drop target when the draggable element leaves it
    event.preventDefault()
    console.log("dragleave")
    entered_dropzone_counter--

    if(entered_dropzone_counter === 0){
        event.target.style.opacity = '1';

    }
});

csv_dropzone.addEventListener("drop", (event)=> {
    // prevent default action (open as link for some elements)
    event.preventDefault()
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

csv_dropzone_visual_elems.forEach(el => el.addEventListener('dragleave', event => {
    event.preventDefault()
    entered_dropzone_counter--
}));

csv_dropzone_visual_elems.forEach(el => el.addEventListener('dragenter', event => {
    event.preventDefault()
    entered_dropzone_counter++

}));

csv_dropzone_visual_elems.forEach(el => el.addEventListener('dragover', event => {
    event.preventDefault()

}));
