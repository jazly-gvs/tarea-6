// 2. Datos de entrada propios (Cumplen con todas las condiciones)
const gastos = [
    { descripcion: 'Cena familiar de fin de año', monto: 125.50, categoria: 'alimentacion' },
    { descripcion: 'Renovación de suscripción anual', monto: 99.00, categoria: 'servicios' },
    { descripcion: 'Compra de medicamentos básicos', monto: 18.25, categoria: 'salud' },
    { descripcion: 'Reparación imprevista de tubería', monto: 150.00, categoria: 'servicios' },
    { descripcion: 'Compra mensual de supermercado', monto: 75.40, categoria: 'alimentacion' },
    { descripcion: 'Pasajes de autobús urbano', monto: 12.00, categoria: 'transporte' }
];

// CORREGIDO: Declaración limpia de función flecha sin errores de operadores matemáticos
const esNumeroValido = (valor) => {
    return typeof valor === 'number' && !isNaN(valor);
};

// 3. Funciones requeridas con bucles tradicionales y asignación por índice
function calcularTotal(listaGastos) {
    let total = 0;
    for (let i = 0; i < listaGastos.length; i++) {
        if (!esNumeroValido(listaGastos[i].monto)) {
            throw new Error(`Error de validación: El monto del gasto "${listaGastos[i].descripcion}" no es un número válido.`);
        }
        total += listaGastos[i].monto;
    }
    return total;
}

function calcularPromedio(listaGastos) {
    if (listaGastos.length === 0) {
        throw new Error('Error de cálculo: No se puede calcular el promedio de una lista de gastos vacía.');
    }
    const total = calcularTotal(listaGastos);
    return total / listaGastos.length;
}

function filtrarPorCategoria(listaGastos, categoria) {
    const filtrados = [];
    for (let i = 0; i < listaGastos.length; i++) {
        if (listaGastos[i].categoria === categoria) {
            filtrados[filtrados.length] = listaGastos[i];
        }
    }
    return filtrados;
}

function obtenerMayorGasto(listaGastos) {
    if (listaGastos.length === 0) {
        return null;
    }
    let mayor = listaGastos[0];
    for (let i = 1; i < listaGastos.length; i++) {
        if (listaGastos[i].monto > mayor.monto) {
            mayor = listaGastos[i];
        }
    }
    return mayor;
}

function clasificarGasto(monto) {
    if (monto >= 100) {
        return 'Alto';
    } else if (monto >= 50) {
        return 'Medio';
    } else {
        return 'Bajo';
    }
}

function describirCategoria(categoria) {
    switch (categoria) {
        case 'alimentacion':
            return 'Gastos destinados a comida, supermercado y restaurantes.';
        case 'servicios':
            return 'Pagos de servicios del hogar, luz, agua o suscripciones digitales.';
        case 'salud':
            return 'Gastos médicos, farmacia, consultas y bienestar.';
        case 'transporte':
            return 'Gastos de movilidad, combustible o transporte público.';
        default:
            return 'Categoría general de gastos misceláneos.';
    }
}

function crearContadorDeAltos() {
    let contador = 0;
    return function() {
        contador++;
        return contador;
    };
}

// 4. Recorrido y salida en la consola
try {
    console.log("=== INICIO DEL PROCESAMIENTO DE GASTOS ===");

    const gastosClasificados = [];
    const incrementarAltos = crearContadorDeAltos();
    let totalGastosAltos = 0;

    for (let i = 0; i < gastos.length; i++) {
        const gastoOriginal = gastos[i];
        const nivelGasto = clasificarGasto(gastoOriginal.monto);
        
        if (nivelGasto === 'Alto') {
            totalGastosAltos = incrementarAltos();
        }

        gastosClasificados[gastosClasificados.length] = {
            descripcion: gastoOriginal.descripcion,
            monto: gastoOriginal.monto,
            categoria: gastoOriginal.categoria,
            nivel: nivelGasto,
            descripcionCategoria: describirCategoria(gastoOriginal.categoria)
        };
    }

    // 1. Mostrar tabla
    console.log("\n1. Tabla Detallada de Gastos Clasificados:");
    console.table(gastosClasificados);

    // 2. Mostrar totales y promedios
    const totalGeneral = calcularTotal(gastos);
    const promedioGeneral = calcularPromedio(gastos);
    console.log(`\n2. Resumen Financiero General:`);
    console.log(`   - Total general gastado: $${totalGeneral.toFixed(2)}`);
    console.log(`   - Promedio por transacción: $${promedioGeneral.toFixed(2)}`);

    // 3. Gasto más alto
    const mayorGasto = obtenerMayorGasto(gastos);
    console.log(`\n3. Gasto más elevado registrado:`);
    console.log(`   - Descripción: ${mayorGasto.descripcion}`);
    console.log(`   - Monto: $${mayorGasto.monto.toFixed(2)}`);
    console.log(`   - Categoría: ${mayorGasto.categoria}`);

    // 4. Cantidad de gastos altos
    console.log(`\n4. Análisis de alertas financieras:`);
    console.log(`   - Cantidad total de gastos en nivel 'Alto': ${totalGastosAltos}`);

    // 5. Filtrar por categoría elegida
    const categoriaElegida = 'servicios';
    const gastosFiltrados = filtrarPorCategoria(gastos, categoriaElegida);
    console.log(`\n5. Gastos bajo la categoría elegida ["${categoriaElegida}"]:`);
    console.log(gastosFiltrados);

    // 6. Construir objeto resumenPorCategoria
    const resumenPorCategoria = {};
    for (let i = 0; i < gastos.length; i++) {
        const cat = gastos[i].categoria;
        const monto = gastos[i].monto;
        
        if (resumenPorCategoria[cat] === undefined) {
            resumenPorCategoria[cat] = 0;
        }
        resumenPorCategoria[cat] += monto;
    }

    // 7. Informe final estructurado
    const informe = {
        total: totalGeneral,
        promedio: promedioGeneral,
        cantidadAltos: totalGastosAltos,
        mayorGasto: mayorGasto,
        resumenPorCategoria: resumenPorCategoria
    };

    console.log("\n6. Informe Corporativo Estructurado (JSON):");
    console.log(JSON.stringify(informe, null, 2));

} catch (error) {
    console.error("Se produjo un error crítico en el flujo principal:", error.message);
}

// 5. Prueba controlada de error independiente
console.log("\n=== INICIO DE LA PRUEBA DE ERROR CONTROLADA ===");
try {
    calcularPromedio([]);
} catch (errorControlado) {
    console.error("Mensaje de error capturado correctamente:", errorControlado.message);
}
