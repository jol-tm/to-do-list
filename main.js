$(document).ready(function(){
    const restoreTasks = () => { $('#tasks').html(tasks); }
    restoreTasks();
    $('#addTaskBtn').on('click', addTask);
    $('.editBtn').on('click', editTask);
    $('.removeBtn').on('click', removeTask);
    $('.taskCheck').on('click', handleCheck);
})

let tasks = localStorage.getItem('tasks') || '';

function addTask() {
    let taskInput = $('#taskInput');
    let taskItem = (
        `<div class="taskItem">
            <div class="boxTask">
                <input class="taskCheck" type="checkbox">
                <input class="taskDesc" type="text" value="${taskInput.val()}" maxlength="50" placeholder="Insira algo" readonly>
                <hr class="crossOut">
            </div>
            <div class="boxBtns">
                <button class="editBtn"><img src="icons/pencil.svg" alt="Editar"></button>
                <button class="removeBtn"><img src="icons/trash.svg" alt="Apagar"></button>
            </div>
        </div>`
        );

    if (taskInput.val() == '') {
        taskInput.css('border', '2px solid tomato');
    } else {
        taskInput.css('border', 'var(--border)');
        $('#tasks').prepend(taskItem);
        tasks = $('#tasks').html();
        localStorage.setItem('tasks', tasks);
        taskInput.val(''); 
        // removes all the old event handlers before adding new ones to prevent having more than one
        $('.editBtn').off(); 
        $('.editBtn').on('click', editTask);
        $('.removeBtn').off();
        $('.removeBtn').on('click', removeTask);
        $('.taskCheck').off();
        $('.taskCheck').on('click', handleCheck);
    }
}

function editTask() {
    let desc = $(this).parent().prev().children('.taskDesc');
    let editBtn = $(this);
    let newDesc = desc.val();
    desc.val(''); // clears the input and refill it to put the cursor in the end
    desc.val(newDesc);
    
    if (desc.attr('readonly')) {
        desc.removeAttr('readonly');
        desc.css('color', 'lightseagreen');
        desc.focus();
        editBtn.html('<img src="icons/editOff.svg" alt="Parar edição">');
    } else if (newDesc != '') {
        desc.attr('value', newDesc);
        desc.attr('readonly', '');
        desc.css('color', 'black');
        desc.blur();
        editBtn.html('<img src="icons/pencil.svg" alt="Editar">');
        tasks = $('#tasks').html();
        localStorage.setItem('tasks', tasks);
    }
}

function removeTask() {
    let taskItem = $(this).parent().parent();
    taskItem.css({'scale': .75, 'opacity': 0});

    setTimeout(() => {
        taskItem.remove();
        tasks = $('#tasks').html();
        localStorage.setItem('tasks', tasks);
    }, 300);
}

function handleCheck() {
    let taskCheck = $(this);
    let crossOut = $(this).siblings('.crossOut');

    if (taskCheck.attr('checked')) {
        taskCheck.removeAttr('checked');
        crossOut.css({'width': '0%', 'border': '0px solid black'});
    } else {
        taskCheck.attr('checked', '');
        crossOut.css({'width': '90%', 'border': '.5px solid black'});
    }
    tasks = $('#tasks').html();
    localStorage.setItem('tasks', tasks);
}