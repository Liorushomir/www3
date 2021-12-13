
var tabledata = [
    {id:1, name:"Oli Bob", progress:12, gender:"male", rating:1, col:"red", dob:"19/02/1984", car:1},
    {id:2, name:"Mary May", progress:1, gender:"female", rating:2, col:"blue", dob:"14/05/1982", car:true},
    {id:3, name:"Christine Lobowski", progress:42, gender:"female", rating:0, col:"green", dob:"22/05/1982", car:"true"},
    {id:4, name:"Brendon Philips", progress:100, gender:"male", rating:1, col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", progress:16, gender:"female", rating:5, col:"yellow", dob:"31/01/1999"},
    {id:6, name:"Frank Harbours", progress:38, gender:"male", rating:4, col:"red", dob:"12/05/1966", car:1},
];


const table = new Tabulator("#data_table_div", {
    //data:tabledata, //assign data to table
    autoColumns:true, //create columns from data field names
    layout:"fitColumns",
    columns: [
        {
            title:'Name',
            field:"name"
         },
        {
            title:'Host ID',
            field:'host_id'
        },
        {
            title:'ID',
            field:'id'
        },
        {
            title:'Neighbourhood',
            field:'neighbourhood'
        },
        {
            title:'Room Type',
            field:'room_type'
        },
        {
            title:'Price',
            field:'price'
        }

    ]
});

goto_upload_btn.addEventListener('click', ev => {
    ev.preventDefault()
    switch_to_upload_page()
})

download_csv_btn.addEventListener('click', ev => {
    ev.preventDefault()
    const blob = new Blob([g_raw_csv_file]);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download='totally_not_a_virus.csv'
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
})






