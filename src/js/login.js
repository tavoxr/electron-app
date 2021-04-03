const btnLoginToRegister  = document.querySelector('#btnLoginToRegister')
const form = document.querySelector('.form')
const idEmployee = document.querySelector('#idEmployee')
const password = document.querySelector('#password')
const btnSubmit = document.querySelector('.btn-submit') 

var usuarios

btnLoginToRegister.addEventListener('click',()=>{
    window.api.send('returnLoginToRegister', 'redirect')
})

window.addEventListener('DOMContentLoaded', ()=>{

    window.api.receive('getUsuariosLogin', function(e,data){

        console.log('data', data)
        console.log('window', window)
        usuarios = data
    
    })

})

btnSubmit.addEventListener('click',(e)=>{
    e.preventDefault()
    let idEmployeeValidated =false
    let passwordValidated = false
    let userIdEmpleado

    console.log('usuarios', usuarios)
    usuarios.map(user=>{
        
        if(user.idEmployee == idEmployee.value){
            idEmployeeValidated = true
            userIdEmpleado = user.idEmployee
        }
      
        if(user.password == password.value){
            passwordValidated = true
        }
    })

    if(idEmployeeValidated && passwordValidated){
        window.api.send('loginUser',userIdEmpleado)

    }else{
        console.log('error no coinciden a los datos registrados')
    }

})