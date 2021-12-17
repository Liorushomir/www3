
let g_csv_file = undefined
let g_raw_csv_file = undefined
const csv_dropzone = document.getElementById('csv_dropzone')
const dropzone_wrapper = document.getElementsByClassName('dropzone_wrapper')[0]
const csv_dropzone_visual_elems = document.querySelectorAll('.csv_dropzone_visuals');
const goto_upload_btn =  document.getElementById('goto_upload_view_btn')
const download_csv_btn =  document.getElementById('download_csv_btn')
const tabple_map_wrapper = document.getElementsByClassName('table_map_wrapper')[0]

const display = 'display'
const remove = 'remove'


function setMainMenuDisplay(display) {
    let mainMenuElements = document.getElementsByClassName('mainMenu');
    for (let i = 0; i < mainMenuElements.length; i++) {
        mainMenuElements[i].style.display = 'table';
    }

    if (display === "block"){
        let table = document.getElementById('data_table_div')
            .style.display = 'block'
        let map_div = document.getElementById('map_div')
        map_div.style.display = 'table'

        let popup = document.getElementById('popup')
            .style.display = 'table'
    }
    air_bnb_table.replaceData(g_csv_file.data).then(function() {
        air_bnb_table.setPageSize(10);
        map.resize()


        for(const row of air_bnb_table.getData()){
            let x = row['longitude']
            let y = row['latitude']

            if(isNaN(x) || isNaN(y)){
                continue
            }

            const el = document.createElement('div')
            el.className='marker'


            new mapboxgl.Marker(el).setLngLat([x,y]).addTo(map)
        }

        let first_row = air_bnb_table.getData().find(el=> !isNaN(el['latitude']) && !isNaN(el['longitude']))
        map.jumpTo({center:[first_row['longitude'], first_row['latitude']], zoom:14})

    })
        .catch(function(error){
            console.log(error)
        })

    let popup_card = document.getElementById('popup');
    popup_card.style.display="flex"
    popup_card.innerHTML = "Pick a place to go to :)"
}

function setDropZoneDisplay(display) {
    let dropZoneElementsdocument = document.getElementsByClassName('dropzone')
    for (let i = 0; i < dropZoneElementsdocument.length; i++) {
        dropZoneElementsdocument[i].style.display = display;
        dropZoneElementsdocument[i].style.opacity = '1';
    }
    entered_dropzone_counter = 0
}

function switch_to_table_map_display(){
    // setMainMenuDisplay('block');
    // setDropZoneDisplay('none');
    set_drag_and_drop_page(remove);
    set_map_and_table_page(display);

}

function switch_to_drag_and_drop_page(){
    // setMainMenuDisplay('none');
    // setDropZoneDisplay('block');
    set_map_and_table_page(remove);
    set_drag_and_drop_page(display);
    g_csv_file = undefined;

}


function set_drag_and_drop_page(display_setting){
    if (display_setting === display){
        dropzone_wrapper.style.display = "grid";
        csv_dropzone.style.opacity = 1;
        entered_dropzone_counter = 0;
    }
    else if (display_setting === remove){
        dropzone_wrapper.style.display = "none";
    }
    else{
        alert("Something is very wrong! This is a test, lease ignore");
        console.log("display_setting is invalid");
    }
}

function set_map_and_table_page(display_setting){
    if (display_setting === display){
        tabple_map_wrapper.style.display = "grid";
        display_buttons()
        display_table()
        display_map()
        display_popup()
    }
    else if (display_setting === remove){
        tabple_map_wrapper.style.display = "none"
    }
    else{
        alert("Something is very wrong! This is a test, lease ignore")
        console.log("display_setting is invalid")
    }
}


function display_table(){
    air_bnb_table.replaceData(g_csv_file.data).then(function() {
        air_bnb_table.setPageSize(10);
        map.resize()

        for(const row of air_bnb_table.getData()){
            let x = row['longitude']
            let y = row['latitude']

            if(isNaN(x) || isNaN(y)){
                continue
            }

            const el = document.createElement('div')
            el.className='marker'


            new mapboxgl.Marker(el).setLngLat([x,y]).addTo(map)
        }

        let first_row = air_bnb_table.getData().find(el=> !isNaN(el['latitude']) && !isNaN(el['longitude']))
        map.jumpTo({center:[first_row['longitude'], first_row['latitude']], zoom:14})

    })
        .catch(function(error){
            console.log(error)
        })
}

function display_map(){

}

function display_popup(){
    let popup_card = document.getElementById('popup');
    popup_card.innerHTML = "Pick a place to go to :)"
}

function display_buttons(){

}