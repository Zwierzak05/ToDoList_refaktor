{   
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const removeTask = (indexTask) => {
        tasks.splice(indexTask, 1);
        render();
    };

    toggleTaskDone = (indexTask) => {
        tasks[indexTask].done = !tasks[indexTask].done;
        render();
    };

    bindEvent = () =>{
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, indexTask) => {
            removeButton.addEventListener("click", () =>{
                removeTask(indexTask);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");
        toggleDoneButtons.forEach((toggleDoneButton, indexTask) => {
            toggleDoneButton.addEventListener("click", () =>{
              toggleTaskDone(indexTask);
            });
        });
    };

    const render = () => {
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
        }

        document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;

        bindEvent();
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