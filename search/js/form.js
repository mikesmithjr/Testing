//Project 4 Visual Frameworks Term 1205
//Michael Smith Jr.
//The Diabetic Blood Sugar Log


//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function () {

	//Variable defaults
	var treatmentTypes = ["--Choose A Treatment--", "Pills", "Insulin"],
		sexValue,
		errMsg = ge("errors");

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
	
	//Find value of selected radio button.
	function getSelectedRadio(){
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				sexValue = radios[i].value;
			}
		}
	}


	function toggleControls(n){
		switch(n){
			case "on":
				ge("logEntryForm").style.display = "none";
				ge("clear").style.display = "inline";
				ge("displayLog").style.display = "none";
				ge("addNew").style.display = "inline";
				break;
			case "off":
				ge("logEntryForm").style.display = "block";
				ge("clear").style.display = "inline";
				ge("displayLog").style.display = "inline";
				ge("addNew").style.display = "none";
				ge("logItems").style.display = "none";
				break;
			default:
				return false;
		}
	}

	function storeData(key){
		//if there is no key , this is a new item and needs a key
		if(!key){
		var id = Math.floor(Math.random()*100000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same key that's been passed along from the editSubmit event handler
			//to the validate function, and then passed here.
			id = key;
		}
		//Get Form Data and store in object
		//Object properties contain array with form label and input value.
		getSelectedRadio();
		var logItem = {};
			logItem.fname = ["First Name:", ge("fname").value];
			logItem.lname = ["Last Name:", ge("lname").value];
			logItem.date = ["Today's Date:", ge("date").value];
			logItem.currentTime = ["Current Time:", ge("currentTime").value];
			logItem.bsreading = ["Blood Sugar Reading:", ge("bsreading").value];
			logItem.sex = ["Male or Female:", sexValue];
			logItem.condition = ["Condition:", ge("condition").value];
			logItem.treatments = ["Current Treatment:", ge("treatments").value];
			logItem.comments = ["Comments:", ge("comments").value];
		//Saving data into local storage using Stringify
		localStorage.setItem(id, JSON.stringify(logItem));
		alert("Log Saved!");
	}

	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage so default data was added.");
			autoFillData();
		}
		//Write Data from Local Storage to the browser
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "logItems");
		var makeList = document.createElement("ul");
		makeList.setAttribute("id", "logEntry");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		ge("logItems").style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement("li");
			makeli.setAttribute("id", "logItem");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Converting string from local storage value back to an object using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			getImage(obj.treatments[1], makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);//Create edit and delete links for each item in local storage.
		}
	}
	
	//Get image Function
	function getImage(treatType, makeSubList){
		var imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement("img");
		var setSrc = newImage.setAttribute("src", "images/"+ treatType + ".jpg");
		imageLi.appendChild(newImage);
	
	
	}
	
	//Auto Populate Default data to local storage
	function autoFillData(){
		//Store the JSON Object into local storage
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	
	}
	
	
	//Function to create the edit and delete item links for each item in local storage.
	function makeItemLinks(key, linksLi) {
		//add edit single item link
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Log Entry";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		
		// add line break
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);

		//add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Log Entry";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);


	}
	//edit single item
	function editItem() {
		//grab the data from our item in local storage
		var value = localStorage.getItem(this.key);
		var logItem = JSON.parse(value);

		//show form
		toggleControls("off");

		//Populate the form with current local storage values.
		ge("fname").value = logItem.fname[1];
		ge("lname").value = logItem.lname[1];
		ge("date").value = logItem.date[1];
		ge("currentTime").value = logItem.currentTime[1];
		ge("bsreading").value = logItem.bsreading[1];
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++) {
			if(radios[i].value == "Male" && logItem.sex[1] == "Male"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Female" && logItem.sex[1] == "Female"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		ge("condition").value = logItem.condition[1];
		ge("treatments").value = logItem.treatments[1];
		ge("comments").value = logItem.comments[1];

		//remove initial listener from the input "save log item" button
		submitLink.removeEventListener("click", storeData);
		//Change submit button value to edit button
		ge("submit").value = "Edit Log Entry";
		var editSubmit = ge("submit");
		//Save the key value established in this vunction as a property of the editSubmit event
		//so we can use that value when we save the data
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this log entry?");
		if(ask){
			localStorage.removeItem(this.key);
			window.location.reload();
			alert("Log Entry was deleted.");
		}else{
			alert("Log entry was Not deleted.");
		}
	}
	//clear local storage
	function clearData() {
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All log items are deleted!");
			window.location.reload();
			return false;
		}
	}

	function validate(e){
		//define elements to check
		var getFname = ge("fname");
		var getLname = ge("lname");
		var getDate = ge("date");
		var getCurrentTime = ge("currentTime");
		var getBsreading = ge("bsreading");
		
		// Reset Error Message
		errMsg.innerHTML = "";
		getFname.style.border = "1px solid black";
		getLname.style.border = "1px solid black";
		getDate.style.border = "1px solid black";
		getCurrentTime.style.border = "1px solid black";
		getBsreading.style.border = "1px solid black";

		//Get error messages
		var messagesAry = [];

		//First Name validation
		if(getFname.value===""){
			var fnameError = "Please enter your First Name.";
			getFname.style.border = "1px solid red";
			messagesAry.push(fnameError);
		}
		//Last Name validation
		if(getLname.value===""){
			var lnameError = "Please enter your Last Name.";
			getLname.style.border = "1px solid red";
			messagesAry.push(lnameError);
		}
		//Date validation
		if(getDate.value===""){
			var dateError = "Please enter Today's Date.";
			getDate.style.border = "1px solid red";
			messagesAry.push(dateError);
		}
		//Current Time validation
		if(getCurrentTime.value===""){
			var timeError = "Please enter the Current Time.";
			getCurrentTime.style.border = "1px solid red";
			messagesAry.push(timeError);
		}
		//Blood Sugar Reading validation
		if(getBsreading.value===""){
			var bsreadingError = "Please enter your Blood Sugar Reading.";
			getBsreading.style.border = "1px solid red";
			messagesAry.push(bsreadingError);
		}

		//If there were errors, display them on the string
		if(messagesAry.length >=1){
			for(var i=0, j=messagesAry.length; i < j; i++){
				var txt = document.createElement("li");
				txt.innerHTML = messagesAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;

		}else{
			//if all is ok save data.  Send the Key value that came from editData
			//this key value was passed throught the editSubmit event listner as a property
			storeData(this.key);
		}
		
	}
	
	/*function getSearch(){
	var category = ge("treatments").value;
	var term = ge("search").value;

	//toggleControls("off");
			
			//Search by Category Only
			if(category !="--Choose a Treatment--" && term === ""){
				for(i=0, len=localStorage.length; i<len; i++){
				//var key = localStorage.key(i);
				//var value = localStorage.getItem(key);
				var obj = Json.parse(value);
				if(category === obj.logItem[1]){
					for (n in obj){
						getData(obj[n]);
						}
					
					}
				}
			
			}
			
			//Search by Term Only
			if(term != "" && category === "--Choose a Treatment--"){
				for(i=0, len=localStorage.length; i<len; i++){
					//var key = localStorage.key(i);
					//var value = localStorage.getItem(key);
					//var obj = JSON.parse(value);
					for (n in obj){
						if(term === obj[n][1]){
							for (q in obj){
								getData(obj[q]);
							}
						}
					}
				}
			}
		
			//Search by Both Category and Term
			if(term != "" && category != "--Choose a Treatment"){
				for(i=0, len=localStorage.length; i<len; i++){
					//var key = localStorage.key(i);
					//var value = localStorage.getItem(key);
					//var obj = JSON.parse(value);
					for (n in obj){
						if(term === obj[n][1] && category === obj.logItem[1]){
							for (q in obj){
								getData(obj[q]);
							}
						}
					}
				}
			
			}
		};*/
	


	
	makeCats();


	//Set Link and Submint Click Events
	//var search = ge("searchBtn");
	//search.addEventListener("click", getSearch);
	var displayLink = ge("displayLog");
	displayLink.addEventListener("click", getData);
	var clearLink = ge("clear");
	clearLink.addEventListener("click", clearData);
	var submitLink = ge("submit");
	submitLink.addEventListener("click", validate);
	







});