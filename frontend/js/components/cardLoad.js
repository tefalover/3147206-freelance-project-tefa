// Este código es para las cards

// Exportamos una función llamada loadCards que acepta:
// - containerSelector: un selector CSS para el contenedor donde van las cards
// - cardIds: un array opcional con los IDs de las cards que se quieren mostrar
export async function loadCards(containerSelector, cardIds = []) {
  // Obtenemos el contenedor en el DOM
  const container = document.querySelector(containerSelector);
  if (!container) return; // Si no existe, salimos silenciosamente

  try {
    // Hacemos dos fetch al mismo tiempo:
    // 1. plantilla HTML de la card
    // 2. datos de las cards en formato JSON
    const [templateRes, dataRes] = await Promise.all([
      fetch("/frontend/public/views/components/card.html"),
      fetch("/frontend/public/data/cards.json")
    ]);

    // Convertimos las respuestas a texto y JSON respectivamente
    const template = await templateRes.text();
    const cards = await dataRes.json();

    // Filtramos las cards si se proporcionaron IDs específicos
    const filteredCards = cardIds.length
      ? cards.filter(card => cardIds.includes(card.id)) // solo las que están en el array
      : cards; // si no hay filtro, usamos todas

    // Por cada card seleccionada...
    filteredCards.forEach(card => {
      // Reemplazamos los placeholders {{...}} del template con los datos reales
      let html = template
        .replace("{{title}}", card.title)
        .replace("{{icon1}}", card.icon1)
        .replace("{{icon2}}", card.icon2)
        .replace("{{description}}", card.description);

      // Agregamos la card al contenedor en el DOM
      container.innerHTML += html;
    });

  } catch (error) {
    // Capturamos errores como fallas de red o archivos mal formateados
    console.error("Error cargando las cards:", error);
  }
}
// 