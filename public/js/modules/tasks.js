import Swal from "sweetalert2";

const axios = require("axios");
const tasks = document.querySelector('.listado-pendientes');

if (tasks && typeof tasks !== 'undefined') {
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
                    if (response.status === 202) {
                        icon.classList.toggle('completo')
                    }
                })
                .catch(function (response) {
                    if (response.status === 500) {
                    }
                })
        } else if (event.target.classList.contains('fa-trash')) {

            const taskHTML = event.target.parentElement.parentElement;
            const taskId = taskHTML.dataset.task;

            Swal.fire({
                title: 'Deseas borrar esta tarea',
                text: "Una tarea no se puede recuperar",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar',
                cancelButtonText: 'No, Cancelar'
            }).then((result) => {
                if (result.value) {
                    const url = `${location.origin}/tasks/${taskId}`;
                    axios.delete(url, {
                        params: {
                            taskId
                        }
                    })
                    .then(function (response) {
                        if (response.status === 202){
                            Swal.fire(
                                'Borrado',
                                response.data,
                                'success'
                            );
                            setTimeout(() => {
                                if (!tasks.firstElementChild.firstElementChild || typeof tasks.firstElementChild.firstElementChild === 'undefined') {
                                    window.location.href = location.pathname
                                }
                            }, 1500);
                            taskHTML.parentElement.removeChild(taskHTML);
                            console.log('taskHTML', taskHTML)
                        }else {
                            Swal.fire(
                                'Error',
                                'Algo salio mal',
                                'error'
                            );
                        }
                    })
                    .catch((response) => {
                        console.log('Error al hacer la eliminacion de la base de datos.', error);
                        Swal.fire(
                            'Error',
                            'Lo sentimos no se ha podido borrar su tarea',
                            'error'
                        );
                    })
                }
            })

        } else {
        }
    })
}

export default tasks;