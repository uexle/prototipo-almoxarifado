// tags: ele, mec, lim, mol, pap, epi, ref

const productsData = [
    {
        imgSrc: 'https://static-01.daraz.com.bd/p/ed9e2c44893981a1a81f9061eda0189e.jpg',
        description: 'Fonte',
        code: '12345678',
        tags: ['ele']
    },
    {
        imgSrc: 'https://cdn.leroymerlin.com.br/products/parafuso_area_molhada_4,8x38mm_auto_atarraxante_philips_10un_86941491_dfdc_600x600.jpg',
        description: 'Parafuso',
        code: '23456789',
        tags: ['pap']
    },
    {
        imgSrc: 'https://daxonart8aj4m.cloudfront.net/Custom/Content/Products/72/89/7289_34113-culos-de-proteo-jaguar-incolor-linha-epi-kalipso_m1_637853711153724536.jpg',
        description: 'Óculos de Proteção',
        code: '34567890',
        tags: ['epi']
    },
    {
        imgSrc: 'https://tb0932.vtexassets.com/arquivos/ids/163205/117792.png?v=637705340721670000',
        description: 'Vassoura Azul',
        code: '45678901',
        tags: ['lim']
    },
    {
        imgSrc: 'https://centermedical.vtexassets.com/arquivos/ids/164092/Protetor-Auricular-de-Silicone---Supermedy---Tipo-Plug---Center-Medical.png?v=637992988521700000',
        description: 'Protetor Auricular',
        code: '56789012',
        tags: ['epi']
    },
    {
        imgSrc: 'https://a-static.mlcdn.com.br/450x450/eixo-virabrequim-do-motor-chevrolet-onix-prisma-celta-corsa-classic-novo-corsa-todos-1-0-8v-flex-original-chevrolet/altese/2010796/637f91df5a01474e7107d7c4b7e29303.jpeg',
        description: 'Eixo Virabrequim',
        code: '67890123',
        tags: ['mec']
    },
];

function generateProducts() {
    const productsContainer = document.querySelector('.products');
    const productExample = document.querySelector('.product');
    const productTemplate = productExample.cloneNode(true);

    productsData.forEach(data => {
        let product = productTemplate.cloneNode(true);
        let productImg = product.querySelector('img');
        let productDescription = product.querySelector('.description');
        let productCode = product.querySelector('.code');
        let productTags = product.querySelector('tags');

        productImg.src = data.imgSrc;
        productDescription.textContent = data.description;
        productCode.innerHTML = `COD.<span>${data.code}</span>`
        productsContainer.appendChild(product);
        productTags.textContent = data.tags.join(',');
    });

    productExample.style.display = 'none';
}

function getTags() {
    const urlParams = new URLSearchParams(window.location.search);
    var tags = [];

    urlParams.forEach((value, name) => {
        tags.push(`${name}`);
    });

    tags = tags.splice(1);
    return tags;
}

function keepState() {
    const urlParams = new URLSearchParams(window.location.search);
    const tags = getTags();
    const search = urlParams.get('search')
    const checkboxes = document.querySelectorAll('.filter input[type="checkbox"]');
    const searchBar = document.querySelector('.search-bar');

    checkboxes.forEach(checkbox => {
        if (tags.includes(checkbox.name)) {
            checkbox.checked = true;
        }
    });

    if (search) {
        searchBar.value = search;
    }
}

function filterBySearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    if (!search) return;
    else search = search.toLowerCase();
    if (search == '') {
        console.log('');
        return
    }

    const products = document.querySelectorAll('.product');
    products.forEach((product) => {
        let productDescription = product.querySelector('.description').textContent.toLowerCase();
        if (!productDescription.includes(search))
            product.style.display = 'none';
    })
}

function filterProductsByTags() {
    const tags = getTags();
    if (tags.length == 0) return;

    const products = document.querySelectorAll('.product');

    products.forEach((product) => {
        let productTagsString = product.querySelector('tags').textContent;
        const productTags = productTagsString.split(',');
        if (!productTags.some(tag => tags.includes(tag))) {
            product.style.display = 'none';
        }
    })
}

function submitFormOnFilter() {
    const searchForm = document.getElementById('search');
    const filterCheckboxes = document.querySelectorAll('.filter input[type="checkbox"]');

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            searchForm.submit();
        });
    });
}

generateProducts();
keepState();
filterBySearch();
filterProductsByTags();
submitFormOnFilter();