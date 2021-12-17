
let g_csv_file = undefined
let g_raw_csv_file = undefined
const csv_dropzone = document.getElementById('csv_dropzone')
const dropzone_wrapper = document.getElementsByClassName('dropzone_wrapper')[0]
const csv_dropzone_visual_elems = document.querySelectorAll('.csv_dropzone_visuals');
const goto_upload_btn =  document.getElementById('upload_another_file_btn')
const download_csv_btn =  document.getElementById('download_csv_btn')
const table_map_wrapper = document.getElementsByClassName('table_map_wrapper')[0]

const display = 'display'
const remove = 'remove'
function switchToTableMapDisplay(){
    set_drag_and_drop_page(remove);
    set_map_and_table_page(display);
}

function switch_to_drag_and_drop_page(){
    set_map_and_table_page(remove);
    set_drag_and_drop_page(display);
    g_csv_file = undefined;

}


function set_drag_and_drop_page(display_setting){
    if (display_setting === display){
        dropzone_wrapper.style.display = "grid";
        csv_dropzone.style.opacity = 1;
        entered_dropzone_counter = 0;
        let body = document.getElementsByTagName('body')[0]
        body.style.overflowY = 'hidden'
        csv_dropzone.style
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
        table_map_wrapper.style.display = "grid";
        display_table()
        initiatePopupCard()
        let body = document.getElementsByTagName('body')[0]
        body.style.overflowY = 'auto'
    }
    else if (display_setting === remove){
        table_map_wrapper.style.display = "none"
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

