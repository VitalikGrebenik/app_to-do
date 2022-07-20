
const add_task_btn = document.getElementById('new_task_btn')
const input = document.getElementById('input_task')
const list_add = document.getElementById('tasks')


let task_list = [];


add_task_btn.onclick = ()=>{
	const task = input.value
	if(task.length > 0 && checkTask(task, task_list)){
		addTask(task, task_list)
		input.value = ''
		renderListTask(task_list)
	}else{
		input.value = ''
		console.log('!')
	}
}


const addTask =(text, task_list)=>{
	let id_task = Date.now()

	let task = {
		id: id_task,
		text,
		isComplete: false,
	}

	task_list.push(task)
	console.log(task_list)
}


const checkTask = (text, task_list) =>{
	let check = true


	task_list.forEach((task)=>{
		if(task.text === text){
			alert("Такая запись уже есть")
			check = false
		}
	})
	return check
}


const renderListTask =(task_list)=>{
	let htmlList = ``;
	task_list.forEach((task)=>{
		let check = task.isComplete ? 'content_true' : 'content' ;
		let chekCheked = task.isComplete ? 'checked' : ''
		const taskHtml = 
		`
		<div id=${task.id} class="task">
			<div class="task_checkbox">
				<input type="checkbox" ${chekCheked} >
			</div>
			<div class=${check}>
				<input 
				type="text"
				value=${task.text}
				/>
			</div>
			<div class="action">
				<button id="btn_delete" class="delete">Delete</button>
			</div>
		</div>
		`
		htmlList = htmlList + taskHtml
	})

	list_add.innerHTML = htmlList
}




list_add.onclick = (event)=>{
	const target = event.target
	const ischeked = event.target.checked
	if(ischeked == true){
		const task = target.parentElement.parentElement
		const idtask = task.getAttribute('id')
		changeTaskStatus(idtask, ischeked, task_list) 
		renderListTask(task_list)}
		else{
			const task = target.parentElement.parentElement
			const idtask = task.getAttribute('id')
			changeTaskStatus(idtask, ischeked, task_list) 
			renderListTask(task_list)
		}
	if(event.target.id){
		const task = target.parentElement.parentElement
		const id_task = task.getAttribute('id')
		deleteTask(id_task, task_list)
		renderListTask(task_list)
	}
}



function changeTaskStatus(idtask, ischeked, task_lis){
	task_lis.forEach(element => {
		if(element.id === Number(idtask)){
			element.isComplete = ischeked
		}
	});
}



function deleteTask (id, task_list){
	task_list.forEach((element, index) => {
		if(element.id == id){
			task_list.splice(index, 1)
		}
	});
}


 


