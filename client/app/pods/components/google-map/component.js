import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'map-canvas',

  insertMap: function() {
    const mapContainer = this.element;
    const venue = this.get('venue');

    const map = new window.google.maps.Map(mapContainer, {
      disableDefaultUI: true
    });
    const service = new google.maps.places.PlacesService(map);
    const marker = new google.maps.Marker({map: map});

    service.textSearch({
      query: venue
    }, function(place, status) {
      console.log(place, status);
      map.setCenter(place[0].geometry.location);
      map.setZoom(17);

      marker.setIcon({
        url: place[0].icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      });

      marker.setPosition(place[0].geometry.location);
      marker.setVisible(true);

    }, function(err) {
      console.log(err);
    });

  }.on('didInsertElement')
});