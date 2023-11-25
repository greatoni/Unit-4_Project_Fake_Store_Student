
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
    //create elements

    //assign attributes

    //append to parent
}