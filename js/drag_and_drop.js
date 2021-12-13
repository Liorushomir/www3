


let entered_dropzone_counter=0 //used to prevent opacity from changing when "leaving dragzone because entering children"





/* events fired on the draggable target */

csv_dropzone.addEventListener("dragover", (event) => {
    // highlight potential drop target when the draggable element enters it
    event.preventDefault()
    event.target.style.opacity = '0.5';
});

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
    //csv_dropzone.style.opacity=1;


    let files = event.dataTransfer.files
    if(files.length > 1){
        alert("You must upload a single file!")
        return
    }
    let file = files[0]
    if(!file.name.endsWith(".csv")){
        alert("The uploaded file must be a csv file!")
        return
    }
    g_raw_csv_file = file
    Papa.parse(file, {
        header: true, complete: function (results) {
            g_csv_file = results
            switch_to_main_page()
        }
    });
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
