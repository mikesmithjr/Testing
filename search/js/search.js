//Project 1 MIU Term 1206
//Michael Smith Jr.
//The Diabetic Blood Sugar Log
	
	
	
	
//Search
//getElementByID Function
	function ge(x) {
		var theElement = document.getElementById(x);
		return theElement;
	}

	// Create Select Field element and populate
	function makeCats() {
		var formTag = document.getElementsByTagName("form"),
			selectLi = ge("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "treatments");
		for (var i=0, j=treatmentTypes.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optText = treatmentTypes[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);	
	}
	
var treatmentTypes = ["--Choose A Treatment--", "Pills", "Insulin"];

makeCats();

var search = ge("searchBtn");
search.addEventListener("click", getSearch);

		
var getSearch = function(){
	var category = ge("treatments").value;
	var term = ge("search").value;
			
			//Search by Category Only
			if(category !="--Choose a Treatment--" && term === ""){
				for(i=0, j=localStorage.length; i<j; i++){
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var obj = Jsaon.parse(value);
				if(category === obj.logItem[1]){
					for (n in obj){
						console.log(obj[n][1])
						}
					
					}
				}
			
			}
			
			//Search by Term Only
			if(term != "" && category === "--Choose a Treatment--"){
				for(i=0, j=localStorage.length; i<j; i++){
					var key = localStorage.key(i);
					var value = localStorage.getItem(key);
					var obj = JSON.parse(value);
					for (n in obj){
						if(term === obj[n][1]){
							for (q in obj){
								console.log(obj[q][1]);
							}
						}
					}
				}
			}
		
			//Search by Both Category and Term
			if(term != "" && category != "--Choose a Treatment"){
				for(i=0, j=localStorage.length; i<j; i++){
					var key = localStorage.key(i);
					var value = localStorage.getItem(key);
					var obj = JSON.parse(value);
					for (n in obj){
						if(term === obj[n][1] && category === obj.logItem[1]){
							for (q in obj){
								console.log(obj[q][1]);
							}
						}
					}
				}
			
			}
		};
	
