import { ErrorCustom, validTimeRange, validString } from "../resources/validaciones.js"

/*const $scheduleGridBody = document.querySelector(".schedule-grid-body")

console.log($scheduleGridBody)
console.log($scheduleGridBody.children)
console.log($scheduleGridBody.children[2])
console.log($scheduleGridBody.parentElement)
console.log($scheduleGridBody.firstElementChild)
console.log($scheduleGridBody.lastElementChild)
console.log($scheduleGridBody.previousElementSibling)
console.log($scheduleGridBody.nextElementSibling)
console.log($scheduleGridBody.previousElementSibling.firstElementChild.closest("div.grid-header"))
console.log($scheduleGridBody.closest("body"))

const $div = document.createElement("div"),
    $monday = document.querySelector(".monday")

console.log($monday)

$div.setAttribute("data-weight", "30")
$div.style.backgroundColor = "#f00"

$monday.appendChild($div)

const $ul3 = document.createElement("ul"),
$fragment = document.createDocumentFragment(),
$li = document.createElement("li")

$li.textContent = "papas"
$fragment.appendChild($li)*/

// =======================================================================================

//$ul3 = $body.appendChild($fragment);
//document.body.appendChild($ul3)

/* Templates HTML
const $cards = document.querySelector(".cards"),
    $template = document.getElementById("template-card").content,
    $fragment = document.createDocumentFragment(),
    cardContent = [
        // ... (aquí irían los datos del arreglo)
    ];

    cardContent.forEach((el) => {
    $template.querySelector("img").setAttribute("src", el.img);
    $template.querySelector("img").setAttribute("alt", el.title);
    $template.querySelector("figcaption").textContent = el.title;

    let $clone = document.importNode($template, true);
    $fragment.appendChild($clone);
});

$cards.appendChild($fragment);*/


// Modificando Elementos
// $cards.before($newCard)
// $cards.prepend($newCard)
// $cards.append($newCard)
// $cards.after($newCard)

console.clear()

const $btnViews = document.querySelectorAll(".btn-view")

const viewCursoCard = (elemento) => {
    elemento.closest(".curso").classList.toggle("is-visible");
};

// Al asignar el evento:
$btnViews.forEach(($btnView) => {
    $btnView.addEventListener("click", () => {
        // Aquí puedes pasarle lo que necesites
        viewCursoCard($btnView.parentElement, "ID-123");
    });
});

const $btnOpenModal = document.getElementById("btn-open-modal")
const $btnCloseModal = document.querySelector(".close-modal")
const $modal = document.getElementById("modal-curso");
const $form = document.getElementById("curso-form");
let cursos = []

console.log($btnOpenModal)

$btnOpenModal.addEventListener("click", (e) => {
    $modal.style.display = "flex"
    $modal.style.justifyContent = "center"
    $modal.style.alignItems = "center"
})

$btnCloseModal.addEventListener("click", (e) => $modal.style.display = "none")

function horaAFila(horaStr) {
    validTimeRange(horaStr)
    const [h, m] = horaStr.split(':').map(Number);
    return ((h - 8) * 60) + m + 1;
}

function obtenerNombreDia(dia){
    const dias = ["","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    return dias[dia];
}

function validarSeleccion() {
    const $selectDia = document.getElementById("dia");
    
    if ($selectDia.value === "") {
        return false;
    }
    
    return true;
}

function calcularEstilosCard(inicio, fin) {
    const horaInicioBase = 8; // Tu horario empieza a las 8:00

    const [hIni, mIni] = inicio.split(':').map(Number);
    const [hFin, mFin] = fin.split(':').map(Number);

    const minutosDesdeInicio = ((hIni - horaInicioBase) * 60) + mIni;
    const duracionMinutos = ((hFin - hIni) * 60) + (mFin - mIni);

    return {
        top: `${minutosDesdeInicio * 0.142857}%`,
        height: `${duracionMinutos * 0.142857}%`
    };
}

$form.onsubmit = (e) => {

    e.preventDefault();

    const hIni = document.getElementById("inicio").value;
    const hFin = document.getElementById("fin").value;
    const nombreCurso = document.getElementById("nombre").value;
    const aula = document.getElementById("aula").value;
    const docente = document.getElementById("docente").value;

    try {

        if(validTimeRange(hIni) &&
        validTimeRange(hFin) &&
        validString(nombreCurso) &&
        validString(aula) &&
        validString(docente) &&
        validarSeleccion()) {
            window.alert("papaya")

            cursos.push({
                id: Date.now(),
                nombre: document.getElementById("nombre").value,
                aula: document.getElementById("aula").value,
                docente: document.getElementById("docente").value,
                dia: parseInt(document.getElementById("dia").value),
                inicio: hIni,
                fin: hFin,
                visible: true
            });

            $modal.style.display = "none";
            $form.reset();
            actualizarInterfaz();
        }else {
            window.alert("Complete todos los campos correctamente")
        }
        
    } catch (error) {
        const contextInfo = {
            url: window.location.href,
            userAgent: navigator.userAgent,
            time: new Date().toISOString()
        };

        if (error instanceof ErrorCustom) {
            // Imprime con el diseño que definimos arriba
            error.printConsole();
            
            // Opcional: Agregar información extra al log
            console.table(contextInfo); 

            // En la ventana, podemos ser más específicos
            error.printWindow(); 
        } else {
            // Error nativo (Referencia nula, error de red, etc.)
            console.group("%c 🚨 ERROR CRÍTICO DEL SISTEMA ", "color: yellow; background: black;");
            console.error("Tipo:", error.name);
            console.error("Mensaje:", error.message);
            console.error("Stack:", error.stack);
            console.table(contextInfo);
            console.groupEnd();

            window.alert(`Error inesperado: ${error.message}\nRevisa la consola para más detalles.`);
        }
    }
};

function actualizarInterfaz() {

    const $listaCursos = document.getElementById("lista-cursos"),
    $fragment = document.createDocumentFragment(),
    $cursoTemplate = document.querySelector(".template__curso").content,
    $horarioGrid = document.getElementById("horario-grid")

    const $fragmentMonday = document.createDocumentFragment(),
    $scheduleMonday = document.querySelector(".monday"),
    $fragmentTuesday = document.createDocumentFragment(),
    $scheduleTuesday = document.querySelector(".tuesday"),
    $fragmentWednesday = document.createDocumentFragment(),
    $scheduleWednesday = document.querySelector(".wednesday"),
    $fragmentThursday = document.createDocumentFragment(),
    $scheduleThursday = document.querySelector(".thursday"),
    $fragmentFriday = document.createDocumentFragment(),
    $scheduleFriday = document.querySelector(".friday"),
    $fragmentSaturday = document.createDocumentFragment(),
    $scheduleSaturday = document.querySelector(".saturday")

    cursos.forEach((el) => {

        const $cursoCard = document.querySelector(".template__cursoCard").content
        let dia =""

        switch(el.dia){
            case 0:
                dia = "Lunes"
                console.log("Se ejecuto Lunes")
                //console.log($containerDay)

                if(el.visible === true){
                    $cursoCard.querySelector(".cursoCard").setAttribute("data-id", el.id)
                    $cursoCard.querySelector(".cursoCard__title").textContent = el.nombre;
                    $cursoCard.querySelector(".cursoCard__teaching").textContent = el.docente;
                    $cursoCard.querySelector(".cursoCard__classroomAndSchedule").textContent = `${el.aula} | ${el.inicio} - ${el.fin}`;

                    const estilos = calcularEstilosCard(el.inicio, el.fin);
                    $cursoCard.querySelector(".cursoCard").style.top = estilos.top;
                    $cursoCard.querySelector(".cursoCard").style.height = estilos.height;

                    let $clone = document.importNode($cursoCard, true)
                    $fragmentMonday.append($clone)
                }
                break;

            case 1:
                dia = "Martes"
                if(el.visible === true){
                    const $containerDay = $horarioGrid.children[el.dia + 1]
                    
                    $cursoCard.querySelector(".cursoCard").setAttribute("data-id", el.id)
                    $cursoCard.querySelector(".cursoCard__title").textContent = el.nombre;
                    $cursoCard.querySelector(".cursoCard__teaching").textContent = el.docente;
                    $cursoCard.querySelector(".cursoCard__classroomAndSchedule").textContent = `${el.aula} | ${el.inicio} - ${el.fin}`;

                    const estilos = calcularEstilosCard(el.inicio, el.fin);
                    $cursoCard.querySelector(".cursoCard").style.top = estilos.top;
                    $cursoCard.querySelector(".cursoCard").style.height = estilos.height;

                    let $clone = document.importNode($cursoCard, true)
                    $fragmentTuesday.appendChild($clone)
                }
                break;

            case 2:
                dia = "Miercoles"
                if(el.visible === true){
                    const $containerDay = $horarioGrid.children[el.dia + 1]
                    
                    $cursoCard.querySelector(".cursoCard").setAttribute("data-id", el.id)
                    $cursoCard.querySelector(".cursoCard__title").textContent = el.nombre;
                    $cursoCard.querySelector(".cursoCard__teaching").textContent = el.docente;
                    $cursoCard.querySelector(".cursoCard__classroomAndSchedule").textContent = `${el.aula} | ${el.inicio} - ${el.fin}`;

                    const estilos = calcularEstilosCard(el.inicio, el.fin);
                    $cursoCard.querySelector(".cursoCard").style.top = estilos.top;
                    $cursoCard.querySelector(".cursoCard").style.height = estilos.height;

                    let $clone = document.importNode($cursoCard, true)
                    $fragmentWednesday.appendChild($clone)
                }
                break;
            case 3:
                dia = "Jueves"
                if(el.visible === true){
                    const $containerDay = $horarioGrid.children[el.dia + 1]
                    
                    $cursoCard.querySelector(".cursoCard").setAttribute("data-id", el.id)
                    $cursoCard.querySelector(".cursoCard__title").textContent = el.nombre;
                    $cursoCard.querySelector(".cursoCard__teaching").textContent = el.docente;
                    $cursoCard.querySelector(".cursoCard__classroomAndSchedule").textContent = `${el.aula} | ${el.inicio} - ${el.fin}`;

                    const estilos = calcularEstilosCard(el.inicio, el.fin);
                    $cursoCard.querySelector(".cursoCard").style.top = estilos.top;
                    $cursoCard.querySelector(".cursoCard").style.height = estilos.height;

                    let $clone = document.importNode($cursoCard, true)
                    $fragmentThursday.appendChild($clone)
                }
                break;
            case 4:
                dia = "Viernes"
                if(el.visible === true){
                    const $containerDay = $horarioGrid.children[el.dia + 1]
                    
                    $cursoCard.querySelector(".cursoCard").setAttribute("data-id", el.id)
                    $cursoCard.querySelector(".cursoCard__title").textContent = el.nombre;
                    $cursoCard.querySelector(".cursoCard__teaching").textContent = el.docente;
                    $cursoCard.querySelector(".cursoCard__classroomAndSchedule").textContent = `${el.aula} | ${el.inicio} - ${el.fin}`;

                    const estilos = calcularEstilosCard(el.inicio, el.fin);
                    $cursoCard.querySelector(".cursoCard").style.top = estilos.top;
                    $cursoCard.querySelector(".cursoCard").style.height = estilos.height;

                    let $clone = document.importNode($cursoCard, true)
                    $fragmentFriday.appendChild($clone)
                }
                break;
            case 5:
                dia = "Sábado"
                if(el.visible === true){
                    const $containerDay = $horarioGrid.children[el.dia + 1]
                    
                    $cursoCard.querySelector(".cursoCard").setAttribute("data-id", el.id)
                    $cursoCard.querySelector(".cursoCard__title").textContent = el.nombre;
                    $cursoCard.querySelector(".cursoCard__teaching").textContent = el.docente;
                    $cursoCard.querySelector(".cursoCard__classroomAndSchedule").textContent = `${el.aula} | ${el.inicio} - ${el.fin}`;

                    const estilos = calcularEstilosCard(el.inicio, el.fin);
                    $cursoCard.querySelector(".cursoCard").style.top = estilos.top;
                    $cursoCard.querySelector(".cursoCard").style.height = estilos.height;

                    let $clone = document.importNode($cursoCard, true)
                    $fragmentSaturday.appendChild($clone)
                }
                break;
            default:
                console.log("Opción no válida")
        }

        /* Lógica para la lista de cursos ====================================*/
        $cursoTemplate.querySelector(".curso").setAttribute("data-id", el.id)
        $cursoTemplate.querySelector(".curso__title").textContent = `${el.nombre}`
        $cursoTemplate.querySelector(".curso__teachingAndClassroom").textContent = `${el.docente} - ${el.aula}`
        $cursoTemplate.querySelector(".curso__schedule").textContent = `${dia} | ${el.inicio} - ${el.fin}`;

        let $clone2 = document.importNode($cursoTemplate, true);
        $fragment.appendChild($clone2);
        /* Termino lógica para la lista de cursos ====================================*/
    });

    $listaCursos.replaceChildren();
    $listaCursos.append($fragment)

    let elementosAEliminar = $scheduleMonday.querySelectorAll('.cursoCard');
    // Los eliminamos uno por uno
    elementosAEliminar.forEach(hijo => hijo.remove());
    $scheduleMonday.append($fragmentMonday)

    elementosAEliminar = $scheduleTuesday.querySelectorAll('.cursoCard');
    // Los eliminamos uno por uno
    elementosAEliminar.forEach(hijo => hijo.remove());
    $scheduleMonday.append($fragmentTuesday)

    elementosAEliminar = $scheduleWednesday.querySelectorAll('.cursoCard');
    // Los eliminamos uno por uno
    elementosAEliminar.forEach(hijo => hijo.remove());
    $scheduleMonday.append($fragmentWednesday)

    /*$fragmentThursday = document.createDocumentFragment(),
    $scheduleThursday = document.querySelector(".thursday"),
    $fragmentFriday = document.createDocumentFragment(),
    $scheduleFriday = document.querySelector(".friday"),
    $fragmentSaturday = document.createDocumentFragment(),
    $scheduleSaturday = document.querySelector(".saturday")*/
}

document.getElementById("lista-cursos").addEventListener("click", (e) => {
    // 1. Buscamos si el clic fue en el botón "Ver" o en su icono
    const $btn = e.target.closest(".btn-view");
    
    if ($btn) {
        // 2. Obtenemos el ID del curso desde el elemento padre ".curso"
        const $cursoItem = $btn.closest(".curso");
        const cursoId = $cursoItem.dataset.id;

        // 3. Toggle de la clase en la lista lateral (opcional, para feedback visual)
        $cursoItem.classList.toggle("is-visible");

        // 4. BUSCAR Y ESCONDER LA CARD EN EL HORARIO
        // Buscamos en el grid el elemento que tenga el mismo data-id
        const $cardEnHorario = document.querySelector(`.cursoCard[data-id="${cursoId}"]`);
        
        if ($cardEnHorario) {
            // Si la card existe, alternamos su visibilidad
            if ($cardEnHorario.style.display === "none") {
                $cardEnHorario.style.display = "block";
                $btn.innerHTML = 'Ver <i class="fa-solid fa-eye"></i>';
            } else {
                $cardEnHorario.style.display = "none";
                $btn.innerHTML = 'Ver <i class="fa-solid fa-eye-slash"></i>';
            }
        }
    }
});


/*function actualizarInterfaz() {

    const $listaCursos = document.getElementById("lista-cursos")
    
    let cursoTemplate = document.querySelector(".template__curso").content


}*/

// ============================================

/*
// 1. Seleccionamos el elemento que queremos vigilar (tu grid o lista)
const $objetivo = document.getElementById("horario-grid");

// 2. Definimos qué hacer cuando detecte el cambio
const callback = (mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log("¡Se ha añadido o quitado un hijo!");
            // Aquí puedes ejecutar tu lógica (ej: actualizar contadores)
            mutation.addedNodes.forEach(nodo => {
                console.log("Nuevo nodo:", nodo);
            });
        }
    }
};

// 3. Creamos el observador y empezamos a vigilar
const observer = new MutationObserver(callback);

observer.observe($objetivo, { 
    childList: true, // Vigila adición/eliminación de hijos
    subtree: false   // Si quieres vigilar también a los hijos de los hijos, ponlo en true
});

// Para detenerlo: observer.disconnect();*/






