const productos = {
    aqua: 200,
    emocion: 180,
    alegria: 160,
    frescura: 150,
};

let vendedores = {
    juan: {},
    pedro: {}
};

function obtenerPrecioProducto(producto) {
    return productos[producto] || 0;
}

function registrarVenta() {
    const vendedor = document.getElementById('vendedor').value;
    const producto = document.getElementById('producto').value;
    const cantidad = parseInt(document.getElementById('cantidad').value, 10);

    const precioProducto = obtenerPrecioProducto(producto);

    if (precioProducto === 0) {
        alert('Producto no válido. Vuelva a intentarlo.');
        return;
    }

    if (vendedores[vendedor][producto]) {
        vendedores[vendedor][producto] += cantidad;
    } else {
        vendedores[vendedor][producto] = cantidad;
    }

    actualizarTablaVentas();
    actualizarEmpleadoDelMes();
}

function actualizarTablaVentas() {
    const salesTable = document.getElementById('salesTable');
    salesTable.innerHTML = `
        <tr>
            <th>Vendedor</th>
            <th>Aqua</th>
            <th>Emocion</th>
            <th>Alegria</th>
            <th>Frescura</th>
            <th>Total</th>
        </tr>
    `;

    for (const vendedor in vendedores) {
        let totalDinero = 0;
        let rowHTML = `<tr><td>${vendedor}</td>`;

        for (const producto in productos) {
            const cantidad = vendedores[vendedor][producto] || 0;
            const precioProducto = obtenerPrecioProducto(producto);
            const totalProducto = cantidad * precioProducto;
            totalDinero += totalProducto;
            rowHTML += `<td>${cantidad}</td>`;
        }

        rowHTML += `<td>${totalDinero} USD</td></tr>`;
        salesTable.innerHTML += rowHTML;
    }
}

function actualizarEmpleadoDelMes() {
    let empleadoDelMes = null;
    let maxMonto = 0;
    let empate = false;

    for (const vendedor in vendedores) {
        let totalDinero = 0;
        for (const producto in vendedores[vendedor]) {
            const cantidad = vendedores[vendedor][producto];
            const precioProducto = obtenerPrecioProducto(producto);
            totalDinero += cantidad * precioProducto;
        }

        if (totalDinero > maxMonto) {
            maxMonto = totalDinero;
            empleadoDelMes = vendedor;
            empate = false;
        } else if (totalDinero === maxMonto) {
            empate = true;
        }
    }

    const employeeOfTheMonthDiv = document.getElementById('employeeOfTheMonth');
    if (empate) {
        employeeOfTheMonthDiv.textContent = "Hubo un empate entre varios vendedores para el empleado del mes.";
    } else {
        employeeOfTheMonthDiv.textContent = `El empleado del mes es: ${empleadoDelMes}`;
    }
}

// Actualizar la tabla y el empleado del mes al cargar la página
actualizarTablaVentas();
actualizarEmpleadoDelMes();
