'use strict'

const electron = require('electron')

require('electron-reload')(__dirname)

process.env.NODE_ENV = 'development'

const { app, BrowserWindow, Menu} = electron

const url = require('url')

const path = require('path')


let mainWindow
let aboutWindow

app.on('ready' , function(){
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(
        url.format({
            pathname : path.join(__dirname, 'mainWindow.html'),
            protocol: "file:",
            slashes: true

        })
    )
    
    mainWindow.on('quit' , function(){
        app.quit()
    })

    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    
    Menu.setApplicationMenu(mainMenu)
})

function createAboutWindow(){
    aboutWindow = new BrowserWindow({
        width : 500,
        height : 350,
        title : "Youtube Cannel Info"
    })
    aboutWindow.loadURL(
        url.format({
            pathname : path.join(__dirname, 'aboutWindow.html'),
            protocol: "file:",
            slashes: true

        })
    )

    aboutWindow.setMenuBarVisibility(false)
}


const menuTemplate = [
    {
        label : "App",
        submenu : [
            {
                label : "Quit",
                click(){
                    app.quit()
                }
            },
            {
                label : "About",
                click(){
                    createAboutWindow()
                }
            }
        ]
    }
]


if(process.env.NODE_ENV !== 'production'){
    menuTemplate.push({
        label : 'Developer Tools',
        submenu : [
            {
                role : 'reload'
            },
            {
                label : 'Toggle DevTools',
                click(item,focusedwindow) {
                    focusedwindow.toggleDevTools()
                }
            }
        ]
    })
}