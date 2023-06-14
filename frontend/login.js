async function login(){
	const password = document.querySelector("#password").value
	const login=document.querySelector("#login").value

	let credentials={
		name: `${login}`,
		password: `${password}`
	}
	const response = await fetch("http://localhost:3000/login", {
	  method: "POST", // *GET, POST, PUT, DELETE, etc.
	  headers: {
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify(credentials),
	}).then(response=>{
		if(response.status!="400" && response.status!="404" && response.status!="403"){
			response.json().then(data=>{
				let _token=data.accessToken
				document.cookie = `token=${_token}`
				location.href = "index.html"
			})
		}else{
			alert("Incorect credentials!!!")
		}
	});

	

}
async function register(){
	const password = document.querySelector("#password").value
	const login=document.querySelector("#login").value

	let credentials={
		name: `${login}`,
		password: `${password}`
	}

	await fetch("http://localhost:3000/createUser", {
	  method: "POST", // *GET, POST, PUT, DELETE, etc.
	  headers: {
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify(credentials),
	}).then(response=>{
		if(response.status=="201"){
			
				/*let _token=data.accessToken
				document.cookie = `token=${_token}`
				location.href = "index.html"*/
				formLogin()
			
		}else{
			alert("User exists or some error occured")
		}
	});


}

function formLogin(){
	login()
}
function formRegister(){
	register()
}