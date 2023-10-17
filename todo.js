//Array to put todo objects
const todoArr = [];
//Declaring variables outside main codeblock
const inputBar = document.querySelector("#inputBar");

const todoCount = document.querySelector("#todoCount");

let completed = 0;

const todoList = document.querySelector("main");

const addTodoBtn = document.querySelector("#addTodoBtn");

const alertText = document.querySelector("#alert");

//The main codeblock, click event to make + button add input into list
addTodoBtn.addEventListener("click", () => {
  //Variable that has the value of inputbar textcontent
  text = inputBar.value;
  //If statement that doesnt let you put in nothing in inputbar
  if (text.length == 0) {
    alertText.innerText = "Input must not be empty";
    alertText.setAttribute("class", "alertAnimation");
    setTimeout(() => {
      alertText.setAttribute("class", "");
    }, 800);

    return;
  } else {
    alertText.innerText = "";
    alertText.setAttribute("class", "");
  }
  //Declaration of variables inside scope that creates elements in HTML
  const container = document.createElement("article");

  const trash = document.createElement("a");
  trash.innerHTML = "&#x1F5D1;";

  const todoItem = document.createElement("li");
  todoItem.innerText = text;
  //Variable to get text from li to use in functions
  let todoText = todoItem.innerText;
  //Adding childelements to article element
  container.appendChild(todoItem);
  container.appendChild(trash);

  //Adding article element as child to main element
  todoList.appendChild(container);
  ///Creating object with text content of inputbar and status of false to push into array.
  const todoObject = {
    name: text,
    status: false,
  };
  //Pushing object into array
  todoArr.push(todoObject);

  //Click event for li element. Checks if  li element has a class and adds if not.
  todoItem.addEventListener("click", () => {
    if (todoItem.getAttribute("class") == "checked") {
      //Sets li element class to nothing
      todoItem.setAttribute("class", "");
      //Retracts 1 from finished todo
      completed--;

      //Calls function to change status of object
      changeStatus(todoText, false);
    } else {
      //Sets li element class to checked
      todoItem.setAttribute("class", "checked");
      //Adds 1 to finished todos
      completed++;

      //Calls function to change status of object
      changeStatus(todoText, true);
    }
    //Adds or retracts finished todos count
    todoCount.innerText = `${completed} completed`;
  });

  //click event for trash icon that removes todo.
  trash.addEventListener("click", () => {
    //If finished todo count is higher than 0 it retracts 1.
    if (completed > 0) {
      //Calls function to remove object from array
      removeListObject(todoText);
      //Retracts 1 from finished todos
      completed--;
      //Removes article element wich contains todo
      container.remove();
    } else {
      //Calls function to remove object from array
      removeListObject(todoText);
      //Removes article element wich contains todo
      container.remove();
    }
    //Adds or retracts finished todos count
    todoCount.innerText = `${completed} completed`;
  });
  //Removes text user wrote in inputbar after pressing + button
  inputBar.value = "";
});
//Finds correct index in todoArr with todoText then changes objects status to true/false
function changeStatus(todoText, checked) {
  let checkIndex = todoArr
    .map((todoObject) => todoObject.name)
    .indexOf(todoText);

  todoArr[checkIndex].status = checked;
}

//Finds correct index in todoArr with todoText then removes that object from array
function removeListObject(todoText) {
  let checkIndex = todoArr
    .map((todoObject) => todoObject.name)
    .indexOf(todoText);
  todoArr.splice(checkIndex, 1);
}
