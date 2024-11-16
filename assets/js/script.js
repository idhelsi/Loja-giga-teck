
    // Função para carregar os produtos do arquivo JSON
async function loadProducts() {
  try {
    const response = await fetch("./produtos.json");

    if (!response.ok) {
      throw new Error(`Erro ao carregar produtos: ${response.status}`);
    }

    const products = await response.json();
    const produtos = document.querySelector(".produtos");
    produtos.innerHTML = "";

    products.forEach(product => {
      const hasDiscount = product.oldPrice && parseFloat(product.oldPrice) > parseFloat(product.price);

      const productCard = `
      <div class="produto" id="produto-${product.id}">
        <a href="#">
          <div class="produto-slider">
            ${
              product.photos && product.photos.length > 1
                ? `<div class="slider">
                     ${product.photos
                       .map(
                         (photo, index) =>
                           `<img src="${photo}" alt="${product.name}" class="slide ${index === 0 ? 'active' : ''}" data-index="${index}">`
                       )
                       .join("")}
                     <button class="prev">&lt;</button>
                     <button class="next">&gt;</button>
                   </div>`
                : `<img src="${product.photo}" alt="${product.name}">`
            }
          </div>
          <div class="produto-descricao">
            <h3 class="nome">${product.name}</h3>
            ${
              hasDiscount
                ? `<div class="text-xss">
                     <span class="oldPriceCard">
                       R$&nbsp;${parseFloat(product.oldPrice).toFixed(2)}
                     </span>
                   </div>`
                : ""
            }
            <h1 class="preco">${parseFloat(product.price).toFixed(2)} R$</h1>
            <div class="text-xs margin">
              À vista no PIX </br>
              <span class="text-xs">
                ou até 
                <b class="text-xs">
                  12x de R$ ${(parseFloat(product.price) / 12).toFixed(2)}
                </b>
              </span>
            </div>
          </div>
        </a>
      </div>
    `;
    
      produtos.innerHTML += productCard;
    });

    activateSliders(); // Ativa os sliders após carregar os produtos

  } catch (error) {
    console.error("Erro ao carregar os produtos:", error);
  }
}

// Função para ativar o slide
function activateSliders() {
  document.querySelectorAll(".slider").forEach(slider => {
    const slides = slider.querySelectorAll(".slide");
    const prev = slider.querySelector(".prev");
    const next = slider.querySelector(".next");
    let currentIndex = 0;

    if (!prev || !next || slides.length === 0) return; // Verifica elementos necessários

    const updateSlides = () => {
      slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentIndex);
      });
    };

    prev.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlides();
    });

    next.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlides();
    });
  });
}

// Carrega os produtos quando a página é carregada
document.addEventListener("DOMContentLoaded", loadProducts);
