var constants = {
    SEQUELIZE_SETUP: {
        TABLE_NAME: 'upTaskNode',
        ADMIN_NAME: 'root',
        PASSWORD: 'YOUR_MYSWL_PASSWORD',
        HOST: 'localhost',
        PORT: '3306',
        DIALECT: 'mysql'
    },
    LITERALS_USER_CONTROLLER: {
        PAGE_NAME: 'Crear nueva cuenta en Uptask',
        PAGE_NAME_RENDER: 'createAccount',
        REDIRECTION_USER_CREATED: '/login',
        LOGIN_PAGE_NAME: 'Iniciar sesion en Uptask',
        LOGIN_PAGE_NAME_RENDER: 'login',
        RESET_ACCOUNT_PAGE_NAME: 'Restablecer tu contraseña',
        RESET_ACCOUNT_RENDER: 'resetAccount'
    },
    LITERALS_PROJECTS_CONTROLLER: {
        PAGE_NAME: 'Projects',
        PAGE_HOME_NAME_RENDER: 'index',
        PAGE_NEW_PROJECTS_NAME: 'New Projects',
        PAGE_NEW_PROJECTS_NAME_RENDER: 'newProjects',
        REDIRECTION_USER_CREATED: '/login',
        PAGE_PROJECT_TASK_PROJECTS_NAME: 'Project task',
        PAGE_PROJECT_TASK_PROJECTS_RENDER: 'tasks',
        PAGE_PROJECT_EDIT_PROJECT_NAME: 'Edit project',
        NEW_PROJECT_ERROR_MESSAGE: 'Tienes que agregar un nombre al campo',
        UPDATE_PROJECT_NAME_ERROR_MESSAGE: 'Tienes que agregar un nombre al campo',
        SUCCESS_DELETE_MESSAGE: 'Proyecto eliminado correctamente',
    },
    LITERALS_TASKS_CONTROLLER: {
        PAGE_NEW_TASK_NAME: 'New Task',
        PAGE_NEW_TASK_NAME_RENDER: 'newTasks',
        PAGE_TASK_TASK_PROJECTS_RENDER: 'tasks',
        NEW_TASK_ERROR_MESSAGE: 'Tienes que agregar un nombre al campo',
        UPDATE_TASK_SUCCESS_MESSAGE_TO_SEND: 'Actualizado',
        UPDATE_TASK_FAIL_MESSAGE_TO_SEND: 'Error en el servidor, no se pudo actualizar la peticion',
        DELETE_TASK_SUCCESS_MESSAGE_TO_SEND: 'Borrado',
        DELETE_TASK_FAIL_MESSAGE_TO_SEND: 'Error en el servidor, no se pudo borrar la peticion',
    },
    PROJECT_MODEL_CONSTANT: {
        PROJECT_MODEL_NAME: 'Projects',
        PROJECT_ID_LENGTH: 50,
        PROJECT_NAME_STRING_LENGTH: 30,
        PROJECT_URL_STRING_LENGTH: 40,
    },
    TASK_MODEL_CONSTANT: {
        TASK_MODEL_NAME: 'Tasks',
        TASK_ID_LENGTH: 50,
        TASK_NAME_STRING_LENGTH: 150,
        TASK_STATUS_STRING_LENGTH: 3,
    },
    USER_MODEL_CONSTANT: {
        USER_MODEL_NAME: 'Users',
        USER_ID_LENGTH: 50,
        USER_EMAIL_STRING_LENGTH: 50,
        USER_EMAIL_FAIL_NO_VALID_EMAIL: 'Agrega un correo Valido',
        USER_EMAIL_FAIL_NO_EMPTY_EMAIL: 'El e-mail no puede ir vacio',
        USER_EMAIL_FAIL_USER_ALREADY_REGISTER: 'Usuario ya registrado.',
        USER_EMAIL_FAIL_NO_EMPTY_PASSWORD: 'El e-mail no puede ir vacio',
        USER_PASSWORD_STRING_LENGTH: 60,
    },
    PROGRESS_BAR_SWAL: {
        SWAL_TITLE: 'Proyecto completado',
        SWAL_MESSAGE: 'Felicidades, has terminado todas tus tareas',
        SWAL_TYPE: 'success'
    },
    MAIN_INDEX_LITERALS: {
        SESSION_SECRET_SEED: 'SESSION_SECRET_SEED'
    },
    INDEX_ROUTES_LITERALS: {
        GET_PROJECTS_HOME: '/',
        GET_POST_NEW_PROJECTS: '/new-projects',
        GET_PROJECTS_BY_URL: '/projects/:url',
        GET_EDIT_PROJECTS_BY_ID: '/projects/edit/:id',
        POST_PROJECTS_BY_ID: '/new-projects/:id',
        DELETE_PROJECTS_BY_URL: '/projects/:url',
        POST_NEW_TASK_BY_PROJECT_URL: '/projects/:url',
        PATCH_TASK_BY_ID: '/tasks/:id',
        DELETE_TASK_BY_ID: '/tasks/:id',
        USER_CREATE_NEW_ACCOUNT: '/create-account',
        LOGIN_ACCOUNT: '/login',
        LOGOUT_ROUTE: '/logout',
        RESET_ACCOUNT: '/reset-account',
        RESET_ACCOUNT_BY_TOKEN: '/reset-account/:token'
    },
    PASSPORT_LITERALS: {
        USER_NAME_FIELD: 'email',
        PASSWORD_FIELD: 'password',
        DONE_MESSAGE_CALLBACK_USER_DOES_NOT_EXISTS: 'Esta cuenta no existe',
        DONE_MESSAGE_CALLBACK_INCORRECT_PASSWORD: 'La contraseña no es correcta.',
    },
    LITERALS_AUTHENTICATION_CONTROLLER: {
        AUTHENTICATION_STRATEGY: 'local',
        AUTHENTICATION_SUCCESS_REDIRECT_URL: '/',
        AUTHENTICATION_FAILURE_REDIRECT_URL: '/login',
        POST_AUTHENTICATION: '/login',
        BAD_REQUEST_MESSAGE: 'Ambos campos son obligatorios',
        CRYPTO_RANDOM_BYTES: 20,
        CRYPTO_ENCODING_METHODS: 'hex',
        EXPIRATION_TIME_OUT: Date.now() + 360000,
    }

};

module.exports = constants;