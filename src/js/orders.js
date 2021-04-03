const myProducts  = document.querySelector('#myProducts')
const myOrders  = document.querySelector('#myOrders')
const btnPlaceOrder  = document.querySelector('#btn-placeOrder')
const tableBody = document.querySelector('#table-body')


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


window.addEventListener("DOMContentLoaded",()=>{
    //  console.log(window.api.saludo)


    window.api.receive('getAllOrders',function(e,data) {


        for(var i=0; i <data.length; i++){
            let row = `<tr>
                            <td>${data[i].id}</td>
                            <td>${data[i].idProduct}</td>
                            <td>${data[i].idEmployee}</td>
                            <td>${data[i].quantity}</td>
                       <tr/>`
        
                tableBody.innerHTML +=row
            
        }
        

    })

})
