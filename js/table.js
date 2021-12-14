const table = new Tabulator("#data_table_div", {
    //data:tabledata, //assign data to table
    autoColumns:true, //create columns from data field names
    layout:"fitColumns",
    pagination:"local",
    selectable:1,

    rowSelected:function(row){rowUnSelected(row)},
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
table.setFilter(function(data, filterParams) {
    return !(data.name===undefined)
   // return true
})

function rowSelected(row){

    let row_data = row.getData()
    let x = row_data['longitude']
    let y = row_data['latitude']

    map.flyTo({center:[x,y], essential:true, zoom:14})



    removeAllPopups()

    let popup_html = ""
    let columns = table.getColumns()


    for(let field of g_csv_file.meta.fields){
        if(field == ""){
            continue
        }
        popup_html = popup_html+ field + " : " + row_data[field] + "<br>"
    }

    /*
    for(column of columns){
        let title = column.getDefinition().title
        let field = column.getDefinition().field

        popup_html = popup_html+ title + " : " + row_data[field] + "\n"
    }*/
    let offsetHeight = document.getElementById('map_div').offsetHeight;
    const popup = new mapboxgl.Popup({ closeOnClick: true, anchor:'center' })
        .setLngLat([x, y])
        .setHTML(popup_html)
        .addTo(map);

}

function rowUnSelected(row){


}
