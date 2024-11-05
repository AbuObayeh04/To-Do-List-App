const input = document.querySelector(".input");
const submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let tasksArray = [];

if (localStorage.getItem("task")) {
  tasksArray = JSON.parse(localStorage.getItem("task"));
}

getData();

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTask(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("task")) {
    toggleStatus(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function handleAddTask(){
   if (input.value !== "") {
    addTask(input.value);
    input.value = "";
  }
}

submit.addEventListener("click", handleAddTask);
input.addEventListener("keypress" , function(event){
  if (event.key == "Enter") handleAddTask() ; 
});

function addTask(taskText) {
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasksArray.push(task);
  addElemets(tasksArray);
  addData(tasksArray);
}

function addElemets(tasksArray) {
  tasksDiv.innerHTML = "";

  tasksArray.forEach((task) => {
    // Create the div task
    const div = document.createElement("div");
    div.className = "task";

    if (task.completed) {
      div.className = "task done";
    }

    div.appendChild(document.createTextNode(task.text));
    div.setAttribute("data-id", task.id);

    // Create the Delete Btn
    const span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
}

function addData(tasksArray) {
  window.localStorage.setItem("task", JSON.stringify(tasksArray));
}

function getData() {
  const data = localStorage.getItem("task");
  if (data) {
    let tasks = JSON.parse(data);
    addElemets(tasks);
  }
}

function deleteTask(taskId) {
  tasksArray = tasksArray.filter((task) => task.id != taskId);
  addData(tasksArray);
}

function toggleStatus(taskId) {
  for (let i = 0; i < tasksArray.length; ++i) {
    if (tasksArray[i].id == taskId) {
      tasksArray[i].completed == false
        ? (tasksArray[i].completed = true)
        : (tasksArray[i].completed = false);
    }
  }
  addData(tasksArray);
}
