
let g_csv_file = undefined
let g_raw_csv_file = undefined
const csv_dropzone = document.getElementById('csv_dropzone')
const csv_dropzone_visual_elems = document.querySelectorAll('.csv_dropzone_visuals');
const goto_upload_btn =  document.getElementById('goto_upload_view_btn')
const download_csv_btn =  document.getElementById('download_csv_btn')

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
    table.replaceData(g_csv_file.data).then(function() {
        table.setPageSize(10);
        map.resize()


        for(const row of table.getData()){
            let x = row['longitude']
            let y = row['latitude']

            if(isNaN(x) || isNaN(y)){
                continue
            }

            const el = document.createElement('div')
            el.className='marker'


            new mapboxgl.Marker(el).setLngLat([x,y]).addTo(map)
        }

        let first_row = table.getData().find(el=> !isNaN(el['latitude']) && !isNaN(el['longitude']))
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

function switch_to_main_page(){
    setMainMenuDisplay('block');
    setDropZoneDisplay('none');
}

function switch_to_upload_page(){
    setMainMenuDisplay('none');
    setDropZoneDisplay('block');
    g_csv_file = undefined


}