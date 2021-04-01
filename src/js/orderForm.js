const cancelOrder = document.querySelector('#cancelOrder')


cancelOrder.addEventListener('click',()=>{
    window.api.cerrarOrderForm()
})