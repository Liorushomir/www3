// import { < export func names>} form './module_path.js'


// TODO: returns csv if file is validated else undefined

function test_func(){
    console.log("TESTING")
}

/*
export function validate_dropped_file(ev) {
    //1. validate only 1 file was dropped
    //2. file mime-type is csv, maybe xls too (there is a functions for that)
    //3. maybe file contains specific headers

    if (ev.dataTransfer.files.length > 1) {

        console.log("Cannot add more than one item");
        return undefined;
    }
    var csv_file = get_csv_file(ev);


    return csv_file;
}*/

function get_csv_file(ev){
    let csv_file = ev.dataTransfer.files[0];
    console.log(csv_file, csv_file.type);
    return csv_file;
}

/*
export function reduceOpacity(ev){
    ev.target.style.opacity = 0.5;
}

export function resetOpacity(ev){
    ev.target.style.opacity = 1;
}
*/

//var csv is the CSV file with headers
function csv_to_json(csv_file_as_str){
    console.log(csv_file.type)

    // var lines=csv_file.split("\n");
    //src: https://www.papaparse.com/docs#config
    let config={
        //configuration for the parsing,
        // not sure in anything else needs to be added
        delimiter: ",",	// auto-detect
        newline: "\n\r",	// auto-detect
        complete: callback_complete_parsing,

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




