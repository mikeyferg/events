/* globals google */
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'map-canvas',

  venueName: Ember.computed('name', function() {
    return "1234";
  }),

  insertMap: function() {
    const mapContainer = this.element;
    const geocoder = new google.maps.Geocoder();
    const map = new window.google.maps.Map(mapContainer, {
      disableDoubleClickZoom: true,
      draggable: false,
      scrollwheel: false,
      panControl: false
    });
    const placesService = new google.maps.places.PlacesService(map);
    const marker = new google.maps.Marker({map: map});
    let that = this;

    /*
    *  1. Geocode address to get lat-long
    *  2. Find venue by venue name in lat-long proximity
    *  3. Display venue and set marker
    */
    geocoder.geocode( { 'address': this.get('address')}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        let location = results[0];
        map.setCenter(location.geometry.location);
        map.setZoom(17);
        placesService.textSearch({
          location: location.geometry.location,
          radius: 300,
          query: this.get('venue')
        }, (places) => {
          marker.setIcon({
            url: places[0].icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
          });
          // getPlaceDetails(places[0].place_id);
          marker.setPosition(location.geometry.location);
          marker.setVisible(true);
        }, (error) => {
          console.log("Place search error: ", error);
        })

      } else {
        console.log("Geocoder error: ", status);
      }
    });

    function getPlaceDetails(placeId) {
      placesService.getDetails({placeId: placeId}, (place, status) => {
        console.log(that, place, status);
      });
    }

  }.on('didInsertElement')

});
