const url="https://data.cityofnewyork.us/resource/5scm-b38n.json";
var responsedata = {};
const progress = document.getElementById("myprogress");
const recordlist= document.getElementById("search-results");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const searchResults = document.getElementById("search-results");
const item = searchResults.getElementsByTagName("div");
function getresults(){
	hideResults();
	fetch(url).
	then((data)=> {return data.json()}).
	then((res) => {
		responsedata = res;
		//createResults();
		showProgress();
	});
}

function showProgress(){
	progress.style.display = "block";
	var elem = document.getElementById("mybar");   
  var width = 0;
  var id = setInterval(frame,10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      hideProgress();
    } else {
      width+= Math.round(Math.random()); 
      elem.style.width = width + '%'; 
      elem.innerHTML = width + '%';
    }
  }
}

function hideProgress(){
	progress.style.display = "none";
	createResults();
}
function createResults(){
	hideResults();
	recordlist.innerHTML="";
	for(i=0;i<responsedata.length;i++){
		var item = document.createElement('div');
		
		var listno = document.createElement('span');
		var examno = document.createElement('span');
		var firstName= document.createElement('span');
		var lastName= document.createElement('span');
		var listAgencyDesc = document.createElement('span');
		var listTitleDesc = document.createElement('span');
		var publishedDate = document.createElement('date');
		firstName.setAttribute('class','firstname');
		lastName.setAttribute('class','lastname');
		listno.setAttribute('class','list-number');
		examno.setAttribute('class','exam-number');
		listAgencyDesc.setAttribute('class','list-agency-desc');
		listTitleDesc.setAttribute('class','list-title-desc');
		publishedDate.setAttribute('class','published-date');

		listno.innerHTML= responsedata[i].list_no;
		examno.innerHTML= responsedata[i].exam_no;
		firstName.innerHTML= responsedata[i].first_name;
		lastName.innerHTML= responsedata[i].last_name;
		listAgencyDesc.innerHTML= responsedata[i].list_agency_desc;
		listTitleDesc.innerHTML= responsedata[i].list_title_desc;
		if(responsedata[i].published_date != undefined){
			publishedDate.innerHTML= responsedata[i].published_date.slice(0,10);
		}
		item.appendChild(listno);
		item.appendChild(examno);
		item.appendChild(firstName);
		item.appendChild(lastName);
		item.appendChild(listAgencyDesc);
		item.appendChild(listTitleDesc);
		item.appendChild(publishedDate);
		recordlist.appendChild(item);
	}
	filterResults();
	showResults();
}
function filterResults(){
  var input, filter, i;
  filter1 = firstName.value.toUpperCase();
  filter2 = lastname.value.toUpperCase();
  if(item.length != 0){
	  for (i = 0; i < item.length; i++) {
	  	if(firstName.value.length!=0 && lastName.value.length== 0){
	  		filterRows(i,2,filter1);
	  	}
	  	else if(lastName.value.length != 0 && firstName.value.length == 0){
	  		filterRows(i,3,filter2);
	  	}
	  	else if (firstName.value.length != 0 && lastName.value.length != 0){
	  		row1 = item[i].getElementsByTagName("span")[2];
			row2 = item[i].getElementsByTagName("span")[3];
			if (row1 && row2) {
			      if (row1.innerHTML.toUpperCase().indexOf(filter1) > -1 && row2.innerHTML.toUpperCase().indexOf(filter2) > -1) {
			        row1.parentElement.style.display = "";
			      } else {
			        row1.parentElement.style.display = "none";
			      }
			    } 
	  	}
	  	else if(firstName.value.length == 0 && lastName.value.length == 0){
			row1 = item[i].getElementsByTagName("span")[2];
			row2 = item[i].getElementsByTagName("span")[3];
			if (row1 && row2) {
			      if (row1.innerHTML.toUpperCase().indexOf(filter1) > -1 || row2.innerHTML.toUpperCase().indexOf(filter2) > -1) {
			        row1.parentElement.style.display = "";
			      } else {
			        row1.parentElement.style.display = "none";
			      }
			    } 
	  	}
	    
	  }
	}
}
function filterRows(i,value,filter) {
	var row = item[i].getElementsByTagName("span")[value];
	if (row) {
      if (row.innerHTML.toUpperCase().indexOf(filter) > -1) {
        row.parentElement.style.display = "";
      } else {
        row.parentElement.style.display = "none";
      }
    } 
}
function showResults(){
	recordlist.style.display ="block";
}
function hideResults(){
	recordlist.style.display ="none";
}







