const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const mysql = require('mysql2')
const { create } = require('domain')

if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', 'bin', 'electron')
    })

}



let mainWindow
let productsWindow
let productFormWindow
let orderFormWindow
let ordersWindow
let registerWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // nodeIntegration: true,
            // contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    createMainWindow()
    // createRegisterWindow()
    // createProductsWindow()
    // createProductFormWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })

    // mainWindow.webContents.on('did-finish-load',()=>{
    //     mainWindow.webContents.send('saludo', 'Hola Mundo')
    // })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


/* =======================================================================================================
                                                CREATE WINDOWS 
=========================================================================================================*/
function createProductsWindow() {
    productsWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // nodeIntegration: true,
            // contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    productsWindow.loadFile('./src/templates/Products.html')
}

function createRegisterWindow() {
    registerWindow = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            // nodeIntegration: true,
            // contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    registerWindow.loadFile('./src/templates/Register.html')
}
function createProductFormWindow() {
    productFormWindow = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            // nodeIntegration: true,
            // contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    productFormWindow.loadFile('./src/templates/ProductForm.html')
}

function createOrderFormWindow() {
    orderFormWindow = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            // nodeIntegration: true,
            // contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    orderFormWindow.loadFile('./src/templates/OrderForm.html')
}

function createOrdersWindow() {
    ordersWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // nodeIntegration: true,
            // contextIsolation: true,
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
ipcMain.on('saludo', (e, msg) => {

    productsWindow.webContents.on('did-finish-load', () => {
        productsWindow.webContents.send('envioSaludo', msg)
    })
})


var userEmpleado
ipcMain.on('loginUser', (e, userIdEmpleado) => {
    createProductsWindow()

    mainWindow.close()
    userEmpleado = userIdEmpleado
    console.log('employee', userIdEmpleado)


    connection.promise().query(`SELECT * FROM Product WHERE idEmployee = ${userIdEmpleado};`)
        .then(([results, fields]) => {
            console.log(results)
            productsWindow.webContents.on('did-finish-load', function () {
                productsWindow.webContents.send('getMyProducts', results);

            });
        }

        ).catch((err) => {

        })

})

ipcMain.on('abrirFormProduct', (e, msg) => {

    createProductFormWindow()

    connection.promise().query(`SELECT * FROM Product WHERE idEmployee = ${userEmpleado};`)
        .then(([results, fields]) => {
            console.log(results)
            productFormWindow.webContents.on('did-finish-load', function () {
                productFormWindow.webContents.send('getMyProductsValidation', results);

            });
        }

        ).catch((err) => {

        })

})

ipcMain.on('cerrarFormProduct', (e, window) => {

    productFormWindow.close()
})

ipcMain.on('abrirOrderForm', (e, msg) => {
    createOrderFormWindow()
})

ipcMain.on('cerrarOrderForm', (e, msg) => {
    orderFormWindow.close()
})


ipcMain.on('redirigirAOrders', (e, window) => {

    if (window != 'Orders') {
        createOrdersWindow()
        productsWindow.close()

        connection.promise().query(`SELECT * FROM Orders WHERE idEmployee = ${userEmpleado};`)
            .then(([results, fields]) => {
                console.log(results)
                ordersWindow.webContents.on('did-finish-load', function () {
                    ordersWindow.webContents.send('getAllOrders', results);

                });
            }

            ).catch((err) => {

            })
    }




    connection.promise().query(`SELECT * FROM Product WHERE idEmployee = ${userEmpleado};`)
        .then(([results, fields]) => {
            console.log(results)
            productsWindow.webContents.on('did-finish-load', function () {
                productsWindow.webContents.send('getMyProducts', results);

            });
        }

        ).catch((err) => {

        })



})

ipcMain.on('redirigirAProducts', (e, window) => {
    if (window != 'Products') {
        createProductsWindow()
        ordersWindow.close()


        connection.promise().query(`SELECT * FROM Product WHERE idEmployee = ${userEmpleado};`)
            .then(([results, fields]) => {
                console.log(results)
                productsWindow.webContents.on('did-finish-load', function () {
                    productsWindow.webContents.send('getMyProducts', results);

                });
            }

            ).catch((err) => {

            })
    }
    connection.promise().query(`SELECT * FROM Orders WHERE idEmployee = ${userEmpleado};`)
        .then(([results, fields]) => {
            console.log(results)
            ordersWindow.webContents.on('did-finish-load', function () {
                ordersWindow.webContents.send('getAllOrders', results);

            });
        }

        ).catch((err) => {

        })
})

ipcMain.on('registerToProducts', (e, msg) => {
    createProductsWindow()
    registerWindow.close()
})

ipcMain.on('enviarAlLogin', (e, msg) => {
    createMainWindow()
    registerWindow.close()

    connection.promise().query('SELECT * FROM User;')
        .then(([results, fields]) => {
            console.log(results)
            mainWindow.webContents.on('did-finish-load', function () {
                mainWindow.webContents.send('getUsuariosLogin', results);

            });




            // registerWindow.webContents.send('getUsuarios', results)
        }

        ).catch((err) => {

        })


})

ipcMain.on('returnRegisterToLogin', (e, msg) => {
    createMainWindow()
    registerWindow.close()

    connection.promise().query('SELECT * FROM User;')
        .then(([results, fields]) => {
            console.log(results)
            mainWindow.webContents.on('did-finish-load', function () {
                mainWindow.webContents.send('getUsuariosLogin', results);

            });




            // registerWindow.webContents.send('getUsuarios', results)
        }

        ).catch((err) => {

        })

})


ipcMain.on('returnLoginToRegister', (e, msg) => {
    createRegisterWindow()
    mainWindow.close()

    connection.promise().query('SELECT * FROM User;')
        .then(([results, fields]) => {
            console.log(results)
            registerWindow.webContents.on('did-finish-load', function () {
                registerWindow.webContents.send('getUsuarios', results);

            });




            // registerWindow.webContents.send('getUsuarios', results)
        }

        ).catch((err) => {

        })

})
const connection = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'evangelion01',
    database: 'electron1',

})


ipcMain.on('registrarUsuario', (e, employee) => {

    console.log('employee', employee)
    connection.query(`INSERT INTO User(idEmployee,name,password) VALUES(${employee.idEmployee},"${employee.name}","${employee.password}");`, (err, results, fields) => {
        console.log('USER CREATED')
    })
})


// ipcMain.on('getMyProductsValidation', (e,msg)=>{



// })

ipcMain.on('registrarProducto', (e, product) => {

    console.log('employee', product)
    connection.query(`INSERT INTO Product(name,description, price, inStock, category,idEmployee) VALUES("${product.name}","${product.description}",${product.price},"${product.inStock}","${product.category}",${userEmpleado});`, (err, results, fields) => {
        console.log('PRODUCT CREATED')
    })
})

ipcMain.on('enviarProductsDesdeElForm', (e, msg) => {
    productsWindow.close()
    createProductsWindow()
    productFormWindow.close()


    connection.promise().query(`SELECT * FROM Product WHERE idEmployee = ${userEmpleado};`)
        .then(([results, fields]) => {
            console.log(results)
            productsWindow.webContents.on('did-finish-load', function () {
                productsWindow.webContents.send('getMyProducts', results);

            });
        }

        ).catch((err) => {

        })
})


/*==========================================================================================================
                                             END IPCMAIN                                            
============================================================================================================*/
/*==========================================================================================================
                                             CONEXION MYSQL                                            
============================================================================================================*/


// connection.query('SELECT * FROM Usuario;',(err,results,fields)=>{
//     console.log(results)
// })

// connection.promise().query('SELECT * FROM User;')
// .then(([results,fields])=>{
//     console.log(results)
//     registerWindow.webContents.on('did-finish-load', function () {
//         registerWindow.webContents.send('getUsuarios', results);

//     });




// registerWindow.webContents.send('getUsuarios', results)
// }

// ).catch((err)=>{

// })




// connection.promise().query('SELECT * FROM Product;')
// .then(([results,fields])=>{
//     console.log(results)
//     registerWindow.webContents.on('did-finish-load', function () {
//         registerWindow.webContents.send('getProducts', results);
//     });
//     // registerWindow.webContents.send('getUsuarios', results)
// }

// ).catch((err)=>{

// })


connection.promise().query('SELECT * FROM User;')
    .then(([results, fields]) => {
        console.log(results)
        mainWindow.webContents.on('did-finish-load', function () {
            mainWindow.webContents.send('getUsuariosLogin', results);

        });




        // registerWindow.webContents.send('getUsuarios', results)
    }

    ).catch((err) => {

    })


/*==========================================================================================================
                                             END CONEXION MYSQL
============================================================================================================*/
