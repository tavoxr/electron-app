const btnCancel = document.querySelector('#btnCancel')
const productName = document.querySelector('#nameProduct')
const price = document.querySelector('#price')
const categoryId = document.querySelector('#category')
const inStock = document.querySelector('#inStock')
const description = document.querySelector('#description')
const btnSubmit = document.querySelector('#btn-submit')


btnCancel.addEventListener('click',()=>{
    window.api.send('cerrarFormProduct','cerrar')
})



