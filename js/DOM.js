const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos"; 
//Penambahan 3
const TODO_ITEMID = "itemId";

function addTodo() {
    const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID );

    const textTodo = document.getElementById("title").value;
    const timestamp = document.getElementById("date").value;
    //Penerapan timestamp jadi ini tidak diperlukan
    //console.log("todo" + textTodo);
    //console.log("timestamp" + timestamp);

    //Perulangan untuk mengecek sebelum diterapkan timestamp (baris 17) for (let i = 0; i < 10; i++) {
        const todo = makeTodo(textTodo, timestamp);
        //Penambahan 3
        const todoObject = composeTodoObject(textTodo, timestamp, false);

        todo[TODO_ITEMID] = todoObject.id;
        todos.push(todoObject);

        uncompletedTODOList.append(todo);
        //Penambahan 3
        updateDataToStorage();
    //}
}

function makeTodo(data, timestamp, isCompleted) {
 
    const textTitle = document.createElement("h2");
    textTitle.innerText = data;
 
    const textTimestamp = document.createElement("p");
    textTimestamp.innerText = timestamp;

    /* Item to do yang belum dinamis
    const textTitle = document.createElement("h2");
    textTitle.innerText = "Tugas Android";
 
    const textTimestamp = document.createElement("p");
    textTimestamp.innerText = "2021-05-01";
    */

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textTimestamp);
 
    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);
    
    if(isCompleted){
        container.append(createUndoButton(), createTrashButton());
    } else {
        container.append(createCheckButton());
    }

    return container;
}

function createButton(buttonTypeClass , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addTaskToCompleted(taskElement /*HTML ELEMENT*/) {
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;
 
    const newTodo = makeTodo(taskTitle, taskTimestamp, true);
    //Penambahan 3
    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = true;
    newTodo[TODO_ITEMID] = todo.id;


    listCompleted.append(newTodo);
    taskElement.remove();

    //Penambahan 3
    updateDataToStorage();
}

function createCheckButton() {
    return createButton("check-button", function(event){
         addTaskToCompleted(event.target.parentElement);
    });
}

function removeTaskFromCompleted(taskElement) {
    //Penambahan 3
    const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
    todos.splice(todoPosition, 1);
    
    taskElement.remove();
    //Penambahan 3
    updateDataToStorage();
}

function createTrashButton() {
    return createButton("trash-button", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    });
}

/*
function undoTaskFromCompleted(taskElement){
    const newTodo = makeTodo(taskTitle, taskTimestamp, false);
}*/

function undoTaskFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;
 
    const newTodo = makeTodo(taskTitle, taskTimestamp, false);

    //Penambahan3
    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = false;
    newTodo[TODO_ITEMID] = todo.id;
    
    listUncompleted.append(newTodo);
    taskElement.remove();

    //Penambahan3
    updateDataToStorage();
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}