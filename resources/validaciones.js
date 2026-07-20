// validacionesModule.js:

import { DateTime } from "https://cdn.jsdelivr.net/npm/luxon@3.4.4/+esm"

export class ErrorCustom extends Error {

    constructor(message, code) {
        super(message); // Llama al constructor de Error nativo
        this.name = "ErrorCustom";
        this.code = code;
        this.timestamp = new Date().toLocaleTimeString(); // Cuándo ocurrió
        this.stack = new Error().stack; // Captura la trazabilidad exacta
    }

    printConsole() {
        console.group(`%c Error [${this.code}] - ${this.timestamp} `, "background: #ff0000; color: #ffffff; font-weight: bold;");
        console.error("Mensaje:", this.message);
        console.error("Stack Trace:", this.stack);
        console.groupEnd();
    }
    
    printWindow(){
        window.alert(`${this.name}: ${this.message}`)
    }
}


export function validString(inputParameter) {

    if(typeof inputParameter !== "string"){

        let errorString = new ErrorCustom("El input ingresado NO es un string", "NotString") 
        throw errorString

    } else if(inputParameter.trim().length == 0){

        let errorString = new ErrorCustom("La cadena de texto esta vacía", "VoidString") 
        throw errorString

    }

    return true
}

export function validNumberPos(inputParameter) {

    if (typeof inputParameter !== "number") {
        throw new ErrorCustom("El valor debe ser un número", "NotNumber");
    }

    if (!Number.isFinite(inputParameter)) {
        throw new ErrorCustom("El número no puede ser NaN o infinito", "InvalidNumber");
    }

    if (!Number.isInteger(inputParameter)) {
        throw new ErrorCustom("El número debe ser entero", "NotInteger");
    }

    if (inputParameter <= 0) {
        throw new ErrorCustom("El número debe ser mayor que 0", "InvalidNumber");
    }

    return true
}

export function validUniqueChar(inputParameter) {

    if (typeof inputParameter !== "string") {
        throw new ErrorCustom("El valor debe ser una cadena texto", "NotString");
    }

    if (inputParameter.length !== 1) {
        throw new ErrorCustom("La cadena debe contener solo un caracter", "NotUniqueChar");
    }

    return true
}

export function validArray(inputParameter) {

    if(!(Array.isArray(inputParameter) && inputParameter.length > 0)) {

        throw new ErrorCustom("El array no es válido", "arrayNotValid");
    }

    return true

}

export function validDate(inputParameter) {

    validString(inputParameter);

    const res = DateTime.fromFormat(inputParameter, "MM/dd/yyyy").isValid;

    if (res !== true) {
        throw new ErrorCustom("La fecha es inválida", "NotDate");
    }

    return true
}

export function validTimeRange(inputParameter) {
    validString(inputParameter);

    // 1. Validamos formato básico HH:mm (00:00 a 23:59)
    const regexFormat = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!regexFormat.test(inputParameter)) {
        throw new ErrorCustom("Formato de hora inválido. Use HH:mm", "InvalidFormat");
    }

    // 2. Convertimos a minutos para comparar rangos fácilmente
    const [h, m] = inputParameter.split(':').map(Number);
    const minutosTotales = (h * 60) + m;

    const limiteInferior = (8 * 60) + 0;   // 08:00 -> 480 min
    const limiteSuperior = (18 * 60) + 50; // 18:50 -> 1130 min

    // 3. Validamos el rango permitido
    if (minutosTotales < limiteInferior || minutosTotales > limiteSuperior) {
        throw new ErrorCustom("La hora debe estar entre las 08:00 y las 18:50", "OutOfRange");
    }

    return true;
}
