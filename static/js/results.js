var MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

$( document ).ready(function() {
    var data = {
        'source': [],
        'count': []
    };
    document.cookie.split(';').forEach(function(elem){
        if(elem.indexOf('source') >= 0)
            data['source'].push(elem.split('=')[1]);
        if(elem.startsWith(' count'))
            data['count'].push(elem.split('=')[1]);
        if(elem.startsWith(' destination'))
            data['destination'] = elem.split('=')[1];
        if(elem.startsWith(' type'))
            data['type'] = elem.split('=')[1];
        if(elem.startsWith(' from'))
            data['from'] = elem.split('=')[1];
        if(elem.startsWith(' to'))
            data['to'] = elem.split('=')[1];
    });

    data['source'].forEach(function(city,index){
        var ul = document.getElementById('tabCities');

        var li = document.createElement('li');
        li.classList.add('nav-item');
        li.setAttribute('onClick','changeCity(event)');
        var a = document.createElement('a');
        a.classList.add('nav-link');
        if(index == 0)
            a.classList.add('active');
        a.appendChild(document.createTextNode(city));
        li.appendChild(a);
        ul.appendChild(li);
    });

    var d1 = Date.parse(data['from']).add(-14).days();
    var d2 = Date.parse(data['from']).add(15).days();
    if(d1.getMonth() != d2.getMonth()){
        printMonth(d2,"dvMonth2");
        $('#aMonth2').text(MONTHS[d2.getMonth()]);
        $('#dvMonth2').hide();
    }
    $('#aMonth1').text(MONTHS[d1.getMonth()]);
    printMonth(d1,"dvMonth1");
});

$('#cbToggle input').change(function(ev) {
    if(this.checked){
        $('#tabResults').show();
        $('#listResults').hide();
    }
    else{
        $('#tabResults').hide();
        $('#listResults').show();
        var dataSet = [
            [ "5/1/2018", "Paris", "Edinburgh", "5421", "2011/04/25"],
            [ "5/10/2018", "Mumbai", "Tokyo", "8422", "2011/07/25"],
            [ "5/7/2018", "Miami", "San Francisco", "1562", "2009/01/12"],
            [ "5/30/2018", "Mumbai", "Edinburgh", "6224", "2012/03/29"],
            [ "5/21/2018", "Paris", "Tokyo", "5407", "2008/11/28" ],
            [ "5/13/2018", "Mumbai", "New York", "4804", "2012/12/02"],
            [ "5/7/2018", "Mumbai", "San Francisco", "9608", "2012/08/06"],
            [ "5/27/2018", "Kolkata", "Tokyo", "6200", "2010/10/14" ],
            [ "5/18/2018", "Dubai", "San Francisco", "2360", "2009/09/15" ],
            [ "5/12/2018", "Paris", "Edinburgh", "1667", "2008/12/13"],
            [ "5/11/2018", "Mumbai", "London", "3814", "2008/12/19"],
            [ "5/3/2018", "Miami", "Edinburgh", "9497", "2013/03/03"]
        ];

        if (! $.fn.dataTable.isDataTable( '#tblResults' ) ){
            $('#tblResults').DataTable( {
                data: dataSet,
                searching: false,
                columns: [
                    { title: "Date" },
                    { title: "From" },
                    { title: "To" },
                    { title: "Total Price" },
                    { title: "Place holder" }
                ]
            } );
        }
    }
})

function changeCity(ev){
    var elem = $('#tabCities .active');
    elem[0].classList.remove('active');

    ev.srcElement.classList.add('active');

    //call api function here
    //foo(ev.srcElement.innerText);
}

function genMonArray(dt){
    var tbl = [];
    var yr = dt.getYear()+1900;
    var mnth = dt.getMonth();
    var endDate = Date.getDaysInMonth(yr, mnth);
    var currDate = 1;
    
    var str = (mnth+1) + "/01/" + yr;
    var startDay = new Date(str).getDay();
    for(var currDate = 1;currDate<=endDate;){
        var week = [];
        for(var day=startDay;day<7;day++){
            if(currDate > endDate){
                while(day < 7){
                    week.push(0);
                    day++;
                }
                break;
            }
            week[day] = currDate;
            currDate++;
        }
        tbl.push(week);
        startDay = 0;
    }
    return tbl;
}

function printMonth(dt,dvId){
    var tbl = document.createElement("table");
    tbl.classList.add('table');
    tbl.classList.add('calendarTable');

    var weekDays = ['Sun','Mon','Tue','Wed','Thurs','Fri','Sat'];
    var tblHeader = document.createElement("tr");
    tblHeader.classList.add('thead-dark');

    for(var i=0;i<weekDays.length;i++){
        var cell = document.createElement("th");
        var cellText = document.createTextNode(weekDays[i]);
        cell.appendChild(cellText);
        tblHeader.appendChild(cell);
    }
    tbl.appendChild(tblHeader);

    var dateArr = genMonArray(dt);

    // creating all cells
    for (var i = 0; i < dateArr.length; i++) {
        // creates a table row
        var row = document.createElement("tr");

        for (var j = 0; j < dateArr[i].length; j++) {
            if(dateArr[i][j] == undefined || dateArr[i][j] == 0)
                var txt = '';
            else
                var txt = dateArr[i][j];
            
            var cell = document.createElement("td");
            var dvText = document.createElement("div");
            var p1 = document.createElement("p");
            p1.appendChild(document.createTextNode(txt));
            p1.classList.add('calendarTableDate');
            dvText.appendChild(p1);

            // if(txt >= ''){
            //     var p2 = document.createElement("p");
            //     p2.appendChild(document.createTextNode("$price"));
            //     p2.classList.add('calendarTableText');
            //     p2.id = txt;
            //     dvText.appendChild(p2);
            // }

            cell.appendChild(dvText);
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tbl.appendChild(row);
    }
    document.getElementById(dvId).appendChild(tbl);
}