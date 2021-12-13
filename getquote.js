let markers = [];
const dictionary = {}


 




  function get_data() {

    address = document.getElementById("pac-input").value;
    electricity_bill  = document.getElementById("electricity-bill-input").value;
    // rooftop_area  = document.getElementById("rooftop-input").value;
    // name_  = document.getElementById("name-da97").value;
    phone  = document.getElementById("phone-10f2").value;
    
  
    dictionary['address'] = address
    dictionary['electricity_bill'] = electricity_bill
    // dictionary['rooftop_area'] = rooftop_area
    // dictionary['name'] = name_
    dictionary['phone'] = phone
  
    calculate_savings();
    
    };


    function calculate_savings() {

      building_type = dictionary.establishment;
      electricity_bill = parseFloat(dictionary.electricity_bill);
      // rooftop_area = parseFloat(dictionary.rooftop_area);
    
      fixed_price = electricity_bill * 0.25;
      usage_price = electricity_bill * 0.75;

      if (building_type == "business") {
        savings_p_kw = 1000;
      } else {
        savings_p_kw = 700;
      }

      ideal_systemsize = usage_price / savings_p_kw;

      // rooftop_system_size = rooftop_area / 100;
    
      possible_system_size = Math.round(
        ideal_systemsize
      );    

      document.getElementById("surveyResult").innerHTML = "<h3 class='u-align-center u-custom-font u-font-lato u-text u-text-1' id='surveyResult' style='background-color:#FFEF5F;text-align:center;'>Recommended System = " +
      String(possible_system_size) +
      "KW. </h3>";
      possible_system_size = possible_system_size; 

      monthlysavings = possible_system_size * 1000;

      monthlysavings = monthlysavings.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
      });
    
      annualenergygen = possible_system_size * 1650;
      equivalenttrees = annualenergygen / 10;
    
      annualenergygen = annualenergygen.toLocaleString("en-US");
    
      lifetimesavings = possible_system_size * 1000 * 12 * 25;
    
      lifetimesavings = lifetimesavings.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
      });
    
      equivalenttrees = equivalenttrees.toLocaleString("en-US");

      document.getElementById("monthlysavingsid").innerHTML =
      "<h2 style ='font-weight:800;padding-bottom:20px;'>" + String(monthlysavings) + "</h2>";
    document.getElementById("annualenergygenid").innerHTML =
      "<h2 style ='font-weight:800;padding-bottom:20px;'>" + String(annualenergygen) + " kWh</h2>";
    document.getElementById("lifetimesavingsid").innerHTML =
      "<h2 style='font-weight:800;padding-bottom:20px;'>" + String(lifetimesavings) + "</h2>";
    document.getElementById("equivalent-trees").innerHTML =
      "<h2 style='font-weight:800;padding-bottom:20px;'>" + String(equivalenttrees) + "</h2>";

    }
  

function get_latlong_address() {

dictionary['address'] = document.getElementById('pac-input').value;

}   

function initMap() {
    
const haightAshbury = { lat: 12.8413144, lng: 77.6530755 };
const map = new google.maps.Map(document.getElementById("map"), {
    center: haightAshbury,
    zoom: 40,
    mapTypeControl: false,
    mapTypeId :'satellite'
});
const card = document.getElementById("map-next-btn");

//   const infowindowContent = document.getElementById("infowindow-content");
//   infowindow.setContent(infowindowContent);



const input = document.getElementById("pac-input") ;


const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["establishment"],
  };

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(card);

const residential_radio_btn = document.getElementById("residential-radio-btn");

dictionary['establishment'] = 'business';
residential_radio_btn.addEventListener("click", () => {

  dictionary['establishment'] = 'residential';

  autocomplete.setTypes(['address'])

});


const autocomplete = new google.maps.places.Autocomplete(input, options);

// autocomplete.bindTo("bounds", map);


const infowindow = new google.maps.InfoWindow();
infowindow.close()

const marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });
  markers.push(marker)


autocomplete.addListener("place_changed", () => {

  document.getElementById("input_2").click()
    
    infowindow.close();
    marker.setVisible(false);

    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(40);
    }

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    
    // infowindow.open(map, marker);

    document.getElementById('carousel_421f').style.display= 'none'
    document.getElementById('sec-5d3e').style.display= ''
    map.setZoom(40);



  });


const locationButton = document.getElementById("locate_id_button");
const infoWindow = new google.maps.InfoWindow();

locationButton.classList.add("locate_id_button");

locationButton.addEventListener("click", () => {

  document.getElementById("input_2").click()
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            zoom:40
          };
          res = String(pos.lat + ", " + pos.lng);
          document.getElementById("pac-input").value =  res
          // infoWindow.setPosition(pos);

          // new google.maps.Marker({
          //   position: pos,
          //   map,
          //   title: "Hello World!",
          // });

          addMarker(pos);


          // infoWindow.setContent("Location found.");
          // infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

    document.getElementById('carousel_421f').style.display= 'none'
    document.getElementById('sec-5d3e').style.display= ''
    
  });


  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // new google.maps.Marker({
    //   position: mapsMouseEvent.latLng,
    //   map,
    //   title: "Hello World!",
    // });
    hideMarkers()
    addMarker(mapsMouseEvent.latLng);
    
    // pos = mapsMouseEvent.latLng
    
   
    
    current_value = document.getElementById("pac-input").value
    new_value = mapsMouseEvent.latLng.toJSON()
    res = new_value['lat'] + ", " + new_value['lng']

    // current_value +"|" +
    document.getElementById("pac-input").value =   res

    // Create a new InfoWindow.
    // infoWindow = new google.maps.InfoWindow({
    //   position: mapsMouseEvent.latLng,
    // });
    // infoWindow.setContent(
    //   JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    // );
    // infoWindow.open(map);
  });


  function addMarker(position) {
    const marker = new google.maps.Marker({
      position,
      map,
    });
  
    markers.push(marker);
  }


  function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  function hideMarkers() {
    setMapOnAll(null);
  }


}

