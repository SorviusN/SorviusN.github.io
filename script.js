/*importing elements from HTML source */
const usersContainer = document.querySelector('[users-list]')
const newUserForm = document.querySelector('[data-new-user-form')
const newUserInput = document.querySelector('[data-new-user-input')
const deleteUserButton = document.querySelector('[data-delete-user-button]')
const userDisplayContainer = document.querySelector('[data-user-display-container]')
const userTitleElement = document.querySelector('[data-user-title]')
const userCountElement = document.querySelector('[data-user-count]')

const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input')
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks]')

/*creating local storage key value pairs for the browser to store*/
const LOCAL_STORAGE_USER_KEY = 'task.users' 
const LOCAL_STORAGE_SELECTED_USER_ID_KEY = 'task.selectedUserId' 
let users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY)) || []
let selectedUserId = localStorage.getItem(LOCAL_STORAGE_SELECTED_USER_ID_KEY )

// adds users to the main user list
usersContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li')
    selectedUserId = e.target.dataset.userId
    saveAndRender()
})
// adds tasks for a user to complete
tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedUser = users.find(user => user.id === selectedUserId)
        const selectedTask = selectedUser.tasks.find(task => task.id === e.target.id)
        selectedTask.complete = e.target.checked
        save()
        renderTaskCount(selectedUser)
    }
})
// checks whether or not a user is highlighted currently. If none are highlighted then do not display any list.
function render() {
    clearElement(usersContainer)
    renderUsers()

    const selectedUser = users.find(user => user.id === selectedUserId)
    if (selectedUserId == null){
        userDisplayContainer.style.display = 'none'
    }
    else {
        userDisplayContainer.style.display = ''
        userTitleElement.innerText = selectedUser.name
        renderTaskCount(selectedUser)
        clearElement(tasksContainer)
        renderTasks(selectedUser)
    }
}
// renders all tasks from the current user that is selected.
function renderTasks(selectedUser) {
    selectedUser.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.name)
        tasksContainer.appendChild(taskElement)
    })
}
// dynamically displays the task count in text format to the user
function renderTaskCount(selectedUser) {
    const incompleteTaskCount = selectedUser.tasks.filter(task => !task.complete).length
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
    userCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
}
//
function createUser(name) {
    return { id: Date.now().toString(),     
        name: name,
        tasks: []
    }   
}

function createTask(name) {
    return { id: Date.now().toString(),     
        name: name,
        completed: false
    }   
}

function renderUsers() {
    users.forEach(user => {
        const userElement = document.createElement('li')
        userElement.classList.add("user-name")
        userElement.innerText = user.name
        userElement.dataset.userId = user.id
        if (user.id === selectedUserId) userElement.classList.add('active-user')
        usersContainer.appendChild(userElement)
    })
}

clearCompleteTasksButton.addEventListener('click', e => {
    const selectedUser = users.find(user => user.id === selectedUserId)
    selectedUser.tasks = selectedUser.tasks.filter(task => !task.complete)
    saveAndRender()
})

deleteUserButton.addEventListener('click', e => {
    users = users.filter(user => user.id !== selectedUserId)
    selectedUserId = null
    saveAndRender()
})

newUserForm.addEventListener('submit', e  => {
e.preventDefault();
const userName = newUserInput.value
if (userName == null || userName === '') return
const user = createUser(userName)
newUserInput.value = null
users.push(user)
saveAndRender()
})

newTaskForm.addEventListener('submit', e  => {
e.preventDefault();
const taskName = newTaskInput.value
if (taskName == null || taskName === '') return
const task = createTask(taskName)
newTaskInput.value = null
const selectedUser = users.find(user => user.id === selectedUserId)
selectedUser.tasks.push(task)
saveAndRender()
})

/*A save function for saving to local storage */
function save() {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(users))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_USER_ID_KEY, selectedUserId)
}

/* combines the save and render option */
function saveAndRender() {
    save()
    render()
}

/* clears the parameter */
function clearElement(element) { 
    while(element.firstChild) { 
        element.removeChild(element.firstChild)
    }
}

render()