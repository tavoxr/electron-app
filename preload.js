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





 contextBridge.exposeInMainWorld(
  'api',
  {
    send: (channel,msg)=> ipcRenderer.send(channel, msg),
    receive: (channel, callback) => ipcRenderer.on(channel, callback),
    // ingresarRegisterToProducts: ()=> ipcRenderer.send('registerToProducts','abrir'),
    // getMyProducts: (user)=> ipcRenderer.send('getMyProducts', user)

   
  },

)
