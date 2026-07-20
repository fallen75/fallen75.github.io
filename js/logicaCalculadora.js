/*const menuBtn = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const menuToggleAux = document.querySelector('.menu-toggle--aux.is-visible');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('is-collapsed'); // Esto añade/quita una clase para achicar el sidebar
    menuToggleAux.classList.toggle('is-visible')
})

menuToggleAux.addEventListener('click', () => {
    sidebar.classList.toggle('is-collapsed'); // Esto añade/quita una clase para achicar el sidebar
    menuToggleAux.classList.toggle('is-visible')
})*/

const actualizarEstiloInput = (input) => {
    // Validamos: que sea número, que no esté vacío y esté en el rango 0-20
    const val = parseFloat(input.value);
    const esValido = !isNaN(val) && input.value !== "" && val >= 0 && val <= 20;

    if (esValido) {
        input.classList.add("is-filled");
    } else {
        input.classList.remove("is-filled");
    }
};

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => actualizarEstiloInput(input));
});

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        if (!Number.isNaN(input.value) && input.value !== "" && input.value >= 0 && input.value<=20) {
            input.classList.add("is-filled");
        } else {
            input.classList.remove("is-filled");
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const $form = document.querySelector('.form-promedio');
    const $inputs = Array.from($form.querySelectorAll('input[type="number"]'));
    const $outputPromedio = document.getElementById('nota-promedio');
    const NOTA_APROBATORIA = 10.5;

    $form.addEventListener('input', () => {
        let sumaActual = 0
        let pesoRestante = 0
        let pesoAcumulado = 0
        let inputsVacios = []

        $inputs.forEach((input) => {
            const peso = parseFloat(input.dataset.weight);
            const nota = parseFloat(input.value);
            const dataLabel = input.parentElement.querySelector('.nota-minima');

            if (!isNaN(nota)) {
                sumaActual += nota * peso
                pesoAcumulado += peso
                dataLabel.textContent = '--'
            } else {
                // Si no hay nota: guardar para el cálculo del mínimo
                pesoRestante += peso;
                inputsVacios.push(dataLabel);
            }
        })

        let promedioActual = pesoAcumulado > 0 ? (sumaActual / pesoAcumulado) : 0;
        let esAprobado
        if(promedioActual>0) {
            if(promedioActual >= 10.5){
                esAprobado = true
            } else {
                esAprobado = false
            }
        }

        $outputPromedio.textContent = promedioActual.toFixed(2)
        $outputPromedio.style.color = promedioActual >= NOTA_APROBATORIA ? 'rgb(78, 255, 78)' : 'rgb(255, 44, 44)';
        $outputPromedio.style.color = promedioActual >= NOTA_APROBATORIA ? 'rgb(78, 255, 78)' : 'rgb(255, 44, 44)';

        $outputPromedio.classList.toggle('nota-aprobado', esAprobado);
        $outputPromedio.classList.toggle('nota-desaprobado', !esAprobado);

        if(inputsVacios.length > 0){
            let notaNecesaria = (NOTA_APROBATORIA - sumaActual) / pesoRestante;

            let mensaje = notaNecesaria.toFixed(2);
            if (notaNecesaria <= 0) mensaje = "0.00";
            if (notaNecesaria > 20) mensaje = "Bica"; // Requiere más de 20 para pasar

            inputsVacios.forEach(lbl => {
                lbl.textContent = mensaje;
            });
        }
    })

    // Seleccionamos el formulario padre

    $form.addEventListener("click", (e) => {
        // Verificamos si el clic fue en un botón de reset
        if (e.target.matches("button[type='reset']")) {
            // 1. Evitamos que limpie todo el formulario
            e.preventDefault();

            // 2. Buscamos el fieldset más cercano al botón (su "red de apoyo")
            const $parentFieldset = e.target.closest("fieldset");

            // 3. Limpiamos solo los inputs dentro de ese fieldset
            const $inputs = $parentFieldset.querySelectorAll("input");
            $inputs.forEach(input => {
                input.value = ""
            });

            $inputs.forEach(input => {
                input.value = "";
                actualizarEstiloInput(input); // <--- Aquí se encargará de quitar la clase
            });
            
            // --- LA PIEZA CLAVE ---
            // Creamos un evento de tipo 'input' y lo lanzamos desde el formulario
            // bubbles: true permite que el evento "suba" y sea captado por tu $form.addEventListener('input'...)
            $form.dispatchEvent(new Event('input', { bubbles: true }));
            
            console.log(`Se limpió y recalculó la sección: ${$parentFieldset.className}`);
        }
    });

    $inputs.forEach((input) => {
        input.addEventListener("change", (e) => {
            if(parseFloat(input.value) > 20 || parseFloat(input.value) < 0) {
                window.alert(`Valor "${input.value}" no válido`)
                input.value = ""
            }
            $form.dispatchEvent(new Event('input', { bubbles: true }));
        })
    })

});

