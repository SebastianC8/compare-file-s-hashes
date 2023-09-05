const { stderr, stdout } = require('process')
const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')

const fileOne = path.join('resources/archivo-uno.txt')
const commandOne = `certutil -hashfile ${fileOne} MD5`

const fileTwo = path.join('resources/archivo-dos.txt')
const commandTwo = `certutil -hashfile ${fileTwo} MD5`

const promiseOne = () => execCommand(fileOne, commandOne);

const promiseTwo = () => execCommand(fileTwo, commandTwo);

const execCommand = (file, command) => {
    return new Promise((resolve, reject) => {
        fs.access(file, fs.constants.F_OK, (err) => {
            if (!err) {
                exec(command, (cmmdErr, stdout, stderr) => {
                    if (cmmdErr) {
                        reject(`Error al ejecutar el comando: ${error.message}`);
                        return;
                    }

                    if (stderr) {
                        reject(`Error en la salida estándar: ${stderr}`);
                        return;
                    }

                    const result = stdout.split('\n')[1];
                    if (result !== '') {
                        resolve(result);
                    }
                })
            } else {
                reject('El archivo no existe en la ubicación especificada.');
            }
        });
    });
}

promiseOne()
    .then((hashFileOne) => {
        if (hashFileOne) {
            promiseTwo()
                .then((hashFileTwo) => {
                    if (hashFileTwo) {
                        if (hashFileOne === hashFileTwo) {
                            console.log("Los archivos tienen exactamente el mismo contenido.");
                        } else {
                            console.log("El contenido de ambos archivos es diferente.");
                        }
                    }
                })
                .catch((errorTwo) => console.log("Error: " + errorTwo))
        }
    })
    .catch((errorOne) => console.log("Error: " + errorOne))