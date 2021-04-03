const cancelOrder = document.querySelector('#cancelOrder')
const employee = document.querySelector('#employee')
const product = document.querySelector('#product')
const quantity = document.querySelector('#quantity')
const btnSubmit = document.querySelector('#btnSubmit')

cancelOrder.addEventListener('click',()=>{
    window.api.send('cerrarOrderForm','cerrar')
})


var allProducts 
var allUsers
window.addEventListener("DOMContentLoaded",()=>{
    //  console.log(window.api.saludo)


    window.api.receive('getAllProducts',function(e,data){
        allProducts = data

        for(var i=0; i <data.length; i++){
            let option = `
                            <option value=${data[i].id} >${data[i].name}</option>
                       `
        
                product.innerHTML +=option
    
        }

    })


    window.api.receive('getAllUsers',function(e,data){
        allUsers = data        

        for(var i=0; i <data.length; i++){
            let option = `
                            <option value=${data[i].idEmployee} >${data[i].name}</option>
                       `
        
                employee.innerHTML +=option
    
        }

    })

})


btnSubmit.addEventListener('click',(e)=>{
    e.preventDefault()
    
    if(quantity.value == ""){
        swal({
            title:'Invalid Quantity Number',
            text:'Enter a valid quantity ',
            icon:'warning'
        })
    }else{
        let newOrder = {
            idProduct: product.value,
            idEmployee: employee.value,
            quantity: quantity.value
        }

        window.api.send('registrarOrden', newOrder)
        swal({
            title:'Order Created',
            text:'successfully ',
            icon:'success'
        }).then(()=>{
            window.api.send('regresarAOrders','redirigir')
        })

    }

    

    console.log(newOrder)
})

