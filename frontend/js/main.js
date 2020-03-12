btnFunction = () => {
	let btn = document.querySelector('.fa-expand-arrows-alt');
	let contador = 0
	btn.addEventListener('click', e => {
		let noteDiv = document.querySelector('.note');
		console.log('hola');
		if (contador == 0) {
			noteDiv.style.width = "100%";
			contador = 1;
		}else{
			noteDiv.style.width = "84.6%";
			contador = 0;
		}
	})
}
btnFunction();
var user = document.querySelector('.user');
user.addEventListener('click', () => {
	getNotes(url);
	document.querySelector('#note').innerHTML = `<div class="noteMaximiseBTN">
					<i class="fas fa-expand-arrows-alt">Button</i>
				</div>
				<div class="welcome">
					<p>¿Qué quieres hacer?</p>
					<p>
						Visualiza una nota o crea una nueva.
					</p>
				</div>`;
	btnFunction()
})




// get notes function
const url = "http://localhost:8080/api/";
getNotes = (url) => {
	fetch(url)
	.then(res => res.json())
	.then(data => {
		var list = document.querySelector('#listNotes');
		list.innerHTML = ''
		for (var i = 0; i < data.length; i++) {
			list.innerHTML += `<li class="${data[i]._id}" onclick="showNote(${i})" id="id${i}">${data[i].title}</li>`
		}
		console.log('get notes');
	})
	.catch(err => console.log(err));
}


// showing note function
showNote = (x) => {
	var note = document.querySelector('#id' + x);
	fetch(url + note.classList)
		.then(res => res.json())
		.then( data => {
			let noteData = document.querySelector('#note');
			console.log(data.title)
			noteData.innerHTML = `
				<div class="noteMaximiseBTN">
					<i class="fas fa-expand-arrows-alt">Button</i>
				</div>
				<div class="noteContent">
					<div class="title">
						${data.title}
					</div>
					<div class="container">
						${data.content}
						<br />
						<div class="date">
							<p>Fecha de creación: ${data.createdAt}</p>
							<p>Última edición: ${data.updatedAt}</p>
						</div>
						<div class="btns">
							<button class="${data._id}" onClick="btn('editar')" id="edit">Editar</button>
							<button class="${data._id}" onClick="btn('eliminar')" id="delete">Eliminar</button>
						</div>

					</div>
					
				</div>

			`
			btnFunction()
			})
		.catch(err => console.log(err));
		

}

// Btns on note function
btn = (param) => {
	if (param == 'eliminar') {
		let btn = document.querySelector('#delete');
		fetch(url + btn.classList, {method: 'DELETE'})
			.then( res => res.json() )
			.then( data =>{ 
				getNotes(url);
			} )
			.catch( err => console.log(err) );
		document.querySelector('#note').innerHTML = `<div class="noteMaximiseBTN">
					<i class="fas fa-expand-arrows-alt">Button</i>
				</div>
				<div class="welcome">
					<p>Nota eliminada exitosamente</p>
					<p>
						Visualiza una nota o crea una nueva.
					</p>
				</div>`;
		btnFunction();

	}else if(param == 'editar'){
		let btn = document.querySelector('#edit');
		fetch(url + btn.classList)
			.then( res => res.json() )
			.then( data =>{ 
				console.log(data)
				getNotes(url);
			} )
			.catch( err => console.log(err) );
		let noteData = document.querySelector('#note');
		noteData.innerHTML += `<div class="noteMaximiseBTN">
								<i class="fas fa-expand-arrows-alt">Button</i>
							  </div>`
		btnFunction()
	}


	
}

// New note function
newNote = () => {
	let noteData = document.querySelector('#note');
	noteData.innerHTML = `
		<div class="noteMaximiseBTN">
			<i class="fas fa-expand-arrows-alt">Button</i>
		</div>
		<form>
			<div class="title">Crear una nueva nota</div>
			<div class="form-content container">
				<div class="item">
					Título: <input type="text" name="title" id="name" class="input" placeholder="Escriba aquí el título de su nota."/>
				</div>
				<div class="item">
					Contenido: <textarea name="content" cols="30" rows="10" class="input" id="content" placeholder="Escriba aquí el contenido de su nota."></textarea>
				</div>
				<input value="¡Crear nota!" onclick="formController(this)" id="formNote"/>
			</div>
		</form>
	`
	btnFunction()


}

// Create Note 
formController = (a) => {
	var title = document.querySelector('#name').value;
	var content = document.querySelector('#content').value;

	if (title != '' && content != '') {
		var data = { title: title, content: content };
		console.log(JSON.stringify(data))
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},

		})
			.then(res => res.json())
			.catch(err => {console.log('Error: ' + err)})
			.then(response => {
				console.log('Response: ' +  response)
				getNotes(url);
			});
		document.querySelector('#note').innerHTML = `<div class="noteMaximiseBTN">
						<i class="fas fa-expand-arrows-alt">Button</i>
					</div>
					<div class="welcome">
						<p>¡Nota guardada exitosamente!</p>
						<p>
							Visualiza una nota o crea una nueva.
						</p>
					</div>`;
		btnFunction()

	}else {
		alert('Por favor, introduzca datos válidos');
	}
};

// Printing notes title on the nav
getNotes(url);

