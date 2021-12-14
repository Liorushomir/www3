const table = new Tabulator("#data_table_div", {
    //data:tabledata, //assign data to table
    autoColumns:true, //create columns from data field names
    layout:"fitColumns",
    pagination:"local",

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
table.setFilter("name", "!=", "")