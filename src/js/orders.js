const myProducts  = document.querySelector('#myProducts')
const myOrders  = document.querySelector('#myOrders')
const btnPlaceOrder  = document.querySelector('#btn-placeOrder')

const thisWindow = 'Orders'

myProducts.addEventListener('click',()=>{
    window.api.send('redirigirAProducts',thisWindow)
})


myOrders.addEventListener('click',()=>{
    window.api.send('redirigirAOrders',thisWindow)
})

btnPlaceOrder.addEventListener('click',()=>{
    window.api.send('abrirOrderForm','abrir')
})

