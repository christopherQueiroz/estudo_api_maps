
var geocoder;
var map;
var marker;

function initialize(){
    
    
	var latlng = new google.maps.LatLng(0, 0);


	
	var options = {
		zoom: 5,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
      };

   
	map = new google.maps.Map(document.getElementById("map"), options);
    

	geocoder = new google.maps.Geocoder();



    
	marker = new google.maps.Marker({
		map: map,
		draggable: true,
		
	});

    
	marker.setPosition(latlng);


}


	


$(document).ready(function(){
    

 initialize();

  

	function carregarNoMapa(endereco){

		geocoder.geocode({'address': endereco + ', Brasil', 'region' : 'BR'}, function(results, status){

			if(status == google.maps.GeocoderStatus.OK){
			if(results[0]){
				var latitude = results[0].geometry.location.lat();
				var longitude = results[0].geometry.location.lng();

				$("#txtEndereco").val(results[0].formatted_address);
				$("#txtLatitude").val(latitude);
				$("#txtLongitude").val(longitude);

				var location = new google.maps.LatLng(latitude, longitude);
				marker.setPosition(location);
				map.setCenter(location);
				map.setZoom(15);
			 }

		   }
		});


	}

  google.maps.event.addListener(marker, 'drag', function(){

  	geocoder.geocode({'LatLng': marker.setPosition()}, function(results,status){

  		if(status == google.maps.GeocoderStatus.OK){

  			if(results[0]){

  				$("#txtEndereco").val(results[0].formatted_address);
  				$("#txtLatitude").val(marker.getPosition().lat());
  				$("#txtLongitude").val(marker.getPosition().lng());
  			}
  		}
  	});
  });


 






$("#txtEndereco").autocomplete({
	source: function(request, response){

		 
         geocoder.geocode({'address' : request.term + ', Brasil' , 'region' : 'BR'}, function(results, status){
            
            
         	response($.map(results, function(item){

         		return{

         			label: item.formatted_address,
         			value: item.formatted_address,
         			latitude: item.geometry.location.lat(),
         			longitude: item.geometry.location.lng()
         		}
         	}));
         });

	},




	select: function(event, ui){

		$("#txtLatitude").val(ui.item.latitude);
		$("#txtLongitude").val(ui.item.longitude);

		var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
		marker.setPosition(location);
		map.setCenter(location);
		map.setZoom(15);
	}
     

});



});