$( document ).ready(function() {
    getAirPortList();
    showSource();
});
function getAirPortList() {
    $.get( "/airportName", function( data ) {
        var options = '';

        for(var i = 0; i < data.length; i++)
            options += '<option value="'+data[i].city+'('+data[i].iata+' )'+'" />';

        document.getElementById('cities').innerHTML = options;
    });
}
function addRow(ev){
    if(ev.srcElement.classList.contains("fa-plus")){
        ev.srcElement.classList.remove("fa-plus");
        ev.srcElement.classList.add("fa-minus");
        ev.srcElement.style = "color:red";
        var dv = document.getElementById('dvSrc');
        // dv.innerHTML += "<div class=\"row rowCity\"> \
        //                     <div class=\"col-8\"><input list=\"cities\" class=\"txtSource\" type=\"text\" placeholder=\"Enter City\"></div>\
        //                     <div class=\"col-2\"><input class=\"txtSourceNum\" type=\"text\" placeholder=\"No.\"></div>\
        //                     <div class=\"col-2 dvIcon\"><i onclick=\"addRow(event)\" class=\"fa fa-plus\" aria-hidden=\"true\"></i></div>\
        //                 </div>";
        var row = document.createElement("div");
        row.classList.add('row','rowCity');

        var col1 = document.createElement("div");
        col1.classList.add("col-8");
        var inp1 = document.createElement("input");
        inp1.setAttribute('type', 'text');
        inp1.setAttribute('list', 'cities');
        inp1.setAttribute('placeholder', 'Enter City');
        inp1.classList.add("txtSource");
        col1.appendChild(inp1);

        var col2 = document.createElement("div");
        col2.classList.add("col-2");
        var inp2 = document.createElement("input");
        inp2.setAttribute('type', 'text');
        inp2.setAttribute('placeholder', 'No.');
        inp2.classList.add("txtSourceNum");
        col2.appendChild(inp2);

        var col3 = document.createElement("div");
        col3.classList.add("col-2","dvIcon");
        var inp2 = document.createElement("i");
        inp2.setAttribute('onclick', 'addRow(event)');
        inp2.setAttribute('aria-hidden', 'true');
        inp2.classList.add("fa","fa-plus");
        col3.appendChild(inp2);

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);

        dv.appendChild(row);
    }
    else{
        var childRow = ev.srcElement.parentElement.parentElement;
        var parent = ev.srcElement.parentElement.parentElement.parentElement;
        parent.removeChild(childRow);
    }
}
function addRowDest(ev){
    if(ev.srcElement.classList.contains("fa-plus")){
        ev.srcElement.classList.remove("fa-plus");
        ev.srcElement.classList.add("fa-minus");
        ev.srcElement.style = "color:red";
        var dv = document.getElementById('dvDest');
        var row = document.createElement("div");
        row.classList.add('row','rowCity');

        var col1 = document.createElement("div");
        col1.classList.add("col-8");
        var inp1 = document.createElement("input");
        inp1.setAttribute('type', 'text');
        inp1.setAttribute('list', 'cities');
        inp1.setAttribute('placeholder', 'Enter City');
        inp1.classList.add("txtSource");
        col1.appendChild(inp1);

        var col2 = document.createElement("div");
        col2.classList.add("col-2");
        var inp2 = document.createElement("input");
        inp2.setAttribute('type', 'text');
        inp2.setAttribute('placeholder', 'No.');
        inp2.classList.add("txtSourceNum");
        col2.appendChild(inp2);

        var col3 = document.createElement("div");
        col3.classList.add("col-2","dvIcon");
        var inp2 = document.createElement("i");
        inp2.setAttribute('onclick', 'addRowDest(event)');
        inp2.setAttribute('aria-hidden', 'true');
        inp2.classList.add("fa","fa-plus");
        col3.appendChild(inp2);

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);

        dv.appendChild(row);
    }
    else{
        var childRow = ev.srcElement.parentElement.parentElement;
        var parent = ev.srcElement.parentElement.parentElement.parentElement;
        parent.removeChild(childRow);
    }
}

function showDestination(){
    $("#aSrc").removeClass("active");
    $("#aDest").addClass("active");

    $("#dvSrc").hide();
    $("#dvDest").show();

    // $('#dvSelectDestination button').hide();
}

function showSource(){
    $("#aSrc").addClass("active");
    $("#aDest").removeClass("active");

    $("#dvSrc").show();
    $("#dvDest").hide();
}

function search(){
    var arrCities = $('.txtSource');
    var arrCount = $('.txtSourceNum');
    var i=0;
    for(i;i<arrCities.length-1;i++){
        document.cookie = "source"+i+"="+ arrCities[i].value;
        document.cookie = "count"+i+"="+ arrCount[i].value;
    }
    document.cookie = "destination="+ arrCities[i].value;
    document.cookie = "type="+ $("input[name='rdExclude']:checked").val();
    document.cookie = "from="+ $('#fromDate').val();
    document.cookie = "to="+ $('#toDate').val();
    var fromDate= $('#fromDate').val();
    var toDate=$('#fromDate').val();
    var type=$("input[name='rdExclude']:checked").val();
        if(fromDate=="" )
        {
            alert( "Please Enter from Date!" );
            return false;
        }
        if(toDate=="")
        {
            alert( "Please Enter To Date!" );
            return false;
        }
        if(type=="")
        {
            alert( "Please select any of Flight or hotels or both" );
            return false;
        }
      window.location.href = '/results';

}