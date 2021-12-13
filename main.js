// import {tabulator} form
//DRAG&DROP
function allowDrop(ev) {
    ev.preventDefault();
    console.log("allowing drop")
    // file = ev.file
    // console.log(file)
}

function onDragHandler(ev) {
    ev.preventDefault();
    console.log('File(s) in drop zone');
    // ev.dataTransfer.setData("text", ev.target.id);
}

function dropHandler(ev) {
    ev.preventDefault();
    console.log("handling drop")
    ev.target.style.opacity = 1;
    if (ev.dataTransfer.files.length > 1){

        console.log("Cannot add more than one item");
        return;
    }
    let csvfile = ev.dataTransfer.files[0]

    console.log(csvfile)
    show_image(csvfile)

}
function reduceOpacity(ev){
    ev.target.style.opacity = 0.5;
}

function resetOpacity(ev){
    ev.target.style.opacity = 1;
}

//Button load

function onclickHandler(ev){
    console.log("Waiting to load file")
}












function imageHandler(e2) {
    var store = document.getElementById('imgstore');
    store.innerHTML = '<img src="' + e2.target.result + '">';
}

function loadimage(e1)
{
    var filename = e1.target.files[0];
    var fr = new FileReader();
    fr.onload = imageHandler;
    fr.readAsDataURL(filename);
}

function show_image(image_input) {
    console.log("Showing image")
    let reader = new FileReader();
    reader.readAsDataURL(image_input)
    let uploaded_image = reader.result;
    console.log(image_input);
    console.log(reader);
    reader.onload = function(e){
        // let fileURL = reader.result;
        console.log(reader.result);
    }
    var fileURL = reader.result;
    document.write("img src="+ reader +">")

}