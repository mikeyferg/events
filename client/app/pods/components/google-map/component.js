/* globals google */
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'map-canvas',
  geocoder: new google.maps.Geocoder(),

  getLatLong() {
    this.get('geocoder').geocode( { 'address': this.get('address')}, function(results, status) {
      return results[0].geometry.location;
    });
  },

  insertMap: function() {
    const mapContainer = this.element;

    const map = new window.google.maps.Map(mapContainer, {
      disableDoubleClickZoom: true,
      draggable: false,
      scrollwheel: false,
      panControl: false
    });
    const service = new google.maps.places.PlacesService(map);
    const marker = new google.maps.Marker({map: map});
    const geocoder = new google.maps.Geocoder();
    let locations;

    let coords = this.getLatLong();
    console.log(coords);

    var request = {
      placeId: ''
    };
    var sf = {lat: 37, lng: 122};

    service.textSearch({
      location: sf,
      radius: 500,
      query: this.get('venue')
    }, function(place) {
      console.log(place);
      request.placeId = place[0].place_id;
      getPlace();
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



    function getPlace() {
      service.getDetails(request, function (place, status) {
        console.log(place, status);
      });
    }

  }.on('didInsertElement')

});
