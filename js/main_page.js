



const table = new Tabulator("#data_table_div", {
    //data:tabledata, //assign data to table
    autoColumns:true, //create columns from data field names
    layout:"fitColumns",
    pagination:"local",

    columns: [
        {
            title:'Name',
            field:"name",
            formatter:'plaintext ',
            headerFilter:true

        },
        {
            title:'Host ID',
            field:'host_id',
            formatter:'plaintext '
        },
        {
            title:'ID',
            field:'id',
            formatter:'plaintext '
        },
        {
            title:'Neighbourhood',
            field:'neighbourhood',
            formatter:'plaintext '
        },
        {
            title:'Room Type',
            field:'room_type',
            formatter:'plaintext '

        },
        {
            title:'Price',
            field:'price',
            formatter:'money',
            formatterParams:{symbol:'$', symbolAfter:true}
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


window.addEventListener('resize', function(){
    table.redraw();
});



