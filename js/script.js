{   
    let tasks = [];
    let hideDoneTask = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent }];

        render();
    };

    const removeTask = (indexTask) => {
        tasks = [
            ...tasks.slice(0, indexTask),
            ...tasks.slice(indexTask + 1)
        ];

        render();
    };

    const toggleTaskDone = (indexTask) => {
        tasks = [
            ...tasks.slice(0, indexTask),
            {
                ...tasks[indexTask],
                done: !tasks[indexTask].done,
            },
            ...tasks.slice(indexTask + 1)
        ];
        
        render();
    };

    const bindRemoveEvent = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, indexTask) => {
            removeButton.addEventListener("click", () =>{
                removeTask(indexTask);
            });
        });
    };

    const bindToggleDoneEvent = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");
        toggleDoneButtons.forEach((toggleDoneButton, indexTask) => {
            toggleDoneButton.addEventListener("click", () =>{
              toggleTaskDone(indexTask);
            });
        });
    };

    const renderTask = () => { 
        let tasksListHTMLContent = "";
        for(const task of tasks){
        tasksListHTMLContent += `
            <li class="task__item">
            <button class=" task__button task__button--toggleDone js-toggleDone"> ${task.done ? "✔" : ""}</button>
            <span class="task__content ${task.done ? " task__content--done" : ""}"> 
                ${task.content}
            </span>
            <button class=" task__button task__button--remove js-remove">X</button>
            </li>
        `
        };

    document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;

    };
    const renderButton = () => {};

    const bindButtonsEvents = () =>{};

    const render = () => {
        renderTask();
        renderButton();
    
        bindRemoveEvent();
        bindToggleDoneEvent();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) =>{
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();
        if(newTaskContent !== ""){
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
       
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}