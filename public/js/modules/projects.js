import Swal from 'sweetalert2'
import axios from 'axios'

const deleteButton = document.querySelector('#delete-project');
deleteButton.addEventListener('click', () => {
    Swal.fire({
        title: 'Deseas borrar el proyecto',
        text: "Un proyecto no se puede recuperar",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'No, Cancelar'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Borrado',
                'Tu proyecto fue borrado',
                'success'
            )
            setTimeout(() => {
                window.location.href = '/'
            }, 2500)
        }
    })
});

