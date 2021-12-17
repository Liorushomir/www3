





mapboxgl.accessToken = 'pk.eyJ1IjoiaGVjaHRjYXJtZWwiLCJhIjoiY2t4NWJkZDdhMTU5eTJubzEycjhmYzd6aCJ9.dClL8NgKwVlXwbQzIk2Akg';
let map = new mapboxgl.Map({
    container: 'map_div',
    style: 'mapbox://styles/mapbox/streets-v11'
});

function removeAllPopups() {
    const popups = document.getElementsByClassName("mapboxgl-popup");
    for (let popup of popups) {
        popup.remove();
    }
    clearPopupCard();
}

map.on('dragstart', ()=> {
    removeAllPopups();
    let selected_row = air_bnb_table.getSelectedRows()[0];
    air_bnb_table.deselectRow(selected_row);
})

