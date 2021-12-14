





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



