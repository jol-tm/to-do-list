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
        `<div class="taskItem taskItemAnim">
            <div class="boxTask">
                <input class="taskCheck" type="checkbox">
                <input class="taskDesc" type="text" value="${taskInput.val()}" maxlength="50" readonly>
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
        taskInput.attr('placeholder', 'Insira algo');
    } else {
        taskInput.css('border', 'var(--border)');
        taskInput.attr('placeholder', 'Insira uma tarefa para adicioná-la');
        $('.taskItem').removeClass('taskItemAnim');
        tasks = $('#tasks').html();
        tasks = taskItem + tasks;
        localStorage.setItem('tasks', tasks);
        $('#tasks').html(tasks);
    }
    taskInput.val('');
    $('.editBtn').on('click', editTask);
    $('.removeBtn').on('click', removeTask);
    $('.taskCheck').on('click', handleCheck);
}

function editTask() {
    let desc = $(this).parent().prev().children('.taskDesc');
    let editBtn = $(this);
    let newDesc = desc.val();
    desc.val('');
    desc.val(newDesc);
    
    if (desc.attr('readonly')) {
        desc.removeAttr('readonly');
        desc.css('color', 'lightseagreen');
        desc.focus();
        editBtn.text('✓');
    } else {
        newDesc = desc.val();
        desc.attr('value', newDesc);
        desc.attr('readonly', '');
        desc.css('color', 'black');
        desc.blur();
        editBtn.html('<img src="icons/pencil.svg" alt="Editar">');
    }
    tasks = $('#tasks').html();
    localStorage.setItem('tasks', tasks);
}

function removeTask() {
    let desc = $(this).parent().parent();
    desc.css('scale', 0);

    setTimeout(() => {
        desc.remove();
        tasks = $('#tasks').html();
        localStorage.setItem('tasks', tasks);
    }, 500);
}

function handleCheck() {
    let taskCheck = $(this);
    let crossOut = $(this).siblings('.crossOut');

    if (taskCheck.attr('checked')) {
        taskCheck.removeAttr('checked');
        crossOut.css({'width': '0%', 'border':  '0px solid black'});
    } else {
        taskCheck.attr('checked', '');
        crossOut.css({'width': '90%', 'border': '1px solid black'});
    }
    tasks = $('#tasks').html();
    localStorage.setItem('tasks', tasks);
}