let input = document.querySelector('.input')
let list  = document.querySelector('.list')
let tasks = []
let selectTask = null

input.addEventListener('keyup', (event) =>{
    if(event.key.toLowerCase() =='enter' && input.value.length > 0){
        tasks.push(
            {done: false, list: input.value}
        )
        renderlist()
    }
})


function renderlist(){
        list.innerHTML = ''
    for( let i in tasks){
        let tasksList = document.createElement('li')
        let taskInput = document.createElement('input')
        taskInput.setAttribute('type', 'checkbox')

        if(tasks[i].done === true){
            taskInput.setAttribute('checked', 'true')
            tasksList.classList.add('ok')
        }
        taskInput.addEventListener('click', () => {
            tasks[i].done = !tasks[i].done
            renderlist()
        })
        
        tasksList.appendChild(taskInput)
        let taskSpam = document.createElement('spam')
        taskSpam.innerHTML = tasks[i].list
        tasksList.appendChild(taskSpam)
        list.appendChild(tasksList)
        input.value = ''

        let index = i 
        taskSpam.addEventListener('click', () => {
            let alert = document.querySelector('#alert')
            alert.classList.replace('alert', 'open')
            selectTask = index
            
            let p = document.querySelectorAll('p')
            p.forEach(Element => {
                Element.addEventListener('click', () => {
                    if(Element.classList.contains('yes')){
                        alert.classList.replace('open', 'alert')
                        if(selectTask !== null){
                            tasks.splice(selectTask, 1)
                            selectTask = null
                            renderlist()
                        }
                    }else{
                        alert.classList.replace( 'open' , 'alert')
                        selectTask = null
                    }
                })
            })
        })
    }
}