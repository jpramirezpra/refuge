(function () {
    'use strict';

    //Step 1: initialize communication with the platform
    var app_id = 'siqtyDjqWHW6QTGXwbtY';
    var app_code = '9HTj_sF6NO0dometkPDDfg';
    // const app_id = 'DemoAppId01082013GAL';
    // const app_code = 'AJKnXv84fjrb0KIHawS0Tg';


    var platform = new H.service.Platform({
        'app_id': 'siqtyDjqWHW6QTGXwbtY',
        'app_code': '9HTj_sF6NO0dometkPDDfg'
    });

    var map, behavior, ui;

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
        $.get("https://cle.cit.api.here.com/2/search/all.json?&app_code=" + app_code + "&app_id=" + app_id +"&layer_id="+1, function (data) {
            console.dir(data);
            //plot geometries


            alert("Load was performed.");
        });
    }

    init();
    load();
}());