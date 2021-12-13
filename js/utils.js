// import { < export func names>} form './module_path.js'

// import tabulator from "./tabulator-master/src/js/core/Tabulator";
//
// const t = tabulator;


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
    // TODO: validate file_type is csv

    let csv_file = ev.dataTransfer.files[0];
    let csv_file_as_str = ev.dataTransfer.files[0]
    console.log(csv_file, csv_file.type);
    console.log(csv_file_as_str, csv_file_as_str.type);
    var json_file = csv_to_json(csv_file_as_str);
    console.log(json_file);

    var table = new Tabulator(json_file);

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

//var csv is the CSV file with headers
function csv_to_json(csv_file_as_str){
    console.log(csv_file.type)

    // var lines=csv_file.split("\n");
    let config={
        delimiter: ",",	// auto-detect
        newline: "\n\r",	// auto-detect
        complete: undefined,

    }
    var lines=Papa.parse(csv_file);

    var result = [];

    var headers=lines[0].split(",");

    for(var i=1;i<lines.length;i++){

        var obj = {};
        var currentline=lines[i].split(",");

        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}

function callback_complete_parsing(){
    console.log("Done parsing")
}




