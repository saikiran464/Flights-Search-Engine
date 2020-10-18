var flightsavailable=document.getElementById("flightsavailable");
  var oXHR = new XMLHttpRequest();
    // Initiate request.
    oXHR.onreadystatechange = reportStatus;
    oXHR.open("GET",'https://flights-66fc1.firebaseio.com/flights.json', true);
    oXHR.send();

    function reportStatus() {
        if (oXHR.readyState == 4) {	
              // Check if request is complete.
            var jsondata=JSON.parse(this.responseText);
            sessionStorage.setItem("jsondata",JSON.stringify(jsondata));
        }
    }
var table1=document.getElementById("flightsavailable");
var origincity,destinationcity,returndate,departuredate,checkoneorreturn=0;

/*JS code for getting one way form data and searching based on requirements*/
  function getformdata(){
    var jsondata1=JSON.parse(sessionStorage.getItem("jsondata"));
    checkoneorreturn=1;
    var searchresults=[], j=0;
    origincity=document.getElementById("origincity").value;
    destinationcity=document.getElementById("destinationcity").value;
    departuredate=document.getElementById("departuredate").value; 
    document.getElementById("rightpart").style.display="block";
    document.getElementById("routeinfo").innerHTML=origincity + " &#x2708; " +destinationcity;
    document.getElementById("ddate").innerHTML=departuredate;
    var check=0;
    for(var i=0;i<jsondata1.length;i++){
      if(origincity==jsondata1[i].sourceroute && destinationcity==jsondata1[i].destinationroute){
        var flightdate=new Date(jsondata1[i].departuredate);
        var searchdate=new Date(departuredate);
        if(flightdate.getTime()===searchdate.getTime()){
          searchresults[j++]=i;
          check++;
        }
      }
    }
    sessionStorage.setItem("searchresults",searchresults);
    sessionStorage.setItem("areflightsavailable",check);
    if(searchresults.length>0){
    openoneway1();
    }
    else{
      document.getElementById("noflightsfound").style.display="block";
      openoneway1();
    }
  }

/*JS code for getting return form data and searching based on requirements*/
  function returnformdata(){
    var jsondata1=JSON.parse(sessionStorage.getItem("jsondata"));
    checkoneorreturn=0;
    var searchresults=[], j=0;
    origincity=document.getElementById("origincity2").value;
    destinationcity=document.getElementById("destinationcity2").value;
    departuredate=document.getElementById("departuredate2").value; 
    arrivaldate=document.getElementById("returndate2").value; 
    document.getElementById("routeinfo").innerHTML=origincity + " &#x2708; " +destinationcity+ " &#x2708; " + origincity;
    document.getElementById("rightpart").style.display="block";
    document.getElementById("ddate").innerHTML=departuredate;
    document.getElementById("rdate").innerHTML=arrivaldate;
    var check=0;
    for(var i=0;i<jsondata1.length;i++){
      if(origincity==jsondata1[i].sourceroute && destinationcity==jsondata1[i].destinationroute){
        var flightdate=new Date(jsondata1[i].departuredate);
        var searchdate=new Date(departuredate);
        var flightreturndate=new Date(jsondata1[i].arrivaldate);
        var searchreturndate=new Date(arrivaldate);
        if(flightdate.getTime()===searchdate.getTime() && flightreturndate.getTime()===searchreturndate.getTime()){
          searchresults[j++]=i;
          check++;
        }
      }
    }
    sessionStorage.setItem("searchreturnresults",searchresults);
    sessionStorage.setItem("arereturnflightsavailable",check);
     if(searchresults.length>0){
      openreturn1();
      }
      else{
        document.getElementById("noflightsfound").style.display="block";
        openreturn1();
      }
  }
  
/*JS code for slider value*/
  function show_value(x)
  {
   document.getElementById("slider_value").innerHTML=x;
  }

/*Js code for opening one way form when one way tab is clicked*/
  function openoneway(){
    var jsondata1=JSON.parse(sessionStorage.getItem("jsondata"));
    document.getElementsByClassName("tablinks")[0].classList.add("active");
    document.getElementsByClassName("tablinks")[1].classList.remove("active");
    document.getElementById("one-way").style.display="block";
    document.getElementById("return").style.display="none";
    document.getElementById("returndt").style.display="none";
    document.getElementById("rightpart").style.display="none";
    document.getElementById("noflightsfound").style.display="none";
  }

/*Js code for displaying available flights data of one way form when search button is clicked*/
  function openoneway1(){
    var jsondata1=JSON.parse(sessionStorage.getItem("jsondata"));
    document.getElementById("searchformcenter").classList.remove("searchform");
    document.getElementById("searchformcenter").classList.add("searchedindex-left");
    document.getElementById("slider").style.display="block";
    var searchresults=sessionStorage.getItem("searchresults");
    searchresults=searchresults.split(",").map(Number);
    table1.innerHTML="";
    var areflightsavailable=sessionStorage.getItem("areflightsavailable");
    if(areflightsavailable>0){
    for(var j=0;j<searchresults.length;j++){
      document.getElementById("noflightsfound").style.display="none";
      i=searchresults[j];
      if(i!= -1){
      var cost=table1.insertRow();
      var cell1=cost.insertCell(0);
      cell1.innerHTML="INR " +jsondata1[i].cost;
      cell1.setAttribute("colSpan","2");
      var spancell=cost.insertCell(1);
      var img=document.createElement("img");
      img.src=jsondata1[i].flightimage;
      spancell.appendChild(img);
      spancell.setAttribute("rowSpan","3");
      var route=table1.insertRow();
      var one=route.insertCell(0);
      var ret=route.insertCell(1);
      one.innerHTML=jsondata1[i].source+"&#x2708;"+jsondata1[i].destination;
      var depart=table1.insertRow();
      var onedepart=depart.insertCell(0);
      var retdepart=depart.insertCell(1);
      onedepart.innerHTML="Departure:" +jsondata1[i].departuretime;
      var arrive=table1.insertRow();
      var onearrive=arrive.insertCell(0);
      var retarrive=arrive.insertCell(1);
      var bookflight=arrive.insertCell(2);
      bookflight.innerHTML="<button type='button' id='bookflight' >Book</button>";
      onearrive.innerHTML="Arrival: " +jsondata1[i].arrivaltime;
      var emptyrow=table1.insertRow();
      var cell=emptyrow.insertCell(0);
      cell.setAttribute("colSpan","3");
      emptyrow.setAttribute("id","xyz");
      cell.innerHTML="<hr>";
      }
   }
  }
  }

/*Js code for opening return form when return tab is clicked*/

  function openreturn(){
    var jsondata1=JSON.parse(sessionStorage.getItem("jsondata"));
    document.getElementsByClassName("tablinks")[1].classList.add("active");
    document.getElementsByClassName("tablinks")[0].classList.remove("active");
    document.getElementById("one-way").style.display="none";
    document.getElementById("return").style.display="block";
    document.getElementById("rightpart").style.display="none";
    document.getElementById("returndt").style.display="block";
    document.getElementById("returndt").style.display="block";
  }
/*Js code for displaying available flights data of return form when search button is clicked*/

  function openreturn1(){
    var jsondata1=JSON.parse(sessionStorage.getItem("jsondata"));
    document.getElementById("searchformcenter").classList.remove("searchform");
    document.getElementById("searchformcenter").classList.add("searchedindex-left");
    document.getElementById("slider").style.display="block";
    var searchresults=sessionStorage.getItem("searchreturnresults");
    searchresults=searchresults.split(",").map(Number);
    table1.innerHTML="";
    var arereturnflightsavailable=sessionStorage.getItem("arereturnflightsavailable");
    if(arereturnflightsavailable>0){
    for(var j=0;j<searchresults.length;j++){
      document.getElementById("noflightsfound").style.display="none";
      i=searchresults[j];
      if(i!= -1){
        var cost=table1.insertRow();
        var cell1=cost.insertCell(0);
        cell1.innerHTML="INR " +jsondata1[i].cost;
        cell1.setAttribute("colSpan","2");
        var spancell=cost.insertCell(1);
        var img=document.createElement("img");
        img.src=jsondata1[i].flightimage;
        spancell.appendChild(img);
        spancell.setAttribute("rowSpan","3");
        var route=table1.insertRow();
        var one=route.insertCell(0);
        var ret=route.insertCell(1);
        one.innerHTML=jsondata1[i].source+"&#x2708;"+jsondata1[i].destination;
        ret.innerHTML=jsondata1[i].destination+ "&#x2708;"+jsondata1[i].source;
        var depart=table1.insertRow();
        var onedepart=depart.insertCell(0);
        var retdepart=depart.insertCell(1);
        onedepart.innerHTML="Departure:" +jsondata1[i].departuretime;
        retdepart.innerHTML="Departure:" +jsondata1[i].returndeparturetime;
        var arrive=table1.insertRow();
        var onearrive=arrive.insertCell(0);
        var retarrive=arrive.insertCell(1);
        var bookflight=arrive.insertCell(2);
        bookflight.innerHTML="<button type='button' id='bookflight' >Book</button>";
        onearrive.innerHTML="Arrival: " +jsondata1[i].arrivaltime;
        retarrive.innerHTML="Arrival: " +jsondata1[i].returnarrivaltime;
        var emptyrow=table1.insertRow();
        var cell=emptyrow.insertCell(0);
        cell.setAttribute("colSpan","3");
        emptyrow.setAttribute("id","xyz");
        cell.innerHTML="<hr>";
    }
  }
  }
  }
  document.getElementById("defaultOpen").click();
/*JS code for filter slider for filtering the cost*/
   function costFilter(){
    var jsondata1=JSON.parse(sessionStorage.getItem("jsondata"));
     if(checkoneorreturn==1){
      getformdata();
      var costfilter=parseInt(document.getElementById("costfilter").value);
      var searchresults=sessionStorage.getItem("searchresults");
      searchresults=searchresults.split(",").map(Number);
      for(var i=0;i<searchresults.length;i++){
        var j=searchresults[i];
        if(parseInt(jsondata1[j].cost)>costfilter){
         searchresults[i]= -1;
        }
      }
        sessionStorage.setItem("searchresults",searchresults);
        openoneway1();
      }
      if(checkoneorreturn==0){
        returnformdata();
        var costfilter=parseInt(document.getElementById("costfilter").value);
        var searchresults=sessionStorage.getItem("searchreturnresults");
        searchresults=searchresults.split(",").map(Number);
        for(var i=0;i<searchresults.length;i++){
        var j=searchresults[i];
        if(parseInt(jsondata1[j].cost)>costfilter){
         searchresults[i]= -1;
        }
      }
        sessionStorage.setItem("searchreturnresults",searchresults);
        openreturn1();
      }
    }



  