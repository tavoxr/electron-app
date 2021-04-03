const btnAddProduct = document.querySelector('#btn-addProduct')
const myProducts  = document.querySelector('#myProducts')
const myOrders  = document.querySelector('#myOrders')
const tableBody = document.querySelector('#table-body')
const logOut = document.querySelector('#logOut')

const thisWindow = 'Products'


myProducts.addEventListener('click',()=>{
    window.api.send('redirigirAProducts',thisWindow)
})


myOrders.addEventListener('click',()=>{
    window.api.send('redirigirAOrders',thisWindow)
})

var products 
window.addEventListener("DOMContentLoaded",()=>{
    //  console.log(window.api.saludo)


    window.api.receive('getMyProducts',function(e,data) {

        products = data

        console.log('products',products )

        for(var i=0; i <data.length; i++){
            let row = `<tr>
                            <td>${data[i].name}</td>
                            <td>${data[i].price}</td>
                            <td>${data[i].description}</td>
                            <td>${data[i].category}</td>
                            <td>${data[i].inStock}</td>
                       <tr/>`
    
                tableBody.innerHTML +=row
            
        }
        
    })

})
const btnEdit =  document.querySelector('#editProduct')
const btnDelete = document.querySelector('#deleteProduct')

btnAddProduct.addEventListener('click',()=>{

    window.api.send('abrirFormProduct',products)

})


logOut.addEventListener('click',()=>{

    window.api.send('logOutProducts','logout')

})