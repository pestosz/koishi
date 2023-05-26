function getRemindersAll(){
	fetch("http://localhost:3000/reminders")
	.then(response => {
		response.json()
		.then((data) => {
			const container = document.querySelector("#task-list")

			//console.log(data)
			data.forEach(row => {
				if (row.istodo){
					let _block = document.createElement("div")
					_block.classList.add("task-entry-cont")
					_block.classList.add("rounded")
					if(!validateTime(Date.now(), row.data)){//sprawdzenie, czy termin nie upłynął
						_block.classList.add("task-overdue") //kolor tła:czerwony
					}

					console.log(row.data)
					_block.innerHTML=`<div class="task-header text-uppercase">`+
						`<div class="task-title">${row.name}</div>`+
						`<div class="task-deadline">${dateToDays(row.data)}</div>`+
					'</div>'+
					`<div class="task-content pt-2">${row.content}</div>`;
					container.appendChild(_block)
				}
			});
			//return data;
		})
	})
	.catch(err => {
		console.log('Request Failed', err)
		alert("An error occured 💀")
	}); // Catch errors
}

function dateToDays(date){

}

function validateTime(date1, date2){

}


getRemindersAll()

async function addReminder() {
	// Default options are marked with *
	let time = document.querySelector("#data").value
	const nazwa=document.querySelector("#name").value
	const tresc = document.querySelector("#content").value

	let data={
		name: `${nazwa}`,
		content: `${tresc}`,
		data: "2016-05-18T16:00:00.000Z",
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
	//return response.json(); // parses JSON response into native JavaScript objects
  }

function clearForm(){
	document.querySelector("#data").value=""
	document.querySelector("#name").value=""
	document.querySelector("#content").value=""
}

function reloadReminders(){
	const cont = document.querySelector("#task-list")
	for(let i=0; i<cont.children.length; i++){
		if(i!=0){
			cont.children[i].remove()
		}
	}
	getRemindersAll()
}

/*function renderReminders(){
	const reminders = getRemindersAll() //undefined my ***
	const container = document.querySelector("#task-list")
		
	reminders.forEach(row => {
		let _block = document.createElement("div")
		_block.classList.add("task-entry-cont rounded")
		_block.innerHTML=`<div class="task-header text-uppercase">
			<div class="task-title">${row.name}</div>
			<div class="task-deadline">???</div>
		</div>
		<div class="task-content pt-2">${row.content}</div>`;
		container.appendChild(_block)
		console.log('block')

		return _block
	});
}*/

//rendering results from node server
//renderReminders()