
let g_csv_file = undefined
const csv_dropzone = document.getElementById('csv_dropzone')
const csv_dropzone_visual_elems = document.querySelectorAll('.csv_dropzone_visuals');
const goto_upload_btn =  document.getElementById('goto_upload_view_btn')
function switch_to_main_page(){
    csv_dropzone.style.display='none'
    document.getElementById('goto_upload_view_btn').style.display='block'
}

function switch_to_upload_page(){
    csv_dropzone.style.display='block'
    goto_upload_btn.style.display='none'
}