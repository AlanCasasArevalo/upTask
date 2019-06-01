import Swal from 'sweetalert2'
import axios from 'axios'

const deleteButton = document.querySelector('#delete-project');

if (deleteButton && typeof deleteButton !== 'undefined') {
    deleteButton.addEventListener('click', (event) => {
        const projectURL = event.target.dataset.projectUrl
        console.log('projectURL', projectURL);
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
                // location.origin te da la direccion del path http://localhost:3000
                // location.pathname te da el end point /projects/tienda-virtual-de-bibi-nZFPSOfwZ
                // haciendo la concatenacion de ambos metodos te da la url completa.
                const url = `${location.origin}${location.pathname}`;
                // console.log('url', url);
                //peticion axios
                axios.delete(url, { params: { projectURL }})
                    .then(function (response) {
                        console.log('respuesta al hacer el borrado contra base de datos', response);
                        Swal.fire(
                            'Borrado',
                            response.data,
                            'success'
                        );
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 1500)
                    })
                    .catch(function (error) {
                        console.log('Error al hacer la eliminacion de la base de datos.', error);
                        Swal.fire(
                            'Error',
                            'Lo sentimos no se ha podido borrar su proyecto',
                            'error'
                        );
                    });


            }
        })
    });
}

export default deleteButton;