const form = document.querySelector('.form')
const userName =  document.querySelector('#name')
const idEmployee = document.querySelector('#idEmployee')
const password1 = document.querySelector('#password')
const password2  =    document.querySelector('#password-confirm')
const btnSubmit = document.querySelector('.btn-submit') 





btnSubmit.addEventListener('click',(e)=>{
        e.preventDefault()
        
        let employee = {
            name: userName.value ,
            idEmployee: idEmployee.value,
            password: password1.value
        }


        console.log('employee info', employee)

    })
