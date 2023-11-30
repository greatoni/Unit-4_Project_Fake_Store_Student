
// * Global Variables

const category1 = document.getElementById("category1")
const category2 = document.getElementById("category2")
const category3 = document.getElementById("category3")

const displayDiv = document.getElementById("display");

const cart = [];

const baseUrl = "https://fakestoreapi.com/"

//Variables for CartModal items;
const cartB = document.getElementById('cartButton');

const tableB = document.getElementById('tableBody');

const subtotalP = document.getElementById('Subtotal');
const taxP = document.getElementById('Tax');
const shippingP = document.getElementById('Shipping');
const totalP = document.getElementById('Total');

const clearB = document.getElementById('clearCart');
const purchaseB = document.getElementById('purchase')

//declaring alert statements and functions
const alertPlace = document.getElementById('alertPlacement')
const appendAlert = (message, type) => {
const wrapper = document.createElement('div')
    wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
].join('')

  alertPlace.append(wrapper)
}

// async function fake store
async function fakeStore(endpoint)
{
    let fakePromise = await fetch(`${baseUrl}${endpoint}`);

    let jsonPromise = await fakePromise.json();

    //console.log(jsonPromise);

    displayCards(jsonPromise);
}

onload = () => {
    fakeStore("products");
    //console.log(category1)
}

//* Event Listeners

category1.addEventListener('click', e => {
    e.preventDefault();

    //console.log('selected game section')
    fakeStore("products/category/electronics");
})

category2.addEventListener('click', e => {
    e.preventDefault();

    //console.log('selected book section')
    fakeStore("products/category/jewelery");
})

category3.addEventListener('click', e => {
    e.preventDefault();

    //console.log('selected mini section')
    fakeStore("products/category/men's clothing");
})

cartB.addEventListener('click', e => {
    e.preventDefault();

    //console.log('selected mini section')
    displayCart();
})

clearB.addEventListener('click', e => {
    // Purchase and clear do the same things, purchase just does something more!
    e.preventDefault();
    emptyCart();
})

purchaseB.addEventListener('click', e => {
    e.preventDefault();
    emptyCart();
    //! AN ALERT SHOULD BE PLACED HERE!!!!!!!
    appendAlert('THANK YOU FOR YOUR PURCHASE!!!!', 'success')

})

//*Functions:

function emptyElements(element) {
    while(element.firstChild)
    {
        element.removeChild(element.firstChild)
    }
}

function displayCards(endpoint)
{
    console.log(endpoint)

    emptyElements(displayDiv)

    for (items in endpoint)
    {

    // A loop should be created starting here that loops through each product within a category,
    //*create elements

    let newCard = document.createElement('div')
    let title = document.createElement('h3')

    let img = document.createElement('img');

    let body = document.createElement('div')

    //Append both the description and price to this div INSTEAD of the body.
    let accordion = document.createElement('div');

    // These elements are listed in the order they are appended
    let descAccordion = document.createElement('div');
    let descAccHeader = document.createElement('h2');
    let descAccordionButton = document.createElement('button')
    let descCollapse = document.createElement('div');
    let descBody = document.createElement('div')
    let desc = document.createElement('p')
    // List End

    let hl = document.createElement('hr')
    
    // These elements are listed in the order they are appended
    let priceAccordion = document.createElement('div');
    let priceAccHeader = document.createElement('h2');
    let priceAccordionButton = document.createElement('button')
    let priceCollapse = document.createElement('div');
    let priceBody = document.createElement('div')
    let price = document.createElement('p')
    // List End

    let add = document.createElement('button');

    //assign attributes

    newCard.className = 'card';

    img.className = 'cardImg';
    img.src = endpoint[items].image

    body.className = 'cardBody';

    title.textContent = endpoint[items].title;
    title.className = 'title';

    accordion.className = 'accordion';
    accordion.id = `cardAccordion${endpoint[items].id}`

    // DescAccordion stuff
    descAccordion.className = 'accordion-item'
    descAccHeader.className = 'accordion-header'
    
    descAccordionButton.className = 'accordion-button collapsed'
    descAccordionButton.textContent = 'Description'
    descAccordionButton.setAttribute("data-bs-toggle","collapse")
    descAccordionButton.setAttribute('data-bs-target',`#descCollapse${endpoint[items].id}`)
    descAccordionButton.setAttribute('aria-expanded', 'true')
    descAccordionButton.setAttribute('aria-controls', 'collapseOne');

    descCollapse.className = "accordionCollapse collapse"
    descCollapse.id = `descCollapse${endpoint[items].id}`
    descCollapse.setAttribute('data-bs-parent',`cardAccordion${endpoint[items].id}`)
    
    descBody.className = 'accordion-body'

    desc.textContent = endpoint[items].description
    desc.className = 'desc'

    // priceAccordion Stuff
    priceAccordion.className = 'accordion-item'
    priceAccHeader.className = 'accordion-header'

    priceAccordionButton.className = 'accordion-button collapsed'
    priceAccordionButton.textContent = 'Price'
    priceAccordionButton.setAttribute("data-bs-toggle","collapse")
    priceAccordionButton.setAttribute('data-bs-target',`#priceCollapse${endpoint[items].id}`)
    priceAccordionButton.setAttribute('aria-expanded', 'true')
    priceAccordionButton.setAttribute('aria-controls', 'collapseOne');

    priceCollapse.className = "accordionCollapse collapse"
    priceCollapse.id = `priceCollapse${endpoint[items].id}`
    priceCollapse.setAttribute('data-bs-parent',`cardAccordion${endpoint[items].id}`)
    
    priceBody.className = 'accordion-body'

    price.textContent = `${endpoint[items].price.toFixed(2)}$`
    price.className = 'price'

    add.className = 'addbutton'

    let id = endpoint[items].id;
    let itemTitle = endpoint[items].title;
    let itemcost = endpoint[items].price
    
    add.onclick = () =>
    {
        console.log(items)
        let abbridgedItem = {
            id : id,
            title : itemTitle,
            cost : itemcost,
            quantity : 1,
        }
        submitToCart(abbridgedItem)
    }
    add.textContent = 'Add to Cart!'

    //append to parent

    //descAccordion.appendChild(desc);

    //priceAccordion.appendChild(price);

    body.appendChild(title)
    
    descBody.appendChild(desc);
    descCollapse.appendChild(descBody);
    
    descAccHeader.appendChild(descAccordionButton);
    
    descAccordion.appendChild(descAccHeader);
    descAccordion.appendChild(descCollapse);
    accordion.appendChild(descAccordion)

    priceBody.appendChild(price);
    priceCollapse.appendChild(priceBody);

    priceAccHeader.appendChild(priceAccordionButton);

    priceAccordion.appendChild(priceAccHeader);
    priceAccordion.appendChild(priceCollapse);
    accordion.appendChild(priceAccordion)

    body.appendChild(accordion);
    body.appendChild(add)

    newCard.appendChild(img)
    newCard.appendChild(body)    

    displayDiv.appendChild(newCard)
    }
}

function submitToCart(item)
{
    let ispresent = false;
    for(items in cart)
    {

        if(cart[items].id === item.id) {
        cart[items].quantity += item.quantity;
        ispresent = true;
        }
    }

    if(!ispresent)
    {
        cart.push(item);
    }
    console.log(cart);
}

//Functions regarding the cart are placed here!
function emptyCart() {
    while(cart.length > 0)
    {
        cart.pop();
    }
    displayCart();
}

function displayCart() {
    //empty elements
    emptyElements(tableB);


    //create and populate table rows with cart items,
    for(items in cart)
    {
        //create
        let newRow = document.createElement('tr')
        let quantityHeader = document.createElement('th')
        let itemT = document.createElement('td')
        let priceT = document.createElement('td')

        //assign

        quantityHeader.setAttribute('scope','row');

        quantityHeader.textContent = cart[items].quantity;
        itemT.textContent = `${cart[items].title} for ${cart[items].cost} each.`
        let multiprice = (cart[items].cost * cart[items].quantity)
        priceT.textContent = `$${multiprice.toFixed(2)}`;

        //append
        newRow.appendChild(quantityHeader);
        newRow.appendChild(itemT);
        newRow.appendChild(priceT);

        tableB.appendChild(newRow);

    }

    //determine the totals of various items!
    accessTotals();
}


// access the various totals of the numbers.
function accessTotals() {
    let subTotal = 0;
    let taxRate = 0.07;
    let shippingCost = 0.10;

    for (items in cart)
    {
        subTotal += (cart[items].cost * cart[items].quantity)
        console.log(subTotal);
    }
    let taxes = (subTotal * taxRate)
    let taxedTotal = (subTotal + taxes);
    let shippingCosts = (taxedTotal * shippingCost)
    let totalTotal = (taxedTotal + shippingCosts);

    subtotalP.textContent = `$${subTotal.toFixed(2)}`;
    taxP.textContent = `$${taxes.toFixed(2)}`;
    shippingP.textContent = `$${shippingCosts.toFixed(2)}`;
    totalP.textContent = `$${totalTotal.toFixed(2)}`;

    purchaseB.textContent = `Purchase for $${totalTotal.toFixed(2)}`
}