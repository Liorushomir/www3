goto_upload_btn.addEventListener('click', ev => {
    ev.preventDefault()
    clearpopupCard()
    switch_to_drag_and_drop_page()
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






