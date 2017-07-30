window.funcs = (function () {
    'use strict';

    //Step 1: initialize communication with the platform
    var app_id = 'siqtyDjqWHW6QTGXwbtY';
    var app_code = '9HTj_sF6NO0dometkPDDfg';
    // const app_id = 'DemoAppId01082013GAL';
    // const app_code = 'AJKnXv84fjrb0KIHawS0Tg';


    var platform = new H.service.Platform({
        'app_id': 'siqtyDjqWHW6QTGXwbtY',
        'app_code': '9HTj_sF6NO0dometkPDDfg',
        useCIT: true,
    });

    platform.setUseHTTPS(true);

    var map, behavior, ui;

    var campData;

    function onGeoClick(id) {
        alert("you clicked a GEO");
    }

    function init() {
        var defaultLayers = platform.createDefaultLayers();

        // Instantiate (and display) a map object:
        map = new H.Map(
            document.getElementById('hereMap'),
            defaultLayers.normal.map,
            {
                zoom: 5,
                center: { lat: 33.3128, lng: 44.3615 }
            });

        behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        ui = H.ui.UI.createDefault(map, defaultLayers);



    }

    function load() {
        //$.get("https://cle.cit.api.here.com/2/search/all.json?&app_code=" + app_code + "&app_id=" + app_id +"&layer_id="+"TESTLAYER", function (data) {
        //    debugger;
        //    console.dir(data);
        //    //plot geometries
        //    for (var i = 0; i < data.geometries.length; i++) {
        //        console.log(data.geometries[i]);
        //        map.addObject(new H.map.Polygon(new H.geo.Strip(data.geometries[i].geometry)));
        //    }
            
        //});

        // Create an icon, an object holding the latitude and longitude, and a marker:
        var icon = new H.map.Icon('images/camp.png')

        $.get("/plotpoints", function (data) {
            //PLot Camps
            var camps = JSON.parse(data);
            delete camps._id;
            delete camps._rev;
            campData = camps;

            var coords;
            var marker;
            var i = 1;
            var id;
            var correction = $('.ui.stackable.menu').height() + 10;
            while (camps[i] != undefined) {
                coords = { lat: camps[i].lat, lng: camps[i].long };
                marker = new H.map.Marker(coords, { icon: icon });
                marker.data = camps[i].FID;
                marker.addEventListener("tap", function (evt) {
                    $('.campList ul').children().removeClass('active');
                    $('.campList ul').scrollTop(0);
                    $('.campList ul').animate({ scrollTop: $('#marker' + this.data).offset().top - correction }, 1000);
                    $('#marker' + this.data).addClass('active');
                    updateMap(this.data);
                });

                map.addObject(marker);
                i++
            }
        });



        $.get("/conflictpoints", function (data) {
            //PLot Camps
            var conflicts = JSON.parse(data);
            delete conflicts._id;
            delete conflicts._rev;

           
            var svgMarkup;
            var icon;
            var coords;
            var marker;
            var i = 1;
            
            while (conflicts[i] != undefined) {
                svgMarkup = '<svg width="24" height="24" ' +
                    'xmlns="http://www.w3.org/2000/svg">' +
                    '<rect stroke="white" fill="red" x="1" y="1" width="22" ' +
                    'height="22" /><text x="12" y="18" font-size="10pt" ' +
                    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
                    'fill="white">' + conflicts[i].Death +'</text></svg>';


                icon = new H.map.Icon(svgMarkup),
                coords = { lat: conflicts[i].lat, lng: conflicts[i].long };
                marker = new H.map.Marker(coords, { icon: icon });
                marker.data = "Date of Conflict; " + conflicts[i].Date + ", Deaths: " + conflicts[i].Death;
                marker.addEventListener("tap", function (evt) {
                    alert(this.data);
                });

                map.addObject(marker);
                i++
            }
        });
    }

    function updateMap(id) {
        var i = 1;
        while (campData[i] != undefined) {
            if (campData[i].FID == id) {
                map.setCenter({ lat: campData[i].lat, lng: campData[i].long });
                map.setZoom(10);
            }
            i++;
        }
    }

    init();
    load();

    return {
        centerMap: function (lat, long, id) {
            $('.campList ul').children().removeClass('active');
            $('#marker' + id).addClass('active');
            map.setCenter({ lat: lat, lng: long });
            map.setZoom(10);
        },
        showModal: function () {
            $('#modal').addClass('active');
        },
        closeModal: function () {
            $('#modal').removeClass('active');
        }
    }
}());