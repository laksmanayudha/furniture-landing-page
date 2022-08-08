window.onload = () => {

    const STORAGE_KEY = 'card_items'
    let searchValue = '';
    let cardItems = [];

    // elements
    const menuButton = document.getElementById('menuButton');
    const menuList = document.getElementById('menuList');
    const cardContainer = document.getElementById('cardContainer');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchForm');
    const findMeButton = document.getElementById('findMeButton');
    const findMeUl = document.querySelector('.find-me ul');
    const dropdown = document.querySelector('.dropdown');
    const categoriesButton = document.getElementById('categoriesButton');

    // functions
    const fillCards = () => {
        cardContainer.innerHTML = ''
        for (let item of cardItems){
            cardContainer.innerHTML += `
            <div class="card rounded">
            <img src="${item.image}" alt="">
            <div class="card-description">
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <span class="text-muted">(1k+)</span>
                </div>
                <h3>${item.title}</h3>
                <p>Rp. ${item.price}</p>
                <div class="card-action-btn">
                    <button class="btn btn-primary">Add</button>
                    <button class="btn btn-secondary">Detail</button>
                </div>
            </div>
        </div>
            `
        }
    }

    const findItems = (value) => {
        value = value.toLowerCase()
        cardItems = JSON.parse(localStorage.getItem(STORAGE_KEY))
        cardItems = cardItems.filter(item => item.title.toLowerCase().includes(value))
        fillCards();
    }

    const storageExists = () => {
        return typeof(Storage) !== "undefined";
    }

    // eventlistener
    menuButton.addEventListener('click', () => {
        menuList.classList.toggle('toggle')
    });

    searchInput.addEventListener('input', (event) => {
        searchValue = event.target.value;
    })

    searchButton.addEventListener('click', () => {
        findItems(searchValue);
    })

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        findItems(searchValue);
    })

    findMeButton.addEventListener('click', () => {

        if( findMeButton.innerText === 'Contact me now' ){
            findMeUl.style.visibility = 'hidden'
            findMeUl.style.opacity = '0'
            findMeUl.style.transition = '.3s'
            findMeButton.innerText = 'Find me on'
        }else{
            findMeUl.style.visibility = 'visible'
            findMeUl.style.opacity = '1'
            findMeUl.style.transition = '.5s'
            findMeButton.innerText = 'Contact me now'
        }
    })

    categoriesButton.addEventListener('click', (event) => {
        event.preventDefault();
        dropdown.classList.toggle('opacity-full')
    })
    
    document.addEventListener('click', (event) => {
        if( !event.target.classList.contains('dropdown-item') && event.target.id !== 'categoriesButton'){
            dropdown.classList.remove('opacity-full')
        }
    })


    // storage
    if(storageExists){
        if( !localStorage.getItem(STORAGE_KEY) ){

            localStorage.setItem(STORAGE_KEY, JSON.stringify(
                [
                    {
                        title: 'Kursi Bagus',
                        price: 350000,
                        image: 'asset/images/kursi-satu.jpg'
                    },
                    {
                        title: 'Kursi Dua Bagus',
                        price: 550000,
                        image: 'asset/images/kursi-dua.jpg'
                    },
                    {
                        title: 'Meja Bagus',
                        price: 650000,
                        image: 'asset/images/meja-satu.jpg'
                    },
                    {
                        title: 'Meja Bagus',
                        price: 650000,
                        image: 'asset/images/meja-satu.jpg'
                    },
                    {
                        title: 'Kursi Dua Bagus',
                        price: 550000,
                        image: 'asset/images/kursi-dua.jpg'
                    },
                    {
                        title: 'Kursi Bagus',
                        price: 350000,
                        image: 'asset/images/kursi-satu.jpg'
                    },
                ]
            ))
        }

        cardItems = JSON.parse(localStorage.getItem(STORAGE_KEY))
    }

    fillCards();
}