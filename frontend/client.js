function getRemindersAll(){
	fetch("http://localhost:3000/reminders")
	.then(response => {
		response.json()
		.then((data) => {
			console.log(data)
			return data;
		})
	})
	.catch(err => {
		console.log('Request Failed', err)
		alert("An error occured 💀")
	}); // Catch errors
}

function renderReminders(){
	const reminders = getRemindersAll() //undefined my ***
	const container = document.querySelector("#task-list")
		
	/*for(let i=0; i<reminders.length; i++){

	}*/
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
}

//rendering results from node server
renderReminders()