// ------------------------------------------------------- //
//  Styled Leaflet Map
// ------------------------------------------------------ //

"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const mapElem = document.getElementById("contactMap");

    if (mapElem) {
        var lat = document.getElementById('gmap-lat').value;
        var lng = document.getElementById('gmap-lng').value;
        var image = document.getElementById('gmap-marker').value;

        var map = L.map("contactMap", {
            center: [lat, lng],
            zoom: 13,
            scrollWheelZoom: false,
        });

        var tiles = new L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}", {
            attribution:
                'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: "abcd",
            minZoom: 0,
            maxZoom: 20,
            ext: "png",
        }).addTo(map);

        var dragging = false,
            tapping = false;

        if (window.innerWidth > 700) {
            dragging = true;
            tapping = true;
        }

        var customIcon = L.icon({
            iconUrl: image,
            iconSize: [25, 40],
        });

        var marker = L.marker([lat, lng], {
            draggable: dragging,
            tap: tapping,
            icon: customIcon,
            opacity: 1,
        });

        marker
            .addTo(map);
    }
});
