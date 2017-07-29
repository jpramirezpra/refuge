(function () {
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

    init();
}());