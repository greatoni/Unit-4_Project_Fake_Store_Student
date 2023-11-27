
// * Global Variables

const category1 = document.getElementById("category1")
const category2 = document.getElementById("category2")
const category3 = document.getElementById("category3")

const displayDiv = document.getElementById("display");

const baseUrl = "https://fakestoreapi.com/"

// async function fake store
async function fakeStore(endpoint)
{
    let fakePromise = await fetch(`${baseUrl}${endpoint}`);

    console.log(fakePromise);

    displayCards('');
}

onload = () => {
    fakeStore("products");
    console.log(category1)
}

displayCards(parameter)

//* Event Listeners

category1.addEventListener('click', e => {
    e.preventDefault();

    console.log('selected game section')
    fakeStore("products/category/game");
})

category2.addEventListener('click', e => {
    e.preventDefault();

    console.log('selected book section')
    fakeStore("products/category/book");
})

category3.addEventListener('click', e => {
    e.preventDefault();

    console.log('selected mini section')
    fakeStore("products/category/mini");
})

//*Functions:

displayCards(parameter)
{
    //*create elements

    let newCard = document.createElement('div')
    let title = document.createElement('h3')

    let img = document.createElement('img');

    let body = document.createElement('div')

    // These elements are listed in the order they are appended
    let descAccordion = document.createElement('div');
    let desc = document.createElement('p')
    // List End

    let hl = document.createElement('hr')
    
    // These elements are listed in the order they are appended
    let priceAccordion = document.createElement('div');
    let price = document.createElement('p')
    // List End

    let add = document.createElement('button');

    //assign attributes

    newCard.className = 'card';

    img.className = 'cardImg';

    body.className = 'cardBody';

    title.textContent = "Placeholder!"
    title.className = 'title';

    descAccordion.className = 'accordionClass'
    desc.textContent = "PlaceHolder!"
    desc.className = 'desc'

    priceAccordion.className = 'accordionClass'
    price.textContent = "0$"
    price.className = 'price'

    add.className = 'addbutton'
    add.textContent = 'Add to Cart!'

    //append to parent

    descAccordion.appendChild(desc);

    priceAccordion.appendChild(price);

    body.appendChild(title)
    body.appendChild(descAccordion)
    body.appendChild(priceAccordion)
    body.appendChild(add)

    newCard.appendChild(img)
    newCard.appendChild(body)    
}