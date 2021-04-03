const btnCancel = document.querySelector('#btnCancel')
const productName = document.querySelector('#nameProduct')
const price = document.querySelector('#price')
const category = document.querySelector('#category')
const inStock = document.querySelector('#inStock')
const description = document.querySelector('#description')
const btnSubmit = document.querySelector('#btn-submit')


btnCancel.addEventListener('click',()=>{
    window.api.send('cerrarFormProduct','cerrar')
})


var allProducts 
window.addEventListener("DOMContentLoaded",()=>{
    //  console.log(window.api.saludo)


    window.api.receive('getMyProductsValidation',function(e,data){
        allProducts = data
        console.log('products', data)
    })
})


btnSubmit.addEventListener('click',(e)=>{
    e.preventDefault()
    let productExists = false
    let productNameValid = false
    let productDescriptionValid =  false
    let productPriceValid = false

    if(productName.value == ""){
        swal({
            title:'Invalid Product Name',
            text:'Enter a  Product name',
            icon:'warning'
        })
    }else{
        productNameValid = true
    }

    if(description.value == ""){
        swal({
            title:'Invalid Description',
            text:'Enter a description',
            icon:'warning'
        })
    }else{
        productDescriptionValid = true
    }

    if(price.value == ""){
        swal({
            title:'Invalid price',
            text:'Enter a valid price',
            icon:'warning'
        })
    }else{
        productPriceValid = true
    }
    
    allProducts.map(product=>{

        if(product.name == productName.value){
            productExists = true
            swal({
                title:'Invalid Product',
                text:'This product already exists',
                icon:'warning'
            })

        }

    })
    
    if((!productExists && productPriceValid) && (productDescriptionValid && productNameValid)){
        let newProduct ={
            name: productName.value,
            price: price.value,
            category: category.value,
            inStock: inStock.value,
            description: description.value
        }
    
        window.api.send('registrarProducto',newProduct)
        swal({
            title:'Product Created',
            text:'successfully',
            icon:'success'
        }).then(()=>{
            window.api.send('enviarProductsDesdeElForm','redirigir')
        }

        )


    }
    

})

