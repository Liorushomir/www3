const air_bnb_table = new Tabulator("#data_table_div", {
    //data:tabledata, //assign data to table
    autoColumns:true, //create columns from data field names
    layout:"fitColumns",
    pagination:"local",
    selectable:1,

    rowDeSelected:function(row){rowUnSelected(row)},
    rowSelected:function(row){rowSelected(row)},

    columns: [
        {
            title:'Name',
            field:"name",
            headerFilter:true

        },
        {
            title:'Host ID',
            field:'host_id',
        },
        {
            title:'ID',
            field:'id',
        },
        {
            title:'Neighbourhood',
            field:'neighbourhood',
        },
        {
            title:'Room Type',
            field:'room_type',

        },
        {
            title:'Price',
            field:'price',
            formatter:'money',
            formatterParams:{symbol:'$', symbolAfter:true}
        }
    ]
});

//filters blank lines
air_bnb_table.setFilter(function(data, filterParams) {
    return !(data.name===undefined)
   // return true
})

window.addEventListener('resize', function(){
    air_bnb_table.redraw();
});

function rowSelected(row){
    console.log("New row selected");
    let row_data = row.getData()
    let x = row_data['longitude']
    let y = row_data['latitude']

    if (x === undefined || y === undefined || x === "none" || y === "none"){
        removeAllPopups()
        return;
    }
    map.flyTo({center:[x,y], essential:true, zoom:14})



    removeAllPopups()

    let popup_html = ""
    // let columns = table.getColumns()
    popup_html = popup_html+ "<b><u>"+ "name" + "</b></u>" + ": " + row_data["name"] + "<br>"

    let offsetHeight = document.getElementById('map_div').offsetHeight;

    /* create popup with name of spot */
    const popup_map = new mapboxgl.Popup({ closeOnClick: true, anchor:'right' })
        .setLngLat([x, y])
        .setHTML(popup_html)
        .addTo(map);


    console.log("Should pop up")
    fillInfopopupCard(row)
}

function fieldToName(field){
    let res = field.charAt(0).toUpperCase() + field.slice(1);
    res = res.replaceAll("_", " ")

    return res
}

function valueDisplay(value, key){
    let res = value.charAt(0).toUpperCase() + value.slice(1);
    res = res.replaceAll("_", " ")
    if (key === 'price'){
        res+='$'
    }
    return res
}

function rowUnSelected(row){


}


function fillInfopopupCard(row){
    console.log("fill card")
    let popup_card = document.getElementById('popup');
    popup_card.innerHTML = "<b><u>Info card</b></u>"
    const info = row.getData()
    for (let key in info) {
        let value = info[key];
        if (key === ""){
            continue;
        }
        popup_card.innerHTML += "<li><b><u>" + fieldToName(key) + "</u></b> : " + valueDisplay(value, key) + "</li>"
    }
}

function initiatePopupCard(){
    let popup_card = document.getElementById('popup')
    popup_card.innerHTML = "<b>Pick a place to go :)</b>";


}