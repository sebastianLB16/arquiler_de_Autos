class vehiculo {
    constructor(modelo, marca, año, color, asientos, chapa, costoPorDia, imagen, disponible) {
        this.modelo = modelo;
        this.marca = marca;
        this.año = año;
        this.color = color;
        this.asientos = asientos;
        this.chapa = chapa;
        this.costoPorDia = costoPorDia;
        this.imagen = imagen;
        this.disponible = disponible;    
    }
}
//creo los autos a usar
const auto1 = new vehiculo('Corolla', 'Toyota', 2020, 'Rojo', 5, 'ABC123', 50, 'css/toyota.jpg', true);
const auto2 = new vehiculo('Civic', 'Honda', 2019, 'Negro', 5, 'XYZ789', 45, 'https://di-uploads-pod16.dealerinspire.com/pattypeckhonda/uploads/2018/10/2019-civic-sedan-sport-trim-600x335.png', true);
const auto3 = new vehiculo('Mustang', 'Ford', 2021, 'Blanco', 4, 'MNO456', 80, 'https://di-uploads-pod39.dealerinspire.com/towncountryfordoflou/uploads/2021/05/2021-Ford-Mustang-Ecoboost-Premium-Model-Left.jpeg', true);
const auto4 = new vehiculo('Mustang', 'Ford', 2021, 'Blanco', 4, 'MNO456', 80, 'css/toyota.jpg', true);
//bicis
const bici1=new vehiculo("Mountain Bike", "Giant", 2022, "Negro", 1, "SIN_CHAPA", 10, "https://images2.giant-bicycles.com/b_white%2Cc_pad%2Ch_850%2Cq_80/hdhziehizpkabbjlayzw/MY22Talon292MetallicBlack.jpg", true);
const bici2=new vehiculo("BMX", "Mongoose", 2020, "Azul", 1, "SIN_CHAPA", 12, "https://d2yn9m4p3q9iyv.cloudfront.net/mongoose/2020/legion-l60/thumbs/1000/946c8.webp", true);
const bici3=new vehiculo("Gravel Bike", "Trek", 2021, "Gris", 1, "SIN_CHAPA", 15, "https://www.leisurelakesbikes.com/images/products/T/Tr/Trek-Checkpoint-Slr-9-Etap-Gravel-Bike-2022-Coral.jpg?width=1920&format=webp", true);


//Guardo los vehículos en localStorage
const autos = [auto1, auto2,auto3,bici1,bici2,bici3]; //Array de objetos veiculo
localStorage.setItem('inventario', JSON.stringify(autos)); //Convertir a JSON y guarda

//Recupero los vehículos de localStorage
const autosGuardados=JSON.parse(localStorage.getItem('inventario'));
console.log(autosGuardados); 
console.log("seg a guerdado correctamente");
//implemento la funcion mostrar vehiculos
function mostrarCatalogoVehiculos() {
    const catalogo = document.getElementById('lista-vehiculos');
    const lista_De_Vehiculos= JSON.parse(localStorage.getItem('inventario'));
    console.log(lista_De_Vehiculos);

    //Limpio para no tener un error
    catalogo.innerHTML = '';

    //un bucle mostrantod todos los vehiculos del array
    lista_De_Vehiculos.forEach(vehiculo => {
        const vehicleCard = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${vehiculo.imagen}" class="card-img-top" alt="${vehiculo.modelo}">
                    <div class="card-body">
                        <h5 class="card-title">${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.año})</h5>
                        <p class="card-text">Color: ${vehiculo.color}, Asientos: ${vehiculo.asientos}, Chapa: ${vehiculo.chapa}</p>
                        <p class="card-text">Costo por día: $${vehiculo.costoPorDia}</p>
                        <p class="card-text">Disponible: ${vehiculo.disponible ? 'Sí' : 'No'}</p>
                    </div>
                </div>
            </div>
        `;
        catalogo.innerHTML += vehicleCard;
    });
}
//cargar la página
document.addEventListener('DOMContentLoaded', mostrarCatalogoVehiculos);

//===========================================
//===========================================
//===========================================
//===========================================
//funcion de filtracion de vehiculos
function filtrarVehiculos() {
    //Obtener los valores de los filtros
    const filterDisponible = document.getElementById('filter-disponible').value;
    const filterModelo = document.getElementById('filter-modelo').value.toLowerCase();
    const filterMarca = document.getElementById('filter-marca').value.toLowerCase();
    const filterAño = document.getElementById('filter-año').value;
    //lista de vehículos del localStorage
    const vehicles = JSON.parse(localStorage.getItem('inventario')) || [];
    // Filtrar la lista de vehículos
    let filteredVehicles = vehicles;
    // Filtrar por disponibilidad
    if (filterDisponible === 'available') {
        filteredVehicles = filteredVehicles.filter(vehicle => vehicle.disponible === true);
    } else if (filterDisponible === 'not-available') {
        filteredVehicles = filteredVehicles.filter(vehicle => vehicle.disponible === false);
    }
    //Filtrar por modelo si se ha especificado
    if (filterModelo) {
        filteredVehicles = filteredVehicles.filter(vehicle => vehicle.modelo.toLowerCase().includes(filterModelo));
    }
    // Filtrar por marca si se ha especificado
    if (filterMarca) {
        filteredVehicles = filteredVehicles.filter(vehicle => vehicle.marca.toLowerCase().includes(filterMarca));
    }
    // Filtrar por año si se ha especificado
    if (filterAño) {
        filteredVehicles = filteredVehicles.filter(vehicle => vehicle.año == filterAño);
    }
    // Mostrar los vehículos filtrados en el catálogo
    mostrarVehiculosFiltrados(filteredVehicles);
}
function mostrarVehiculosFiltrados(filteredVehicles) {
    const catalogo = document.getElementById('lista-vehiculos');

    //Limpiar el contenido actual del catálogo
    catalogo.innerHTML = '';

    //Si no hay vehículos que mostrar
    if(filteredVehicles.length === 0) {
        catalogo.innerHTML = '<p>No se encontraron vehículos con los criterios de búsqueda.</p>';
        return;
    }
    //Añadir cada vehículo filtrado al catálogo
    filteredVehicles.forEach(vehiculo => {
        const vehicleCard = `
            <div class="col-md-4">
                <div class="card">
                    <img src="${vehiculo.imagen}" class="card-img-top" alt="${vehiculo.modelo}">
                    <div class="card-body">
                        <h5 class="card-title">${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.año})</h5>
                        <p class="card-text">Color: ${vehiculo.color}, Asientos: ${vehiculo.asientos}, Chapa: ${vehiculo.chapa}</p>
                        <p class="card-text">Costo por día: $${vehiculo.costoPorDia}</p>
                        <p class="card-text">Disponible: ${vehiculo.disponible ? 'Sí' : 'No'}</p>
                    </div>
                </div>
            </div>
        `;
        catalogo.innerHTML += vehicleCard;
    });
}




const id=0;
//Clase Usuario para crear nuevos usuarios
class Usuario {
    static ultimoId = 0; // Variable estática para almacenar el ID único
    constructor(nombre, cedula, correo, contraseña) {
        this.id = ++Usuario.ultimoId;
        this.nombre = nombre;
        this.cedula = cedula;
        this.correo = correo;
        this.contraseña = contraseña;
    }
}
const usuario_1=new Usuario("admin", "1234567", "legui@gmail.com", "1234");
const usuario_2=new Usuario("messi", "1234267", "messi@gmail.com", "2022");
const usuario_3=new Usuario("ronaldo", "1234264", "ronaldo@gmail.com", "cr7");
const clientesIniciales=[usuario_1,usuario_2,usuario_3]; // Inicializa un array con el primer cliente
localStorage.setItem('clientes', JSON.stringify(clientesIniciales));
//Función para mostrar el formulario de registro
function mostrarFormularioRegistro() {
    document.getElementById('form-title').textContent= 'Registrarse';
    document.getElementById('extra-fields').innerHTML= `
        <div class="form-group">
            <label for="cedula">Cédula:</label>
            <input type="text" id="cedula" class="form-control" placeholder="Ingrese su cédula">
        </div>
        <div class="form-group">
            <label for="correo">Correo Electrónico:</label>
            <input type="email" id="correo" class="form-control" placeholder="Ingrese su correo electrónico">
        </div>
    `;
    document.getElementById('boton_iniciar_sesion').textContent= 'Registrarse';
    document.getElementById('boton_iniciar_sesion').setAttribute('onclick', 'registrarse()');
}
// Función para iniciar sesión
function iniciarSesion() {
    // Obtiene el valor ingresado en los campos de usuario y contraseña del formulario HTML
    const usuario = document.getElementById('usuario').value; // Obtiene el valor del campo de usuario
    const contraseña = document.getElementById('contraseña').value; // Obtiene el valor del campo de contraseña
    // Recupera la lista de clientes almacenada en localStorage
    let clientes = JSON.parse(localStorage.getItem('clientes')) || []; // Convierte el string almacenado en un array de objetos
    ver();
    // Asegúrate de que 'clientes' es un array
    if (!Array.isArray(clientes)) {
        clientes = [clientes]; // Si por alguna razón 'clientes' no es un array, lo convierte en uno
    }
    //Busca en la lista de clientes el usuario que tenga el mismo nombre y contraseña que los ingresados
    const cliente= clientes.find(user => user.nombre === usuario && user.contraseña === contraseña );
    //Verifica 
    if(cliente){
        document.getElementById('status').textContent = 'Inicio de sesión exitoso!';
        //Redirige a la página 'principal.html' después de un inicio de sesión exitoso
        window.location.href = 'principal.html';
        id=cliente.id;
    } else{
        //Si las credenciales no son válidas, muestra un mensaje de error
        document.getElementById('status').textContent= 'Usuario o contraseña incorrectos.';
    }
}
//Función para mostrar el formulario de registro
function mostrarFormularioRegistro() {
    //Cambia el título del formulario a 'Registrarse'
    document.getElementById('form-title').textContent = 'Registrarse';
    //Agrega campos adicionales para cédula y correo electrónico (solo para el registro)
    document.getElementById('extra-fields').innerHTML = `
        <div class="form-group">
            <label for="cedula">Cédula:</label>
            <input type="text" id="cedula" class="form-control" placeholder="Ingrese su cédula">
        </div>
        <div class="form-group">
            <label for="correo">Correo Electrónico:</label>
            <input type="email" id="correo" class="form-control" placeholder="Ingrese su correo electrónico">
        </div>
    `;
    //Cambia el texto del botón a 'Registrarse'
    document.getElementById('boton_iniciar_sesion').textContent = 'Registrarse';
    
    //Cambia la función del botón para que ahora llame a 'registrarse' en lugar de 'iniciarSesion'
    document.getElementById('boton_iniciar_sesion').setAttribute('onclick', 'registrarse()');
}
//Función para registrarse
function registrarse() {
    //Obtiene los valores ingresados en los campos del formulario
    const usuario = document.getElementById('usuario').value; // Obtiene el nombre de usuario
    const contraseña = document.getElementById('contraseña').value; // Obtiene la contraseña
    const cedula = document.getElementById('cedula').value; // Obtiene la cédula
    const correo = document.getElementById('correo').value; // Obtiene el correo electrónico
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    //Verifica si ya existe un usuario con el mismo nombre en la lista de clientes
    const existe = clientes.some(user => user.nombre === usuario); // Retorna true si el nombre ya existe
    //Si el usuario ya existe, muestra un mensaje de error y detiene el registro
    if (existe) {
        document.getElementById('status').textContent = 'El usuario ya existe.';
        return; 
    }
    
    const nuevoUsuario = new Usuario(usuario, cedula, correo, contraseña);
    //Agrega el nuevo usuario a la lista de clientes
    clientes.push(nuevoUsuario);
    //Almacena la lista actualizada de clientes en localStorage
    localStorage.setItem('clientes', JSON.stringify(clientes));
    //Muestra un mensaje indicando que el registro fue exitoso
    document.getElementById('status').textContent = 'Registro exitoso!';
    mostrarFormularioInicioSesion();
}

//Función para mostrar el formulario de inicio de sesión nuevamente
function mostrarFormularioInicioSesion() {
    //Cambia el título del formulario de nuevo a 'Iniciar Sesión'
    document.getElementById('form-title').textContent = 'Iniciar Sesión';
    //Elimina los campos adicionales del formulario (cedula y correo) porque no son necesarios para el inicio de sesión
    document.getElementById('extra-fields').innerHTML = '';
    
    // Cambia el texto del botón de nuevo a 'Iniciar Sesión'
    document.getElementById('boton_iniciar_sesion').textContent = 'Iniciar Sesión';
    
    // Cambia la función del botón para que llame a 'iniciarSesion' en lugar de 'registrarse'
    document.getElementById('boton_iniciar_sesion').setAttribute('onclick', 'iniciarSesion()');
}







//===============================================

function cargarVehiculosEnFormulario() {
    const selectVehiculo=document.getElementById('vehiculo');
    const vehiculos = JSON.parse(localStorage.getItem('inventario')) || [];
    
    selectVehiculo.innerHTML= '<option value="">Seleccione un vehículo</option>';
    
    vehiculos.forEach(vehiculo => {
        // Solo añadir vehículos que están disponibles
        if (vehiculo.disponible) {
            const option = document.createElement('option');
            option.value = vehiculo.chapa;
            //Usa el texto del <option> para mostrar marca, modelo y año del vehículo
            option.textContent = `${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.año})`;
            //ñade el <option> al <select>
            selectVehiculo.appendChild(option);
        }
    });
}


function realizarAlquiler() {
    //Obtiene el valor del vehículo seleccionado (chapa) del formulario
    const vehiculoChapa = document.getElementById('vehiculo').value;
    // Obtiene las fechas de inicio y fin del alquiler del formulario
    const fechaInicio = document.getElementById('fecha-inicio').value;
    const fechaFin = document.getElementById('fecha-fin').value;
    //ID del usuario que está realizando el alquiler (este valor debería cambiar según la lógica de usuario autenticado)
    const usuarioId = id;//no funciona correctamente mi logica
    //Verifica si todos los campos del formulario están completos
    if (!vehiculoChapa || !fechaInicio || !fechaFin) {
        //Muestra un mensaje de error si algún campo está vacío
        document.getElementById('status-alquiler').textContent = 'Por favor, complete todos los campos.';
        return; 
    }

    //Verifica si la fecha de fin es posterior a la fecha de inicio
    if (new Date(fechaFin) <= new Date(fechaInicio)) {
        //Muestra un mensaje de error si la fecha de fin no es válida
        document.getElementById('status-alquiler').textContent = 'La fecha de fin debe ser posterior a la fecha de inicio.';
        return; 
    }

    //Recupera el inventario de vehículos del localStorage
    const vehiculos = JSON.parse(localStorage.getItem('inventario')) || [];
    //Busca el vehículo en el inventario
    const vehiculo = vehiculos.find(v => v.chapa === vehiculoChapa);
    //Verifica si el vehículo existe y está disponible
    if (!vehiculo || !vehiculo.disponible) {
        document.getElementById('status-alquiler').textContent = 'El vehículo no está disponible para alquilar.';
        return; 
    }
    //Crea un objeto con la información del alquiler
    const alquiler = {
        vehiculo: vehiculoChapa,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        usuarioId: usuarioId
    };
    //Recupera la lista de alquileres del localStorage o inicializa un array vacío si no hay datos
    const alquileres = JSON.parse(localStorage.getItem('alquileres')) || [];
    //Añade el nuevo alquiler a la lista de alquileres
    alquileres.push(alquiler);
    //Actualiza el estado del vehículo a no disponible
    vehiculo.disponible = false;
    //Guarda el inventario actualizado en el localStorage
    localStorage.setItem('inventario', JSON.stringify(vehiculos));
    //Guarda la lista actualizada de alquileres en el localStorage
    localStorage.setItem('alquileres', JSON.stringify(alquileres));
    //Muestra un mensaje de éxito al usuario
    document.getElementById('status-alquiler').textContent = 'Alquiler realizado exitosamente!';
    //Actualiza el catálogo de vehículos en el formulario
    cargarVehiculosEnFormulario();
    mostrarCatalogoVehiculos();
    //Limpia el formulario después de realizar el alquiler
    document.getElementById('form-alquiler').reset();
}

//Llama a la función para cargar los vehículos en el formulario de alquiler cuando la página se ha cargado completamente
document.addEventListener('DOMContentLoaded', cargarVehiculosEnFormulario);

//================================================
// Función para cargar y mostrar los clientes
function mostrarClientes() {
    const listaClientes = document.getElementById('lista-clientes');
    // Recuperar clientes del localStorage
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    // Verificar que clientes es un array
    if (!Array.isArray(clientes)) {
        console.error('Los clientes en localStorage no son un array:', clientes);
        clientes = []; // Inicializa como un array vacío si no es un array
    }
    // Limpiar la lista actual
    listaClientes.innerHTML = '';
    // Si no hay clientes
    if (clientes.length === 0) {
        listaClientes.innerHTML = '<p>No hay clientes registrados.</p>';
        return;
    }
    // Mostrar clientes
    clientes.forEach(cliente => {
        const clienteCard = `
            <div class="cliente-card">
                <p><strong>Nombre:</strong> ${cliente.nombre}</p>
                <p><strong>Cédula:</strong> ${cliente.cedula}</p>
                <p><strong>Correo:</strong> ${cliente.correo}</p>
            </div>
        `;
        listaClientes.innerHTML += clienteCard;
    });
}
//Función para cargar y mostrar los alquileres
function mostrarAlquileres() {
    const listaAlquileres = document.getElementById('lista-alquileres');
    const alquileres = JSON.parse(localStorage.getItem('alquileres')) || [];
    // Limpiar la lista actual
    listaAlquileres.innerHTML = '';
    // Si no hay alquileres
    if (alquileres.length === 0) {
        listaAlquileres.innerHTML = '<p>No hay alquileres registrados.</p>';
        return;
    }
    // Agregar cada alquiler a la lista
    alquileres.forEach(alquiler => {
        const alquilerItem = `
            <a href="#" class="list-group-item list-group-item-action">
                <h5 class="mb-1">Vehículo: ${alquiler.vehiculo}</h5>
                <p class="mb-1">Fecha de Inicio: ${alquiler.fechaInicio}</p>
                <p class="mb-1">Fecha de Fin: ${alquiler.fechaFin}</p>
                <p class="mb-1">Usuario ID: ${alquiler.usuarioId}</p>
            </a>
        `;
        listaAlquileres.innerHTML += alquilerItem;
    });
}

//Llamar a las funciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarClientes();
    mostrarAlquileres();
});


//funcion de registro
// app.js

// Almacenar el estado actual (si estamos en modo registro o inicio de sesión)
let isRegisterMode = false;

function toggleRegister() {
    const formTitle = document.getElementById("form-title");
    const extraFields = document.getElementById("extra-fields");
    const botonIniciarSesion = document.getElementById("boton_iniciar_sesion");

    // Cambiar el modo
    isRegisterMode = !isRegisterMode;

    if (isRegisterMode) {
        // Cambiar a modo "Registrarse"
        formTitle.textContent = "Registrarse";
        botonIniciarSesion.style.display = "none";

        // Crear campo adicional para "Confirmar Contraseña" solo en modo de registro
        extraFields.innerHTML = `
            <div class="form-group">
                <label for="confirmarContraseña">Confirmar Contraseña:</label>
                <input type="password" id="confirmarContraseña" class="form-control" placeholder="Confirme su contraseña">
            </div>
            <div class="form-group">
                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" class="form-control" placeholder="Ingrese su correo electrónico">
            </div>
             <div class="form-group">
                <label for="cedula">numero de cedula</label>
                <input type="email" id="cedula" class="form-control" placeholder="Ingrese su numero de cedula">
            </div>
        `;
    } else {
        // Cambiar a modo "Iniciar Sesión"
        formTitle.textContent = "Iniciar Sesión";
        botonIniciarSesion.style.display = "inline-block";
        extraFields.innerHTML = ""; // Limpiar campos adicionales
    }
}
function ver(){
    let imprimir = JSON.parse(localStorage.getItem("clientes")) || [];
    console.log(imprimir);
    
}
function registrar() {
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;
    const confirmarContraseña = document.getElementById("confirmarContraseña")?.value;
    const email = document.getElementById("email")?.value;
    const cedula = document.getElementById("cedula")?.value;
    const status = document.getElementById("status");

    // Validación de campos
    if (!usuario || !contraseña || !email || !confirmarContraseña || !cedula) {
        status.textContent = "Por favor, complete todos los campos.";
        return;
    }

    // Validación de contraseñas
    if (contraseña !== confirmarContraseña) {
        status.textContent = "Las contraseñas no coinciden.";
        return;
    }

    // Obtención de los clientes existentes
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    ver();

    // Verificación de cédula y correo únicos
    const existeCliente = clientes.some(cliente => cliente.cedula === cedula || cliente.email === email);
    if (existeCliente) {
        status.textContent = "La cédula o el correo electrónico ya están registrados.";
        return;
    }

    // Creación del nuevo usuario
    const usuarioNuevo=new Usuario(usuario, cedula, email, contraseña);
    clientes.push(usuarioNuevo);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    ver();

    status.textContent = "Registro exitoso. Ahora puede iniciar sesión.";

    // Volver al modo de inicio de sesión
    toggleRegister();
}
















// Asignar el evento de clic al botón "Registrarme" para alternar entre "Iniciar Sesión" y "Registrarse"
document.getElementById("boton_registrarme").addEventListener("click", function() {
    if (isRegisterMode) {
        registrar();
    } else {
        toggleRegister();
    }
});


