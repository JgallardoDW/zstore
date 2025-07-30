// carrito.js

// Elementos DOM
const carritoToggleBtn = document.getElementById('carrito-toggle');
const carritoDiv = document.getElementById('carrito');
const carritoLista = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const vaciarBtn = document.getElementById('vaciar-carrito');
const comprarBtn = document.getElementById('comprar-carrito');

// Obtener carrito del localStorage o iniciar vacío
let carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')) || [];

// Guardar carrito en localStorage
function guardarLocalStorage() {
  localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));
}

// Actualizar UI del carrito
function actualizarCarritoUI() {
  carritoLista.innerHTML = '';

  if (carritoProductos.length === 0) {
    carritoLista.innerHTML = '<li class="list-group-item text-center">El carrito está vacío</li>';
    carritoTotal.textContent = '0';
    return;
  }

  let total = 0;

  carritoProductos.forEach((producto, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    li.textContent = `${producto.nombre} - $${producto.precio.toLocaleString()}`;

    // Botón eliminar producto
    const eliminarBtn = document.createElement('button');
    eliminarBtn.textContent = '×';
    eliminarBtn.setAttribute('aria-label', `Eliminar ${producto.nombre} del carrito`);
    eliminarBtn.classList.add('btn', 'btn-sm', 'btn-danger');
    eliminarBtn.style.marginLeft = '10px';
    eliminarBtn.addEventListener('click', () => {
      carritoProductos.splice(index, 1);
      actualizarCarritoUI();
      guardarLocalStorage();
    });

    li.appendChild(eliminarBtn);
    carritoLista.appendChild(li);

    total += producto.precio;
  });

  carritoTotal.textContent = total.toLocaleString();
  guardarLocalStorage();
}

// Agregar producto al carrito
function agregarProducto(nombre, precio) {
  carritoProductos.push({ nombre, precio });
  actualizarCarritoUI();
  guardarLocalStorage();
  carritoDiv.classList.add('activo');
}

// Evento para botones agregar producto
document.querySelectorAll('.agregar-carrito').forEach(btn => {
  btn.addEventListener('click', () => {
    const nombre = btn.dataset.nombre;
    const precio = Number(btn.dataset.precio);
    agregarProducto(nombre, precio);
  });
});

// Toggle mostrar/ocultar carrito
carritoToggleBtn.addEventListener('click', () => {
  carritoDiv.classList.toggle('activo');
});

// Vaciar carrito
vaciarBtn.addEventListener('click', () => {
  if (carritoProductos.length === 0) {
    alert('El carrito ya está vacío.');
    return;
  }
  if (confirm('¿Querés vaciar todo el carrito?')) {
    carritoProductos = [];
    actualizarCarritoUI();
    guardarLocalStorage();
  }
});

// Comprar carrito (abre link MercadoPago)
comprarBtn.addEventListener('click', () => {
  if (carritoProductos.length === 0) {
    alert('El carrito está vacío');
    return;
  }
  // Aquí pones tu link de MercadoPago:
  const mpLink = 'https://mpago.la/2CyHTsp';
  window.open(mpLink, '_blank');

  carritoProductos = [];
  actualizarCarritoUI();
  carritoDiv.classList.remove('activo');
});

// Inicializar carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  actualizarCarritoUI();
});
