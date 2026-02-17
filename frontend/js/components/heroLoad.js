// Aqui es el hero

document.addEventListener("DOMContentLoaded", function (){
    // Seleccionar la clase
    const heroElement = document.querySelector(".hero-container")

    if(heroElement) {
        fetch("/frontend/views/components/hero.html")

        .then(response => {
            if (!response.ok) throw new Error("Error al cargar el navbar");
            return response.text();
        })
        .then(data => {
            heroElement.innerHTML = data;
        })
    .catch(error => console.log("Error cargando el hero", error));
    }



});