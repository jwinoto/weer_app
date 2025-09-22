$(document).ready(function(){
    function toonWeer() { 
       
       let weerURL ='https://api.openweathermap.org/data/2.5/weather?appid=8566d604cd9402b65394b034e52aa2af&q='; 
       weerURL += $('#txtPlaats').val();
       weerURL += '&units=metric&lang=nl';

    $('#txtPlaats').val('');
    $('#divDatum').empty();
    $('#divPlaats').empty();
    $('#divTemp').empty();
    $('#divWind').empty();
    $('#divVochtigheid').empty();
    $('#divAlert').empty();
    $('#toonWeerBericht').css('display','flex');

    

    
    $.ajax({
        url: weerURL,
        success: function(weather) {

            let plaats = '<h3>' + weather.name + ' ' + weather.sys.country + '</h3>';
            $('#divPlaats').append(plaats);

            const vandaag = new Date();
            const datum = vandaag.toLocaleDateString("nl-NL", {
                weekday : "short",
                day : "numeric",
                month : "short",
                year : "numeric"
            })

            
            $('#divDatum').html('<h3>' + datum + '</h3>');
            
            let iconCode = weather.weather[0].icon;
            let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            let temp =  '<img src="' + iconURL + '"/>' + '<br/>' + weather.main.temp + ' °C ' + '<br/>' +  weather.weather[0].description ;

            $('#divTemp').append(temp);

            let wind = '<br/>' + weather.wind.speed + ' m/s ' + '<br/>' + '<b>' + 'Wind Snelheid' + '</b>';
            $('#divWind').append(wind);

            let vochtigheid = '<br/>' + weather.main.humidity + ' % ' + '<br/>' + '<b>' + 'Luchtvochtigheid' + '</b>';
            $('#divVochtigheid').append(vochtigheid);
            
        },
        error: function() {
            $('#divAlert').append('Plaats niet gevonden');
            $('#txtPlaats').on('focus', function() {
                $('#divAlert').empty();
                $('#toonWeerBericht').css('display','none');
            });
        }
    }); 

}

$('#txtPlaats').keydown(function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) 
            {  
                toonWeer(); 
            }})

    $('#btnWeer').on('click', function() {
        toonWeer();
        
    })   

    $('#txtPlaats').on('focus', function () {
        $('#toonWeerBericht').css('display','none');
        })
       
})