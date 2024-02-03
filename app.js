$(document).ready(function () {
    // variables
    const addTodoBtn = $('#add-todo')[0]
    const todoInput = $('.todo-input');
    const todoListEl = $('.todo-list')[0];
    const themeBtnEl = $('.todo-btn-theme')[0];
    const todosLeftSpan = $('.todo-left span')[0];
    const todoFiltersBoxEl = $('.todo-filter-box')[0];

    // listeners

    $(addTodoBtn).click(function (e) { 
        e.preventDefault();
        if(todoInput.val().length >= 3) {
            const newTodoText = todoInput.val();
            // form todo html in this function
            const newTodoEl = todoHMTL(newTodoText);
            // insert, add new todo item after last todo item
            $(newTodoEl).insertAfter('.todo-item:last');
            
        } else {
            alert('todo needs to be more than 3 characters')
        }

        // clear todo input
        todoInput.val('');
        
    });

    function todoHMTL (text) { 
        return `
        <li class="todo-item">
        <button class="todo-check-btn todo-circle">
          <img src="./images/icon-check.svg" alt="check">
        </button>
        
        <button class="todo-delete-btn">
          <img src="./images/icon-cross.svg" alt="delete">
        </button>
          <p class="todo-text">${text}</p>
        </li>
        `
     } 

    
});
