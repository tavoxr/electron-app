const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const mysql =  require('mysql2')

if(process.env.NODE_ENV !== 'production'){
    require('electron-reload')(__dirname,{
        electron: path.join(__dirname, 'node_modules', 'bin', 'electron')
    })

}



let mainWindow
let productsWindow
let productFormWindow
let orderFormWindow
let ordersWindow
let registerWindow

function createMainWindow(){
    mainWindow = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('index.html')
}

app.whenReady().then(()=>{
    // createMainWindow()
    createRegisterWindow()
    createProductsWindow()

    app.on('activate', ()=>{
        if(BrowserWindow.getAllWindows().length === 0){
            createMainWindow()
        }
    })

    mainWindow.webContents.on('did-finish-load',()=>{
        mainWindow.webContents.send('saludo', 'Hola Mundo')
    })
})

app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
})


/* =======================================================================================================
                                                CREATE WINDOWS 
=========================================================================================================*/
function createProductsWindow(){
    productsWindow =  new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
    })

    productsWindow.loadFile('./src/templates/Products.html')
}

function createRegisterWindow(){
    registerWindow =  new BrowserWindow({
        width:600,
        height:600,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
    })

    registerWindow.loadFile('./src/templates/Register.html')
}
function createProductFormWindow(){
    productFormWindow =  new BrowserWindow({
        width:600,
        height:600,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
    })

    productFormWindow.loadFile('./src/templates/ProductForm.html')
}

function createOrderFormWindow(){
    orderFormWindow =  new BrowserWindow({
        width:600,
        height:600,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
    })

    orderFormWindow.loadFile('./src/templates/OrderForm.html')
}

function createOrdersWindow(){
    ordersWindow =  new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
    })

    ordersWindow.loadFile('./src/templates/Orders.html')
}

/*===========================================================================================================
                                            END CREATE WINDOWS
=============================================================================================================*/

/*==========================================================================================================
                                                IPCMAIN                                            
============================================================================================================*/
ipcMain.on('saludo',(e,msg)=>{

    productsWindow.webContents.on('did-finish-load',()=>{
        productsWindow.webContents.send('envioSaludo', msg)
    })
})

ipcMain.on('abrirFormProduct', (e,msg)=>{

    createProductFormWindow()
})

ipcMain.on('cerrarFormProduct', (e,window)=>{

    productFormWindow.close()
})

ipcMain.on('abrirOrderForm', (e,msg)=>{
    createOrderFormWindow()
})

ipcMain.on('cerrarOrderForm',(e,msg)=>{
    orderFormWindow.close()
})


ipcMain.on('redirigirAOrders', (e,window)=>{

    if(window != 'Orders'){
        createOrdersWindow()
        productsWindow.close()
    }
})

ipcMain.on('redirigirAProducts',(e,window)=>{
    if(window != 'Products'){
        createProductsWindow()
        ordersWindow.close()        
    }
})
/*==========================================================================================================
                                             END IPCMAIN                                            
============================================================================================================*/
/*==========================================================================================================
                                             CONEXION MYSQL                                            
============================================================================================================*/

const  connection =  mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'evangelion01',
    database: 'electron1',

})

// connection.query('SELECT * FROM Employee;',(err,results,fields)=>{
//     console.log(results)
// })

// connection.promise().query('INSERT INTO Employee(name,password)VALUES("Rosa","eva3");')
// .then(([results,fields])=>{
//   console.log(results)
// }

// ).catch((err)=>{

// })



/*==========================================================================================================
                                             END CONEXION MYSQL                                          
============================================================================================================*/