// Função para carregar os produtos do arquivo JSON
async function loadProducts() {
    try {
        const response = await fetch('./produtos.json');

        const products = await response.json();

        const produtos = document.querySelector('.produtos');
        produtos.innerHTML = '';

        products.forEach(product => {
            const productCard = `
                <div class="produto" id="produto-${product.id}">
                    <a href="#">
                        <img src="${product.photo}" alt="${product.description}">
                        <div class="produto-descricao">
                            <h3 class="descr">${product.description}</h3>
                            <h1 class="preco">${parseFloat(product.price).toFixed(2)} R$</h1>
                        </div>
                    </a>
                </div>
            `;
            produtos.innerHTML += productCard;
        });
    } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
    }
}

// Carrega os produtos quando a página é carregada
document.addEventListener('DOMContentLoaded', loadProducts);
