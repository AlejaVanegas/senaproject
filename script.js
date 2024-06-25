// Funciones para usuarios

// Función de registro de usuarios

async function handleUserSubmit(event) {
    event.preventDefault();

    // Aquí se llena el formulario
    const formData = new FormData(event.target);
    const usuario = {};
    formData.forEach((value, key) => {
        usuario[key] = value;
    });

    const url = 'https://localhost:44353/api/usuarios';

// Bloque try catch para generar alertas con los errores
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
		
		// Este bloque llena el registro del usuario y genera un POST en la base de datos

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Usuario registrado:', responseData);

        alert('Usuario registrado exitosamente');
        event.target.reset(); 
		
		// Muestra de errores en caso de un fallo en el registro
    } catch (error) {
        console.error('El usuario no pudo ser registrado', error);
       
        alert('Hubo un error con el registro');
    }
}

// Evento de envío del formulario
const userForm = document.getElementById('userForm');
if (userForm) {
    userForm.addEventListener('submit', handleUserSubmit);
}

// Función para cargar y mostrar usuarios


function fetchUsuarios() {
    fetch('https://localhost:44353/api/usuarios')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener usuarios.');
            }
            return response.json();
        })
        .then(usuarios => {
            displayUsuarios(usuarios);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al obtener usuarios');
        });
}

// Función para mostrar los usuarios dentro de una tabla
function displayUsuarios(usuarios) {
    const usuariosTableBody = document.getElementById('usuariosTableBody');
    usuariosTableBody.innerHTML = '';

    usuarios.forEach(usuario => {
        const row = `
            <tr>
                <td>${usuario.IdU}</td>
                <td>${usuario.Nombre}</td>
                <td>${usuario.Apellido}</td>
                <td>${usuario.TipoMembresia}</td>
                <td>${new Date(usuario.FechaInscripcion).toLocaleDateString()}</td>
                <td>${usuario.Correo}</td>
					<td><button type="button" class="btn btn-outline-danger" onclick="deleteUser(${usuario.IdU})">Eliminar</button>
					<button type="button" class="btn btn-outline-secondary" onclick="modifyUser(${usuario.IdU})">Modificar</button></td>
            </tr>
        `;
        usuariosTableBody.innerHTML += row;
    });
}

// Función para eliminación de usuarios

async function deleteUser(id) {
    const url = `https://localhost:44353/api/usuarios/${id}`;
    console.log(`Eliminando usuario de ID: ${id}`);

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            console.error('Response:', response);
            const errorMessage = await response.text();
            console.error('Error message:', errorMessage);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert('Usuario eliminado exitosamente');
        fetchUsuarios();
    } catch (error) {
        console.error('Error eliminando el usuario:', error);
        alert('Hubo un error al eliminar el usuario');
    }
}

// Función para modificar usuarios
async function modifyUser(id) {
    const url = `https://localhost:44353/api/usuarios/${id}`;

    try {
        const response = await fetch(url);
        const usuario = await response.json();

        document.getElementById('modifyUserId').value = usuario.IdU;
        document.getElementById('modifyUserName').value = usuario.Nombre;
        document.getElementById('modifyUserLastName').value = usuario.Apellido;
        document.getElementById('modifyUserMembership').value = usuario.TipoMembresia;
        document.getElementById('modifyUserEmail').value = usuario.Correo;

        $('#modifyUserModal').modal('show');
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

async function saveUserChanges() {
    const id = document.getElementById('modifyUserId').value;
    const nombre = document.getElementById('modifyUserName').value;
    const apellido = document.getElementById('modifyUserLastName').value;
    const tipoMembresia = document.getElementById('modifyUserMembership').value;
    const correo = document.getElementById('modifyUserEmail').value;

    const url = `https://localhost:44353/api/usuarios/${id}`;
    const userData = {
        IdU: id,
        Nombre: nombre,
        Apellido: apellido,
        TipoMembresia: tipoMembresia,
        Correo: correo
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status} - ${errorMessage}`);
        }

        alert('Usuario modificado exitosamente');
        fetchUsuarios();
        $('#modifyUserModal').modal('hide');
    } catch (error) {
        console.error('Error updating user:', error);
        alert('Hubo un error al modificar el usuario');
    }
}



// Funciones para productos


// Función para cargar y mostrar productos
function fetchProductos() {
    fetch('https://localhost:44353/api/productos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener productos.');
            }
            return response.json();
        })
        .then(productos => {
            displayProductos(productos); // Llamar a la función para mostrar los productos
        })
		// Muestra de errores en caso de un fallo en el registro
        .catch(error => {
            console.error('Error:', error);
            alert('Error al obtener productos. Consulta la consola para más detalles.');
        });
}


// Función de registro de productos

async function handleProductSubmit(event) {
    event.preventDefault();

    // Aquí se llena el formulario
    const formData = new FormData(event.target);
    const producto = {};
    formData.forEach((value, key) => {
        producto[key] = value;
    });

    const url = 'https://localhost:44353/api/productos';

// Bloque try catch para generar alertas con los errores
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
		// Este bloque llena el registro del usuario y genera un POST en la base de datos

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Producto registrado:', responseData);

        alert('Producto registrado exitosamente');
        event.target.reset(); 
		
		// Muestra de errores en caso de un fallo en el registro
    } catch (error) {
        console.error('El producto no pudo ser registrado', error);
       
        alert('Hubo un error con el registro');
    }
}

// Evento de envío del formulario
const productosForm = document.getElementById('productosForm');
if (productosForm) {
    productosForm.addEventListener('submit', handleProductSubmit);
}

// Mustra de productos dentro de la tabla
function displayProductos(productos) {
    const productosTableBody = document.getElementById('productosTableBody');
    productosTableBody.innerHTML = '';

    productos.forEach(productos => {
        const row = `
            <tr>
                <td>${productos.IdProducto}</td>
                <td>${productos.NombreProducto}</td>
                <td>${productos.Cantidad}</td>
                <td>${productos.TipoProducto}</td>
					<td><button type="button" class="btn btn-outline-danger" onclick="deleteProducto(${productos.IdProducto})">Eliminar</button>
					<button type="button" class="btn btn-outline-secondary" onclick="modifyProducto(${productos.IdU})">Modificar</button></td>
            </tr>
        `;
        productosTableBody.innerHTML += row;
    });
}

// Función de eliminación de productos 

async function deleteProducto(id) {
    const url = `https://localhost:44353/api/productos/${id}`;
	console.log(`Eliminando producto de id: ${id}`);

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert('Producto eliminado exitosamente');
        fetchProductos(); 
    } catch (error) {
        console.error('Error eliminando el producto:', error);
        alert('Hubo un error al eliminar el producto');
    }
}

// Función de modificación del producto 

async function modifyProducto(id) {
    const url = `https://localhost:44353/api/productos/${id}`;

    try {
        const response = await fetch(url);
        const producto = await response.json();

        document.getElementById('modifyProductoId').value = producto.IdProducto;
        document.getElementById('modifyProductoName').value = producto.NombreProducto;
        document.getElementById('modifyProductoQuantity').value = producto.Cantidad;
        document.getElementById('modifyProductoType').value = producto.TipoProducto;

        $('#modifyProductoModal').modal('show');
    } catch (error) {
        console.error('Error fetching producto data:', error);
    }
}

async function saveProductoChanges() {
    const id = document.getElementById('modifyProductoId').value;
    const nombreProducto = document.getElementById('modifyProductoName').value;
    const cantidad = document.getElementById('modifyProductoQuantity').value;
    const tipoProducto = document.getElementById('modifyProductoType').value;

    const url = `https://localhost:44353/api/productos/${id}`;
    const productoData = {
        IdProducto: id,
        NombreProducto: nombreProducto,
        Cantidad: cantidad,
        TipoProducto: tipoProducto
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status} - ${errorMessage}`);
        }

        alert('Producto modificado exitosamente');
        fetchProductos();
        $('#modifyProductoModal').modal('hide');
    } catch (error) {
        console.error('Error updating producto:', error);
        alert('Hubo un error al modificar el producto');
    }
}


// Funciones para ventas

// Función de registro de ventas

async function handleVentasSubmit(event) {
    event.preventDefault();

    // Aquí se llena el formulario
    const formData = new FormData(event.target);
    const venta = {};
    formData.forEach((value, key) => {
        venta[key] = value;
    });

    const url = 'https://localhost:44353/api/ventas';

// Bloque try catch para generar alertas con los errores
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta)
        });
		// Este bloque llena el registro de venta y genera un POST en la base de datos

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Venta registrada', responseData);

        alert('Venta registrada exitosamente');
        event.target.reset(); 
		
		// Muestra de errores en caso de un fallo en el registro
    } catch (error) {
        console.error('La venta no pudo ser registrada', error);
       
        alert('Hubo un error con el registro');
    }
}

// Evento de envío del formulario
const ventasForm = document.getElementById('ventasForm');
if (ventasForm) {
    ventasForm.addEventListener('submit', handleVentasSubmit);
}


// Función para cargar y mostrar ventas
function fetchVentas() {
    fetch('https://localhost:44353/api/ventas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener ventas.');
            }
            return response.json();
        })
        .then(ventas => {
            displayVentas(ventas); // Llamar a la función para mostrar las ventas
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al obtener ventas. Consulta la consola para más detalles.');
        });
}

// Muestra de las ventas en una tabla 
function displayVentas(ventas) {
    const ventasTableBody = document.getElementById('ventasTableBody');
    ventasTableBody.innerHTML = '';

    ventas.forEach(ventas => {
        const row = `
            <tr>
                <td>${ventas.IdU}</td>
                <td>${ventas.IdFactura}</td>
                <td>${ventas.ValorCompra}</td>
					<td><button type="button" class="btn btn-outline-danger" onclick="deleteVentas(${ventas.IdU})">Eliminar</button>
					<button type="button" class="btn btn-outline-secondary" onclick="modifyVentas(${ventas.IdU})">Modificar</button></td>
            </tr>
        `;
        ventasTableBody.innerHTML += row;
    });
}

// Función de eliminación de ventas

async function deleteVentas(id) {
    const url = `https://localhost:44353/api/ventas/${id}`;
	console.log(`Eliminando venta de id: ${id}`);

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert('Venta eliminada exitosamente');
        fetchVentas(); 
		// Muestra de errores en caso de un fallo en el registro
    } catch (error) {
        console.error('Error eliminando la venta:', error);
        alert('Hubo un error al eliminar la venta');
    }
}

//Función de modificación de ventas
async function modifyVentas(id) {
    const url = `https://localhost:44353/api/ventas/${id}`;

    try {
        const response = await fetch(url);
        const venta = await response.json();

        document.getElementById('modifyVentasIdU').value = venta.IdU;
        document.getElementById('modifyVentasIdFactura').value = venta.IdFactura;
        document.getElementById('modifyVentasValorCompra').value = venta.ValorCompra;

        $('#modifyVentasModal').modal('show');
    } catch (error) {
        console.error('Error fetching venta data:', error);
    }
}

async function saveVentasChanges() {
    const id = document.getElementById('modifyVentasIdU').value;
    const idFactura = document.getElementById('modifyVentasIdFactura').value;
    const valorCompra = document.getElementById('modifyVentasValorCompra').value;

    const url = `https://localhost:44353/api/ventas/${id}`;
    const ventaData = {
        IdU: id,
        IdFactura: idFactura,
        ValorCompra: valorCompra
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ventaData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status} - ${errorMessage}`);
        }

        alert('Venta modificada exitosamente');
        fetchVentas();
        $('#modifyVentasModal').modal('hide');
    } catch (error) {
        console.error('Error updating venta:', error);
        alert('Hubo un error al modificar la venta');
    }
}


// Funciones para Facturas

// Función de registro de facturas

async function handleFacturasSubmit(event) {
    event.preventDefault();

    // Aquí se llena el formulario
    const formData = new FormData(event.target);
    const factura = {};
    formData.forEach((value, key) => {
        factura[key] = value;
    });

    const url = 'https://localhost:44353/api/facturas';

// Bloque try catch para generar alertas con los errores
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(factura)
        });
		// Este bloque llena el registro de facturas y genera un POST en la base de datos

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Factura registrada', responseData);

        alert('Factura registrada exitosamente');
        event.target.reset(); 
		
		// Muestra de errores en caso de un fallo en el registro
    } catch (error) {
        console.error('La factura no pudo ser registrada', error);
       
        alert('Hubo un error con el registro');
    }
}

// Evento de envío del formulario
const facturasForm = document.getElementById('facturasForm');
if (facturasForm) {
    facturasForm.addEventListener('submit', handleFacturasSubmit);
}

// Función para cargar y mostrar facturas
function fetchFacturas() {
    fetch('https://localhost:44353/api/facturas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener facturas.');
            }
            return response.json();
        })
        .then(facturas => {
            displayFacturas(facturas); // Llamar a la función para mostrar las facturas
        })
		// Muestra de errores en caso de un fallo en el registro
        .catch(error => {
            console.error('Error:', error);
            alert('Error al obtener facturas. Consulta la consola para más detalles.');
        });
}

// Muestra de facturas en la tabla
function displayFacturas(facturas) {
    const facturasTableBody = document.getElementById('facturasTableBody');
    facturasTableBody.innerHTML = '';

    facturas.forEach(facturas => {
        const row = `
            <tr>
                <td>${facturas.IdFactura}</td>
                <td>${facturas.IdU}</td>
                <td>${facturas.IdProducto}</td>
                <td>${facturas.Cantidad}</td>
                <td>${facturas.ValorTotal}</td>
					<td><button type="button" class="btn btn-outline-danger" onclick="deleteFacturas(${facturas.IdFactura})">Eliminar</button>
					<button type="button" class="btn btn-outline-secondary" onclick="modifyFacturas(${facturas.IdU})">Modificar</button></td>
            </tr>
        `;
        facturasTableBody.innerHTML += row;
    });
}

// Función de eliminación de facturas
async function deleteFacturas(id) {
    const url = `https://localhost:44353/api/facturas/${id}`;
	console.log(`Eliminando factura de id: ${id}`);

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert('Factura eliminada exitosamente');
        fetchFacturas(); 
    } catch (error) {
        console.error('Error eliminando la factura:', error);
        alert('Hubo un error al eliminar la factura');
    }
}

// Función para modificar facturas
async function modifyFacturas(id) {
    const url = `https://localhost:44353/api/facturas/${id}`;

    try {
        const response = await fetch(url);
        const factura = await response.json();

        document.getElementById('modifyFacturasIdFactura').value = factura.IdFactura;
        document.getElementById('modifyFacturasIdU').value = factura.IdU;
        document.getElementById('modifyFacturasIdProducto').value = factura.IdProducto;
        document.getElementById('modifyFacturasCantidad').value = factura.Cantidad;
        document.getElementById('modifyFacturasValorTotal').value = factura.ValorTotal;

        $('#modifyFacturasModal').modal('show');
    } catch (error) {
        console.error('Error fetching factura data:', error);
    }
}

async function saveFacturasChanges() {
    const id = document.getElementById('modifyFacturasIdFactura').value;
    const idU = document.getElementById('modifyFacturasIdU').value;
    const idProducto = document.getElementById('modifyFacturasIdProducto').value;
    const cantidad = document.getElementById('modifyFacturasCantidad').value;
    const valorTotal = document.getElementById('modifyFacturasValorTotal').value;

    const url = `https://localhost:44353/api/facturas/${id}`;
    const facturaData = {
        IdFactura: id,
        IdU: idU,
        IdProducto: idProducto,
        Cantidad: cantidad,
        ValorTotal: valorTotal
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(facturaData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status} - ${errorMessage}`);
        }

        alert('Factura modificada exitosamente');
        fetchFacturas();
        $('#modifyFacturasModal').modal('hide');
    } catch (error) {
        console.error('Error updating factura:', error);
        alert('Hubo un error al modificar la factura');
    }
}



// Funciones para Envios

// Función de registro de Envios

async function handleEnviosSubmit(event) {
    event.preventDefault();

    // Aquí se llena el formulario
    const formData = new FormData(event.target);
    const envio = {};
    formData.forEach((value, key) => {
        envio[key] = value;
    });

    const url = 'https://localhost:44353/api/envios';

// Bloque try catch para generar alertas con los errores
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(envio)
        });
		// Este bloque llena el registro de envios y genera un POST en la base de datos

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Envio registrado', responseData);

        alert('Envio registrado exitosamente');
        event.target.reset(); 
		
		// Muestra de errores en caso de un fallo en el registro
    } catch (error) {
        console.error('El envio no pudo ser registrado', error);
       
        alert('Hubo un error con el registro');
    }
}

// Evento de envío del formulario
const enviosForm = document.getElementById('enviosForm');
if (enviosForm) {
    enviosForm.addEventListener('submit', handleEnviosSubmit);
}

// Función para cargar y mostrar envíos
function fetchEnvios() {
    fetch('https://localhost:44353/api/envios')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener envíos.');
            }
            return response.json();
        })
        .then(envios => {
            displayEnvios(envios); // Llamar a la función para mostrar los envíos
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al obtener envíos. Consulta la consola para más detalles.');
        });
}

// Muestra de envios en la tabla
function displayEnvios(envios) {
    const enviosTableBody = document.getElementById('enviosTableBody');
    enviosTableBody.innerHTML = '';

    envios.forEach(envios => {
        const row = `
            <tr>
                <td>${envios.IdU}</td>
                <td>${envios.IdFactura}</td>
                <td>${envios.DireccionEnvio}</td>
					<td><button type="button" class="btn btn-outline-danger" onclick="deleteEnvios(${envios.IdU})">Eliminar</button>
					<button type="button" class="btn btn-outline-secondary" onclick="modifyEnvios(${envios.IdU})">Modificar</button></td>
                <td>
            </tr>
        `;
        enviosTableBody.innerHTML += row;
    });
}

// Función para eliminar envios
async function deleteEnvios(id) {
    const url = `https://localhost:44353/api/envios/${id}`;
	console.log(`Eliminando envio de id: ${id}`);

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert('Envio eliminado exitosamente');
        fetchEnvios(); 
    } catch (error) {
        console.error('Error eliminando el envio:', error);
        alert('Hubo un error al eliminar el envio');
    }
}

// Función para modificar envios

async function modifyEnvios(id) {
    const url = `https://localhost:44353/api/envios/${id}`;

    try {
        const response = await fetch(url);
        const envio = await response.json();

        document.getElementById('modifyEnviosIdU').value = envio.IdU;
        document.getElementById('modifyEnviosIdFactura').value = envio.IdFactura;
        document.getElementById('modifyEnviosDireccionEnvio').value = envio.DireccionEnvio;

        $('#modifyEnviosModal').modal('show');
    } catch (error) {
        console.error('Error fetching envio data:', error);
    }
}

async function saveEnviosChanges() {
    const id = document.getElementById('modifyEnviosIdU').value;
    const idFactura = document.getElementById('modifyEnviosIdFactura').value;
    const direccionEnvio = document.getElementById('modifyEnviosDireccionEnvio').value;

    const url = `https://localhost:44353/api/envios/${id}`;
    const envioData = {
        IdU: id,
        IdFactura: idFactura,
        DireccionEnvio: direccionEnvio
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(envioData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status} - ${errorMessage}`);
        }

        alert('Envío modificado exitosamente');
        fetchEnvios();
        $('#modifyEnviosModal').modal('hide');
    } catch (error) {
        console.error('Error updating envio:', error);
        alert('Hubo un error al modificar el envío');
    }
}