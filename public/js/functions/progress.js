import Swal from "sweetalert2";
const _constant = require('./../../../src/config/constants');

export const progressUpdate = () => {
    const tasks = document.querySelectorAll('li.tarea');
    if (tasks.length) {
        const completedTask = document.querySelectorAll('i.completo');
        const progress = Math.round((completedTask.length / tasks.length) * 100);
        const percent = document.querySelector('#porcentaje');
        percent.style.width = progress+'%';
        if (progress === 100) {
            Swal.fire(
                _constant.PROGRESS_BAR_SWAL.SWAL_TITLE,
                _constant.PROGRESS_BAR_SWAL.SWAL_MESSAGE,
                _constant.PROGRESS_BAR_SWAL.SWAL_TYPE,
            );
        }
    }
};