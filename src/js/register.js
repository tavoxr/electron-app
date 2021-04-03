const form = document.querySelector('.form')
const userName =  document.querySelector('#name')
const idEmployee = document.querySelector('#idEmployee')
const password1 = document.querySelector('#password')
const password2  =    document.querySelector('#password-confirm')
const btnSubmit = document.querySelector('.btn-submit') 
const btnReturnToLogin = document.querySelector('#btnReturnToLogin')

const exprPass = RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}')
let passValidated = false
var usuarios
window.addEventListener("DOMContentLoaded",()=>{
    

let m = window.api.receive('getUsuarios', function(e,data){

    console.log('data', data)
    // console.log('window', window)
    usuarios = data

})
   

    

    
})


btnReturnToLogin.addEventListener('click',()=>{
    window.api.send('returnRegisterToLogin', 'redirect')
})

btnSubmit.addEventListener('click',(e)=>{
        e.preventDefault()

        if(userName.value === ""){
            swal({
                title:'Invalid Username',
                text:'Enter a  Username',
                icon:'warning'
            })
        }
 
        if(!password1.value.match(exprPass)){
            passValidated = false
            swal({
                title:'Invalid Password  ',
                text: 'Your password must contain at least 8 characters, 1 capital Letter, 1 lowercase, 1 number and 1 special character.',
                icon:'warning'
            })  
        }else{
            passValidated = true
        }

    if(password1.value !== password2.value){
        swal({
            title:"Password doesn't match",
            icon:'warning'
        })
        passValidated =false
    }else{
        passValidated = true
    }


        let idEmployeeEqual = false
        usuarios.map(user=>{
            if(user.idEmployee == idEmployee.value){
                idEmployeeEqual = true
            }else{
                swal({
                    title:"idEmployee already exists",
                    icon:'warning'
                })
            }
        })

     
                        if(passValidated && !idEmployeeEqual ){
                            let  employee = {
                                name: userName.value ,
                                idEmployee: idEmployee.value,
                                password: password1.value
                            }
                            
                            window.api.send('registrarUsuario',employee)
                            swal({
                                title:"User Registered",
                                icon:'success'
                            }).then(()=>{
                                window.api.send('enviarAlLogin','redirigirAlLogin')
                            })
                            
                            // window.api.ingresarRegisterToProducts()
                            // window.api.getMyProducts()

                                
                            }else{
                                swal({
                                    title:"This idEmployee already exists",
                                    icon:'warning'
                                })
                            }    
    



    })





    




