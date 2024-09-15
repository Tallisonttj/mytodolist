let input = document.querySelector('.input')
let list  = document.querySelector('.list')
let body = document.querySelector('body')
let icon = document.querySelector('.icon')

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

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme')

    // Aplicar o tema salvo
    if (savedTheme === 'light') {
        body.classList.add('wht')
        input.classList.add('inp-white')
        icon.setAttribute('src', "assets/images/icons8-dark-48.png")
    } else if (savedTheme === 'dark') {
        body.classList.remove('wht')
        input.classList.remove('inp-white')
        icon.setAttribute('src', "assets/images/icons8-light-48.png")
    }
})

let btheme = document.querySelector('.theme')
btheme.addEventListener('click', darkMode)

function darkMode() {
    body.classList.toggle('wht')
    input.classList.toggle('inp-white')

    // Salvar o tema no localStorage
    if (body.classList.contains('wht')) {
        icon.setAttribute('src', "assets/images/icons8-dark-48.png")
        localStorage.setItem('theme', 'light')
    } else {
        icon.setAttribute('src', "assets/images/icons8-light-48.png")
        localStorage.setItem('theme', 'dark')
    }
}