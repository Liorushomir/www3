


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
    console.log("dragenter")
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
        alert("You must upload a single file!");
        return;
    }
    let file = files[0]
    if(!file.name.endsWith(".csv")){
        alert("The uploaded file must be a csv file!");
        return;
    }
    g_raw_csv_file = file
    Papa.parse(file, {
        header: true, complete: function (results) {
            g_csv_file = results;
            console.log(results);
            if (validate_headers(results)){
                switch_to_main_page();
            }
            else{
                alert("The uploaded file does nto fit the AirBnB format!");
            }

        }
    });


});

csv_dropzone_visual_elems.forEach(el => el.addEventListener('dragleave', event => {
    if (event.dataTransfer.files === undefined){
        console.log("No fiels attached")
        return;
    }
    event.preventDefault();

    entered_dropzone_counter--;
}));

csv_dropzone_visual_elems.forEach(el => el.addEventListener('dragenter', event => {
    if (event.dataTransfer.files === undefined){
        console.log("No fiels attached")
        return;
    }
    event.preventDefault();
    entered_dropzone_counter++;

}));

csv_dropzone_visual_elems.forEach(el => el.addEventListener('dragover', event => {
    event.preventDefault();

}));

function validate_headers(json_file){
    console.log(json_file)
    let headers = [
        "", "id","name","host_id","host_name","neighbourhood_group",
        "neighbourhood", "latitude","longitude","room_type","price",
        "minimum_nights","number_of_reviews", "last_review",
        "reviews_per_month","calculated_host_listings_count",
        "availability_365",
    ]
    let keys = Object.keys(json_file.data[0]);
    for (let i = 0; i < headers.length; i++){
        let found_key = false;
        for (let j = 0; j < headers.length && !found_key; j++){
            found_key = (headers[i] === keys[j]);
        }
        if (!found_key){
            alert("missing key \"" + headers[i] + "\"");
            return false;
        }
    }
    return true;
}