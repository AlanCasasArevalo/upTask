import Swal from "sweetalert2";

export const progressUpdate = () => {
    const tasks = document.querySelectorAll('li.tarea');
    if (tasks.length) {
        const completedTask = document.querySelectorAll('i.completo');
        const progress = Math.round((completedTask.length / tasks.length) * 100);
        const percent = document.querySelector('#porcentaje');
        percent.style.width = progress+'%';
        if (progress === 100) {
            Swal.fire(
                'Proyecto completado',
                'Felicidades, has terminado todas tus tareas',
                'success'
            );
        }
    }
};