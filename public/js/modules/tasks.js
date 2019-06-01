const tasks = document.querySelector('.listado-pendientes');

if (tasks && typeof tasks !== 'undefined'){
    tasks.addEventListener('click', event => {
        if (event.target.classList.contains('fa-check-circle')) {
            const icon = event.target;
            const taskId = icon.parentElement.parentElement.dataset.task;
            console.log('', taskId)
        } else if (event.target.classList.contains('fa-trash')){
        } else {
        }
    })
}

export default tasks;