var TOKEN = getCookie("token")
console.log(TOKEN)


getRemindersAll()
function getRemindersAll(){
	const filterToDo=document.querySelector("#to-do").checked;
	const filterDone=document.querySelector("#done").checked;

	fetch("http://localhost:3000/reminders")
	.then(response => {
		response.json()
		.then((data) => {
			const container = document.querySelector("#task-list")
			let displayCounter=0
			//console.log(data)
			data.forEach(row => {
				if ((row.istodo==true && filterToDo) || (row.istodo==false && filterDone)){
					displayCounter+=1
					let _block = document.createElement("div")
					_block.classList.add("task-entry-cont")
					_block.classList.add("rounded")
					if(!validateTime(row.data)&&row.istodo==true){//sprawdzenie, czy termin nie upłynął
						_block.classList.add("task-overdue") //kolor tła:czerwony
					}else if(row.istodo==false){
						_block.classList.add("task-done") //kolor tła:szarawy
					}

					_block.innerHTML=`<div class="task-header text-uppercase">`+
						`<div class="task-title">${row.name}</div>`+
						`<div class="task-deadline">${dateToDays(row.data)}</div>`+
					'</div>'+
					`<div class="task-content pt-2">${row.content}</div>`+
					`<div class="task-overlay rounded d-flex flex-row justify-content-center align-items-center w-100 h-100">`+
						`<button class="btn-warning" type="button" onclick="editForm('${row._id}')">edit</button>`+
						`<button class="btn-success" type="button" onclick="markAsDone('${row._id}')">done</button>`+
						`<button class="btn-danger" type="button" onclick="deleteReminder('${row._id}')">delete</button>`+
					`</div>`;
					container.appendChild(_block)
				}
			});

			//if no reminders:
			if(data == null || data==undefined||data.length==0|| displayCounter<=0){
				//console.log("no reminders")
				let _block=document.createElement("div")
				_block.innerHTML='<div class="task-entry-cont rounded bg-danger text-center justify-content-center color-white"><p>No reminders to display :(</p></div>'
				container.appendChild(_block)
			}
			//return data;
		})
	})
	.catch(err => {
		console.log('Request Failed', err)
		alert("An error occured 💀")
	}); // Catch errors
}

function dateToDays(d){
	let date = new Date(d);
	let currentDate = new Date();
	let difference = currentDate.getTime() - date.getTime();
	let seconds = Math.floor(difference / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);
	let days = Math.floor(hours / 24);
	
	return days + " days, " + hours % 24 + " hours, " + minutes % 60 + " minutes";

}

function validateTime(d){
	let date=new Date(d);
	let currentDate = new Date();
	let difference = currentDate.getTime() - date.getTime();
	let seconds = Math.floor(difference / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);
	let days = Math.floor(hours / 24);
	if(days<0 && minutes<=0){
		return false;
	}else{
		return true;
	}
}
/*function dateToDays(date){
}
function validateTime(date){

}*/
function calculateTimeDifference(date) {
	Date.parse(date);
	let currentDate = new Date();
	let difference = currentDate.getTime() - date.getTime();
	let seconds = Math.floor(difference / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);
	let days = Math.floor(hours / 24);
	
	return days + " days, " + hours % 24 + " hours, " + minutes % 60 + " minutes";
}

async function addReminder() {
	// Default options are marked with *
	let czas = document.querySelector("#data").valueAsDate
	const nazwa=document.querySelector("#name").value
	const tresc = document.querySelector("#content").value
	
	//"2016-05-18T16:00:00.000Z"
	let data={
		name: `${nazwa}`,
		content: `${tresc}`,
		data: `${czas}`,
		istodo: true
	}
	const response = await fetch("http://localhost:3000/reminders/add", {
	  method: "POST", // *GET, POST, PUT, DELETE, etc.
	  headers: {
		"Content-Type": "application/json",
		// 'Content-Type': 'application/x-www-form-urlencoded',
	  },
	  body: JSON.stringify(data), // body data type must match "Content-Type" header
	});
	clearForm()
	reloadReminders()
	console.log(czas)
	//return response.json(); // parses JSON response into native JavaScript objects
}

function clearForm(){
	document.querySelector("#data").value=""
	document.querySelector("#name").value=""
	document.querySelector("#content").value=""
}

function reloadReminders(){
	const cont = document.querySelector("#task-list")
	console.log(`długość dzieci: ${cont.children.length}`)
	for(let i=cont.children.length-1; i>=1; i--){ //obiekt 0 to napis TO-DO więc zaczynamy od i=1
		console.log(i)
		cont.children[i].remove()
		// pętla się kończy o jedną iteracje za wcześnie; jeśli dodam do lenght 1 to idzie za daleko wtf
	}
	getRemindersAll()
}

async function deleteReminder(id){
	let response = await fetch(`http://localhost:3000/reminders/${id}`, {
	  method: "DELETE", // *GET, POST, PUT, DELETE, etc.
	});

	//console.log(response)
	for(;;){
		if(response.status=="200"){
			reloadReminders()
			break
		}
	}
	
}

async function markAsDone(id){
	let data={
		istodo: false
	}
	const response = await fetch(`http://localhost:3000/reminders/${id}`, {
	  method: "PATCH", // *GET, POST, PUT, DELETE, etc.
	  headers: {
		"Content-Type": "application/json",
		// 'Content-Type': 'application/x-www-form-urlencoded',
	  },
	  body: JSON.stringify(data), // body data type must match "Content-Type" header
	});

	for(;;){
		if(response.status=="200"){
			reloadReminders()
			break
		}
	}
}

async function editForm(id){
	const formCont=document.querySelector("#edit-form-container")
	formCont.style.display="block"
	fetch(`http://localhost:3000/reminders/${id}`)
	.then(response => {
		response.json()
		.then((data) => {
			//console.log(data)
			formCont.innerHTML=`
			<form id="edit-form">
			<!--<input type="date" name="data" id="e-data" value="${data.data}">-->
			<input type="text" name="name" id="e-name" value="${data.name}">
			<textarea name="content" id="e-content" cols="40" rows="10" placeholder="Description">${data.content}</textarea><br>
			<button type="button" class="btn-success" onclick="editReminder('${id}')">Confirm</button>
			<button type="button" onclick="clearEditForm()" class="btn-danger">Cancel</button>
			</form>`;
		})
	})


}

function clearEditForm(){
	const formCont=document.querySelector("#edit-form-container")
	formCont.innerHTML=""
	formCont.style.display="none"
}

async function editReminder(id){
	//let time = document.querySelector("#e-data").value
	const nazwa=document.querySelector("#e-name").value
	const tresc = document.querySelector("#e-content").value

	let data={
		name: `${nazwa}`,
		content: `${tresc}`
	}

	const response = await fetch(`http://localhost:3000/reminders/${id}`, {
	  method: "PATCH", // *GET, POST, PUT, DELETE, etc.
	  headers: {
		"Content-Type": "application/json"
	  },
	  body: JSON.stringify(data), // body data type must match "Content-Type" header
	});

	for(;;){
		if(response.status=="200"){
			clearEditForm()
			reloadReminders()
			break
		}
	}
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
  }