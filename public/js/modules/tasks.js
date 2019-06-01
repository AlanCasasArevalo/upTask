const axios = require("axios");
const tasks = document.querySelector('.listado-pendientes');

if (tasks && typeof tasks !== 'undefined'){
    tasks.addEventListener('click', event => {
        if (event.target.classList.contains('fa-check-circle')) {
            const icon = event.target;
            const taskId = icon.parentElement.parentElement.dataset.task;
            const url = `${location.origin}/tasks/${taskId}`;

            axios.patch(
                url, {
                    taskId
                })
                .then(function (response) {
                    console.log('', response)
                })
                .catch(function (response) {
                    console.log('', response)
                })
        } else if (event.target.classList.contains('fa-trash')){
        } else {
        }
    })
}

export default tasks;