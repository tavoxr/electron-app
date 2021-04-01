const btnAddProduct = document.querySelector('#btn-addProduct')
const myProducts  = document.querySelector('#myProducts')
const myOrders  = document.querySelector('#myOrders')

const thisWindow = 'Products'
btnAddProduct.addEventListener('click',()=>{

    window.api.abrirFormProduct()

})

myProducts.addEventListener('click',()=>{
    window.api.redirigirAProducts(thisWindow)
})


myOrders.addEventListener('click',()=>{
    window.api.redirigirAOrders(thisWindow)
})

window.addEventListener("DOMContentLoaded",()=>{
    //  console.log(window.api.saludo)

    
    


    



    

})



