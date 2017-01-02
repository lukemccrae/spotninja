//this function runs as soon as the page loads. it shows a map zoomed out.
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 39.7576958,
            lng: -105.00724629999999
        },
        zoom: 2
    });
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });
}

//this function returns location data to create the heatmap
function getPoints() {
    return [
        new google.maps.LatLng(38.826165, -104.823676),
        new google.maps.LatLng(38.826160, -104.823661),
        new google.maps.LatLng(38.826160, -104.823662),
        new google.maps.LatLng(38.826160, -104.823663),
        new google.maps.LatLng(38.826160, -104.823666)
    ]
};

$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        latPosition = position.coords.latitude;
        longPosition = position.coords.longitude;
        $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latPosition + ',' + longPosition + '&key=AIzaSyB6mjYhp5ca_RPpOdHu_Ul7E-YY6BYzmms')
            .done(function(data) {
                console.log(data);
            })
            .fail(function(error) {
                console.log(error);
            })
        initialize();
        console.log(latPosition, longPosition);
    })
    var heatmap;

    //this function creates the map with the heatmap included. It runs after the document is loaded and the
    // geolocation function has returned coordinates for the users current location
    function initialize() {
        var myLatLng = new google.maps.LatLng(latPosition, longPosition);
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: latPosition,
                lng: longPosition
            },
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        heatmap = new google.maps.visualization.HeatmapLayer({
            data: getPoints(),
            map: map
        });
        var userMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: 'spotninja.png'
        });
    }

    function fail() {
        alert('navigator.geolocation failed, may not be supported');
    }
})
