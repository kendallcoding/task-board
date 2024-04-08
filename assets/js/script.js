// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskTitleInput = document.querySelector('#taskTitle');
const taskDueDateInput = document.querySelector('#taskDueDate');
const taskDescriptionInput = document.querySelector('#description');
const submitButton = document.querySelector('#submitButton')


// Todo: create a function to generate a unique task id


function generateTaskId()  {
  nextId = {
  id: crypto.randomUUID(),
  title: taskTitle,
  dueDate: taskDueDate,
  description: taskDescription,
  status: "to-do",
    
  }

};

function saveNextIdToStorage() { // this line of code takes the first or nextId and saves it to local storage
localStorage.setItem('nextId', JSON.stringify(nextId)); // this line of code takes the nextId array, converts it to a string within the local storage
}


// Todo: create a function to create a task card
function createTaskCard(taskList) {

  const taskCard = $('<div>') //This created a new divison element for us to create the card
  .addClass('card project-card draggaable my-3') // this code adding the classes to each element of the <div> tag, each word followed by a space is being added
  .attr('data-task-id', nextId) // this code is giving the card and ID and assinging it the value of nextID, which we are pulling that information from local storage, so if there is nothing stored, it will give it the ID of 1
const cardHeader = $('div').addClass('card-head h4').text(taskTitle) // this code is creating the division for the card header and the properties of the header and the title of the task
const cardBody = $('p').addClass('card-text').text(description) // this code is creating a paragraph section that is putting the input of the taks description on to the card
const cardDueDate = $('p').addClass('card-body').text(taskDueDate) // this code is creating the paragraph section for the card body and giving space for the task due date
const cardDeleteBtn = $('<button>') // this code is creating the delete button element
.addClass('btn btn-danger delete') // this code is creating the delete button on the task card
  .text('Delete') // this code is giving us the text delete on the task button
  .attr('data-task-id', nextId) // this code is pulling the ID of the card created from local storage
  cardDeletetBtn.on('click', handleDeleteTask);  // this code is giving the the delete button on the card the ability when clicked to delete the card

if (taskDueDate !== 'done') { // this code is saying if the taskDueDate doens't equal 'done' then create the card with the due date
const now = dayjs();
const taskDueDateDate = dayjs(taskDueDate, 'DD/MM/YYYY');


if (now.isSame(taskDueDateDate, 'day')) { // this loop changes the warning displayed by the card depending on if the due date is before/same day or after the due date
  taskCard.addClass('bg-warning text-white')
} else if (now.isAfter(taskDueDateDate)) {
    taskCard.addClass('bg-danger text-white')
    cardDeletetionBtn.addClass('border-light')
}

}
 
cardBody.append(description, cardDueDate, cardDeleteBtn);
taskCard.append(cardHeader, cardBody)

 return taskCard;


}


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() { 
const tasks = readTaskListFromStorage();

  }

  tasks.forEach(task => {
    const taskCard = createTaskCard(task);
    taskList.appendChild(taskCard);
  })
$('.task-list').draggable();

return tasks;




// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();


  const taskTitle = $('#taskTitle').val().trim();
  const taskDueDate = $('#taskDueDate').val();
  const description = $('#description').val().trim();
  
  const newCard = {
   title: taskTitle,
   dueDate: taskDueDate,
  description: description,
  status: "to-do"
    
    
    }


  

  //const nextId = readNextIdFromStorage();
  //nextId.push(newCard);
  
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  let taskId = $(this).attr('data-task-id');
  taskList = taskList.filter(task => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(taskList));


}

// Todo: create a function to handle dropping a task into a new status lane
  function handleDrop(event, ui) {
    const projects = readNextIdFromStorage();
    const taskId = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.closest('.task-column').dataset.status;

    const task = projects.find(task => task.id === taskId);
    task.status = newStatus;

    saveNextIdToStorage(nextId);
    renderTaskList();
  }


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
  $(document).ready(function () {
    $(submitButton).on('click', handleAddTask);
  });
