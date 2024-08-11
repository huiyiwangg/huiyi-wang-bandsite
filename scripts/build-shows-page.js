import BandSiteApi from "../scripts/band-site-api.js";

let thing = new BandSiteApi();

const showEl = createDiv('shows__card');

async function fetchAndRenderShows(){
    const shows = await thing.getShows();

    function render() {
        listEl.innerText = '';
        shows.forEach(displayShow);
    } 
    
    render();    
}
fetchAndRenderShows()


function createDiv(className, text = "") {
    const div = document.createElement("div");
    div.className = className;
    div.innerText = text;
    return div;
}

const listEl=document.getElementsByClassName('shows__container')[0];

function displayShow(show) {

    const dateContainer = createDiv('shows__sub-container');
    const dateTitleEl = createDiv('shows__subtitle','DATE');
    const dateEl = createDiv('shows__date', show.date);
    

    const venueContainer = createDiv('shows__sub-container');
    const venueTitleEl = createDiv('shows__subtitle','VENUE');
    const venueEl = createDiv('shows__venue', show.venue);

    const locationContainer = createDiv('shows__sub-container');
    const locationTitleEl = createDiv('shows__subtitle','LOCATION');
    const locationEl = createDiv('shows__location', show.location);
    

    const buttonEl = document.createElement('button');
    buttonEl.innerHTML = 'BUY TICKETS';
    

    listEl.append(showEl);

    dateContainer.append(dateTitleEl);
    dateContainer.append(dateEl);
    showEl.append(dateContainer);

    venueContainer.append(venueTitleEl);
    venueContainer.append(venueEl);
    showEl.append(venueContainer)

    locationContainer.append(locationTitleEl);
    locationContainer.append(locationEl);
    showEl.append(locationContainer);

    showEl.append(buttonEl);

}



// function render() {
//     listEl.innerHTML = '';
//     shows.forEach(displayShow);
// } 

// render();

