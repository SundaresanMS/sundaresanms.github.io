


Survey
.StylesManager
.applyTheme("modern");

var surveyValueChanged = function (sender, options) {
var el = document.getElementById(options.name);
if (el) {
    el.value = options.value;
}
};



var json =  {"pages":[{"name":"page1","elements":[{"type":"text","name":"name","title":"Name/Business Name","isRequired":true,"placeHolder":" "},{"type":"boolean","name":"building_type","title":"Type of Building","isRequired":true,"labelTrue":"Residential\n","labelFalse":"Commercial","valueTrue":"Residential","valueFalse":"MSME/Commercial"},{"type":"text","name":"whatsapp_num","title":"Whatsapp Number","isRequired":true,"placeHolder":" "},{"type":"text","name":"electricity_bill","title":"Monthly Electricity Bill","isRequired":true,"placeHolder":" "},{"type":"text","name":"rooftop_area","title":"Rooftop Area","isRequired":true},{"type":"text","name":"question1","title":"Address","isRequired":true}],"title":""}]}

function getLocationConstant() {
    if (navigator.geolocation) {
       (navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError));
       
        
    } else {
        alert("Your browser or device doesn't support Geolocation");
    }
}

// If we have a successful location update
function onGeoSuccess(event) {
res = String(event.coords.latitude + ", " + event.coords.longitude);
s = document.getElementById("sq_105i");
s.value  = res


}

// If something has gone wrong with the geolocation request
function onGeoError(event) {
    alert("Error code " + event.code + ". " + event.message);
}



function sendDataToServer(survey, options) {
    options.showDataSaving();
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbyrFDzK-cSwyOQ2ByMNIu-bvhZBCytR1jLUr_H-GO9ywoNiVqk69wDD5Qrkphe7d7T9/exec',
        type: 'post',
        data: JSON.stringify(survey.data),
        headers: {
            "Content-Type": "text/plain"
        },
        processData: false,
        complete: function(res, status) {
            if (status == 'success') {
                options.showDataSavingSuccess();
            }else {
                options.showDataSavingError();
            }
        },
    });
}
    



window.survey = new Survey.Model(json);





survey
.onComplete
.add(function (sender) {
    document
        .querySelector('#surveyResult')
        .textContent = "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
    
        building_type = sender.data.building_type;
        electricity_bill = parseFloat(sender.data.electricity_bill);
        rooftop_area = parseFloat(sender.data.rooftop_area);

        

        fixed_price = electricity_bill*0.25;
        usage_price = electricity_bill*0.75;
        

        if (building_type=="MSME/Commercial")
         {savings_p_kw = 1000;
        } else {
            savings_p_kw = 700;}

        ideal_systemsize = usage_price/savings_p_kw;

        rooftop_system_size = rooftop_area/100;

        possible_system_size = Math.round(Math.min(ideal_systemsize,rooftop_system_size))

1
    document.getElementById('surveyResult').innerHTML =  "<h3 class='u-custom-font u-text u-text-default u-text-font u-text-1' id='surveyResult' style='background-color:#FFEF5F;'>Recommended System = "+ (String(possible_system_size))+"KW. </h3>"

    document.getElementById('sec-3e9d').innerHTML = "<div></div>"

});



$("#surveyElement").Survey({model: survey, onValueChanged: surveyValueChanged, onComplete: sendDataToServer});