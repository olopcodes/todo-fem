$(document).ready(function () {
    // variables
    let todosLeft = 0;
    const addTodoBtn = $('#add-todo');
    const todoInput = $('.todo-input');
    const todoListEl = $('.todo-list');
    const themeBtnEl = $('.todo-btn-theme');
    const todoStatsEl = $('.todo-stats');
    const todosLeftSpan = $('.todo-left span');
    const todoFiltersBoxEl = $('.todo-filter-box');
    const data = [
      // {
      //   id: 1,
      //   text: 'code',
      //   completed: false,
      // }
    ];

    // listeners

    // add todo handler
    $(addTodoBtn).click(function (e) { 
        e.preventDefault();
        if(todoInput.val().length >= 3) {
            const newTodoText = todoInput.val();

            // form todo html in this function
            const newTodoEl = todoHMTL(newTodoText);

            // add todo to data
            

            // add new todo to the list
            $(todoListEl).append(newTodoEl);

            // increase todos left
            incrementTodosLeft();

            // display stats and filter box
            showStatsAndFilters();

            // show drag text when more than 1 todo present
            toggleDragText();
        } else {
            alert('todo needs to be more than 3 characters')
        }
        // clear todo input
        todoInput.val(''); 
    });

    // todo list handler
    $(todoListEl).click(function (e) {
      // capture button
      const buttonEl = $(e.target).closest('button');

      // person clicked on check
      if($(buttonEl).hasClass('todo-check-btn')) {

        $(buttonEl).parent().addClass('complete');
        
        decrementTodosLeft();
      } else if ($(buttonEl).hasClass('todo-delete-btn')) {

        // person clikced on remove
        $(buttonEl).parent().remove()

        // decrease todos left
        decrementTodosLeft();
        
        // remove drag text when less than 2 items left
        toggleDragText();
      } else if ($(buttonEl).hasClass('todo-clear')) {
        // person clicked on clear todos
        // get all complete todos
        const completeTodos = ($('.todo-item.complete'));

        // remove complete class
        completeTodos.removeClass('complete')
        
        // update todos left
        for(let todos = $('.todo-item').length; todos > 0; todos--) {
          incrementTodosLeft();
        }
        
        // loop over todos alternative
        // let todos = $('.todo-item')
        // $.each(todos, function (indexInArray, valueOfElement) { 
        //    incrementTodosLeft();
        // });
      }
    });

    $(todoFiltersBoxEl).click(function(e) {
      let todos;
      
      if($(e.target).attr('id') === 'todo-all') {
        // get all todos 
        todos = $('.todo-item')

      } else if($(e.target).attr('id') === 'todo-active') {
      
        // get todo items that do not have the complete class
        todos = $('.todo-item').not('.complete');

      } else if($(e.target).attr('id') === 'todo-completed') {

        // get completed todos
        todos = $('.todo-item.complete');
      }

      let html = '';
      
      // for(let i = todos.length; i >= 0; i--) {
      //   console.log(todos[i])
      // }
      $.each($(todos), function (indexInArray, valueOfElement) { 
         const text = $(todos[indexInArray]).text().trim();
        console.log(text)

          html += todoHMTL(text);
      });

      // clear todoList
      todoListEl.html('');

      todoListEl.append(html);
    })

    // functions
    function incrementTodosLeft() {
      // increase nuumber of todos to be completed
      todosLeft++;
      // update todos left text
      todosLeftSpan.text(todosLeft);
    }

    function decrementTodosLeft () {
      if(todosLeft === 0) return;
      // increase nuumber of todos to be completed
      todosLeft--;
      // update todos left text
      todosLeftSpan.text(todosLeft);
    }

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

    function toggleDragText() {
      if(todosLeft >= 2) {
        $('.todo-drag-text').removeClass('hide')   
      } else {
        $('.todo-drag-text').addClass('hide')
      }
    }

    function showStatsAndFilters () {
      // show stats box;
      todoStatsEl.removeClass('hide');

      // show filter box
      todoFiltersBoxEl.removeClass('hide');
    }
});
