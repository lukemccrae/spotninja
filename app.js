function initMap(latPosition, longPosition) {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 39.7576958,
            lng: -105.00724629999999
        },
        zoom: 2
    });
}

$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        latPosition = position.coords.latitude;
        longPosition = position.coords.longitude;
        $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latPosition + ',' + longPosition + '&key=AIzaSyB6mjYhp5ca_RPpOdHu_Ul7E-YY6BYzmms')
            .done(function(data) {
                console.log(data);
                $('#greeting').append(data.results[5].formatted_address);
            })
            .fail(function(error) {
                console.log(error);
            })
        var panPoint = new google.maps.LatLng(latPosition, longPosition);
        map.panTo(panPoint)
        map.setZoom(17);
        initialize();
        console.log(latPosition, longPosition);
    })

    var heatmap;

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });


    function toggleHeatmap() {
        heatmap.setMap(heatmap.getMap() ? null : map);
    }

    function changeGradient() {
        var gradient = [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)'
        ]
        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
    }

    function changeRadius() {
        heatmap.set('radius', heatmap.get('radius') ? null : 20);
    }

    function changeOpacity() {
        heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
    }

    function getPoints() {
        return [
            new google.maps.LatLng(39.7576958, -105.006),
            new google.maps.LatLng(39.7576958, -105.0075),
            new google.maps.LatLng(39.7576958, -105.004),
            new google.maps.LatLng(39.7576958, -105.04),
            new google.maps.LatLng(39.7576958, -105.006),
            new google.maps.LatLng(39.7576958, -105.0075),
            new google.maps.LatLng(39.7576958, -105.004),
            new google.maps.LatLng(39.7576958, -105.04),
            new google.maps.LatLng(39.7576958, -105.006),
            new google.maps.LatLng(39.7576958, -105.0075),
            new google.maps.LatLng(39.7576958, -105.004),
            new google.maps.LatLng(39.7576958, -105.04),
            new google.maps.LatLng(39.7576958, -105.002)
        ]
    }

    39.7576958, -105.00724629999999


    // function initialize() {
    //     var currentPosition =
    //         map = new google.maps.Map(document.getElementById('map'), {
    //             center: currentPosition,
    //             zoom: 14
    //         });
    //     var request = {
    //         location: pyrmont,
    //         radius: '800',
    //         types: ['bar']
    //     };
    //     service = new google.maps.places.PlacesService(map);
    //     service.nearbySearch(request, callback);
    // }

    function initialize(position) {
        var myLatLng = new google.maps.LatLng(latPosition, longPosition);
        var mapOptions = {
            zoom: 17,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById('map'),
            mapOptions);
        var userMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: 'spotninja.png'
        });
    }

    function fail() {
        alert('navigator.geolocation failed, may not be supported');
    }




    //
    //     function callback(results, status) {
    //         if (status == google.maps.places.PlacesServiceStatus.OK) {
    //             for (var i = 0; i < results.length; i++) {
    //                 var place = results[i];
    //                 allPlace.push(place)
    //                 allPlaceName.push(place.name)
    //                 placeType.push(place.types[0])
    //                 createMarker(results[i]);
    //             }
    //         }
    //         console.log(allPlace);
    //         console.log(allPlaceName);
    //         console.log(placeType);
    //         return guessMe();
    //     }
    //
    //     function createMarker(place) {
    //         var placeLoc = place.geometry.location;
    //         var marker = new google.maps.Marker({
    //             map: map,
    //             position: place.geometry.location,
    //             icon: 'spotninja.png'
    //         });
    //     }
})
