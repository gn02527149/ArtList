// Basic init
const electron = require('electron');
const {app, BrowserWindow} = electron;

const isDevelopment = require('electron-is-dev');


// Let electron reloads by itself when webpack watches changes in ./app/
if(isDevelopment){
    require('electron-reload')(__dirname);
}

// To avoid being garbage collected
let mainWindow;

app.on('ready', () => {

    mainWindow = new BrowserWindow({width: 1600, height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })

    if (isDevelopment) {
        const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
        mainWindow.webContents.openDevTools();
        installExtension(REACT_DEVELOPER_TOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log('An error occurred: ', err));
        installExtension(REDUX_DEVTOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log('An error occurred: ', err));
      }

    mainWindow.loadURL(`file://${__dirname}/index.html`)

})
