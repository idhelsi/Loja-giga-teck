// Função para carregar os produtos do arquivo JSON
async function loadProducts() {
  try {
    const response = await fetch("./produtos.json");

    const products = await response.json();

    const produtos = document.querySelector(".produtos");
    produtos.innerHTML = "";

    products.forEach((product) => {
      const hasDiscount =
        product.oldPrice &&
        parseFloat(product.oldPrice) > parseFloat(product.price);

      const productCard = `
                <div class="produto" id="produto-${product.id}">
                    <a href="#">
                        <img src="${product.photo}" alt="${
        product.description
      }">
                        <div class="produto-descricao">
                            <h3 class="descr">${product.description}</h3>
                            ${
                              hasDiscount
                                ? `<div class="text-xss">
                                            <span class="oldPriceCard">
                                                R$&nbsp;${parseFloat(
                                                  product.oldPrice
                                                ).toFixed(2)}
                                            </span>
                                            <span class="text-xss"></span>
                                       </div>`
                                : ""
                            }
                            <h1 class="preco">${parseFloat(
                              product.price
                            ).toFixed(2)} R$</h1>
                            <div class="text-xs margin">
                                À vista no PIX </br>
                                <span class="text-xs">
                                    ou até 
                                    <b class="text-xs ">
                                        12x de R$ ${(
                                          parseFloat(product.price) / 12
                                        ).toFixed(2)}
                                    </b>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            `;
      produtos.innerHTML += productCard;
    });
    
  } catch (error) {
    console.error("Erro ao carregar os produtos:", error);
  }
}

// Carrega os produtos quando a página é carregada
document.addEventListener("DOMContentLoaded", loadProducts);
