// const { ipcRenderer } = require("electron")

// window.addEventListener('DOMContentLoaded', ()=>{

//     console.log('saludos')
  
// //==========================================##  send ##========================================================

// ipcRenderer.send('productos', 'hola')

  
// //===========================================## receive ##===================================================

// ipcRenderer.on('saludo',(e, msg)=>{
//     console.log('saludo con IPC', msg)
// })

// ipcRenderer.on('envioProductos', (e,msg)=>{
//     console.log('productos', msg)
//     saludo()
// })
// })
const { contextBridge, ipcRenderer } = require('electron')

let saludo

ipcRenderer.on('envioSaludo',(e,msg)=>{
    console.log(msg)
} )



contextBridge.exposeInMainWorld(
  'api',
  {
    doThing: (msg) => ipcRenderer.send('saludo',msg),
    saludo: saludo,
    abrirFormProduct: ()=> ipcRenderer.send('abrirFormProduct', 'agregar'),
    cerrarFormProduct: ()=> ipcRenderer.send('cerrarFormProduct','cerrar'),
    redirigirAProducts: (window)=>ipcRenderer.send('redirigirAProducts',window),
    redirigirAOrders: (window)=>ipcRenderer.send('redirigirAOrders', window),
    abrirOrderForm: ()=> ipcRenderer.send('abrirOrderForm','abrirOrderForm'),
    cerrarOrderForm: ()=> ipcRenderer.send('cerrarOrderForm','cerrar'),
    registrarEmpleado: (employee)=> ipcRenderer.send('registrarEmpleado',employee)

        
    
  },

)



