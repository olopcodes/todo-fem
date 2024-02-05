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
    const modalBtn = $('.todo-btn-modal');
    const data = [];

    // listeners

    // theme handler ===========================
    $(themeBtnEl).click(function(e) {
      toggleThemeColor();
    })

    // modal btn handler ========================
    $(modalBtn).click(function(e) {
      $('.todo-modal-wrapper').addClass('hide');
    })

    // todo handler =================================
    $(addTodoBtn).click(function (e) { 
        e.preventDefault();

        const isInputValid = validateTodo($(todoInput).val());

        if(isInputValid) {
            // get value from input
            const newTodoText = todoInput.val();

            // create todo obj
            const todoObj = {text: newTodoText, completed: false, id: Math.floor(Math.random() * 100000000000000)+1};

            // add todo to dataobj to data
            data.push(todoObj);

            // form todo html in this function
            const newTodoEl = todoHTML(todoObj);

            // add new todo to the list
            $(todoListEl).append(newTodoEl);

            // show todos left
            getTodosLeft();

            // display stats and filter box
            showStatsAndFilters();

            // show drag text when more than 1 todo present
            toggleDragText();

        } 
        // clear todo input
        todoInput.val(''); 
    });

    // todo list handler =========================================
    $(todoListEl).click(function (e) {
      // capture button
      const buttonEl = $(e.target).closest('button');

      // todo item
      const todoItem = $(e.target).closest('li');

      // get id 
      const todoId = $(e.target).closest('li').attr('id');
      
      // person clicked on check
      if($(buttonEl).hasClass('todo-check-btn')) {

        // if complete is present
        if($(todoItem).hasClass('complete')) {

          // remove complete class
          $(buttonEl).parent().removeClass('complete');

          // remove complete
          updateCompletedTodos(todoId, false);

          // unhide delete button
          $(`#${todoId} .todo-delete-btn`).removeClass('hide');

        } else {

          // add complete class
          $(buttonEl).parent().addClass('complete');

          // add complete
          updateCompletedTodos(todoId, true);
          
          // hide the delete btn
          $(`#${todoId} .todo-delete-btn`).addClass('hide');
          
        }


      } else if ($(buttonEl).hasClass('todo-delete-btn')) {
         // delete todo item from dom
         $(buttonEl).parent().remove();

        //  remove todo from data
        for(let i = data.length-1; i >= 0; i--) {
          if(data[i].id === Number(todoId)) {
            data.splice(i, 1);
          }
        }
         
        toggleDragText();

      } else if ($(buttonEl).hasClass('todo-clear')) {
        // person clicked on clear todos
        
        // remove completed from all todos in data
        $.each(data, function (indexInArray, valueOfElement) { 
           if(data[indexInArray].completed) {
            // remove complete class
            $(`#${data[indexInArray].id}.complete`).removeClass('complete');

            // change todo back to false
            data[indexInArray].completed = false;

            // unhide the delete btn
            $(`#${data[indexInArray].id} .todo-delete-btn`).removeClass('hide');
           }
        });
      }

      toggleDisbaledClass();

      // show todos left
      getTodosLeft();
    });


    // filter todos ===============================

    $(todoFiltersBoxEl).click(function(e) {
      let todos = [];

      $('.todo-btn').removeClass('active');
      $(e.target).addClass('active');
      
      if($(e.target).attr('id') === 'todo-all') {
        // get all todos 
        todos = data

        console.log(todos)

      } else if($(e.target).attr('id') === 'todo-active') {
        // get active todos
        for(let i = data.length-1; i >= 0; i--) {
          if(!data[i].completed) {
            todos.push(data[i]);
          }
        }  


      } else if($(e.target).attr('id') === 'todo-completed') {

        // get completed todos
        for(let i = data.length-1; i >= 0; i--) {
          if(data[i].completed) {
            todos.push(data[i]);
          }
        }  
      }

      let html = '';
      
      // if todos array is empty
      if(todos.length === 0) return;

      $.each($(todos), function (indexInArray, valueOfElement) { 

          html += todoHTML(todos[indexInArray]);
      });

      // remove todo items from dom
      $('.todo-item').remove();

      // add todos filtered to dom
      todoListEl.append(html);
    })

    // functions

    function toggleThemeColor() {
      if($('body').hasClass('light')) {
        $('body').removeClass('light');
        $('.todo-btn-theme img').attr('src', './images/icon-sun.svg');
        $('body').attr('id', 'dark-theme');
      } else {
        $('body').addClass('light');
        $('.todo-btn-theme img').attr('src', './images/icon-moon.svg');
        $('body').attr('id', '');
      }
    }
    
    // sort and drop todo items ==============================
    function sortable () {
        // make list sortable except for this item
        $(todoListEl).sortable({
          cancel: ".todo-stats",
          placeholder: 'highlight'
     });
    }


    //  validate todos ========================
    function validateTodo(text) {
      // check if text has a number
      const hasNumber = /\d/g;
      const hasSpecialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if(hasNumber.test(text) || text.length < 3 ||hasSpecialCharacter.test(text)) {
        $('.todo-modal-wrapper').removeClass('hide');
        return false
      } else {
        return true;
      }
      
    }

    function todoHTML (data) { 
        return `
        <li id="${data.id}" class="todo-item ${data.completed ? 'complete' : ''}">
        <button class="todo-check-btn todo-circle">
          <img src="./images/icon-check.svg" alt="check">
        </button>
        
        <button class="todo-delete-btn">
          <img src="./images/icon-cross.svg" alt="delete">
        </button>
          <p class="todo-text">${data.text}</p>
        </li>
        `
     } 

     function toggleDisbaledClass () {
      let hasCompleteTodos = 0;

      for(let i = data.length-1; i >= 0; i--) {
        if(data[i].completed) hasCompleteTodos++;
      }

      if(hasCompleteTodos === 0 || data.length === 0) {
        $('.todo-clear').addClass('disabled');
      } else {
        $('.todo-clear').removeClass('disabled');
      }

     }

    function toggleDragText() {
      if(data.length >= 2) {
        sortable();

        $('.todo-drag-text').removeClass('hide')   
      } else {
        $('.todo-drag-text').addClass('hide')
      }
    }

    function showStatsAndFilters () {
      if(data.length > 0) {
        // show stats box;
      todoStatsEl.removeClass('hide');

      // show filter box
      todoFiltersBoxEl.removeClass('hide');
      }

      
    }

    function updateCompletedTodos (todoId, boolean) {
      // update the data for complete todos
      $.each(data, function (indexInArray, valueOfElement) { 
        if(data[indexInArray].id === Number(todoId)) {
          data[indexInArray].completed = boolean;
        }
      });
    }

    function getTodosLeft () {
      let todosLeft = 0;

      $.each(data, function (indexInArray, valueOfElement) { 
          if(data[indexInArray].completed === false) {
            todosLeft++;
          }
      });

      todosLeftSpan.text(todosLeft);
    }
});
