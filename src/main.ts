import './style.css'
import { IProduct } from './interfaces/IProduct'



const BASE_URL = `https://fakestoreapi.com`
const BASE_URL_PRODUCTS = `${BASE_URL}/products`


// * ELEMENTE VOM AUFBAU (HTML) SELEKTIEREN

const output = document.getElementById("output-products") as HTMLDivElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const sortInput = document.getElementById("sort") as HTMLSelectElement;
const categoriesBtn = document.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;



let productsArray: IProduct[] = []

async function fetchAllProducts(url: string) {
  try {
    const response = await fetch(url)
    console.log(response)
    const result = await response.json()
    console.log(result);
    productsArray = result
    showProducts(productsArray)
  } catch (error) {
    console.error(error);
  }
}

fetchAllProducts(BASE_URL_PRODUCTS)


function showProducts(products: IProduct[]) {
  output.innerHTML = ""

  products.forEach((product: IProduct) => {
    console.log(product);

    const productElement = createProductElement(product)
    output.appendChild(productElement)
  })


}


function createProductElement(product: IProduct): HTMLElement {
  const div = document.createElement("div") as HTMLDivElement;

  const title = document.createElement("h3") as HTMLHeadElement
  title.textContent = product.title

  div.appendChild(title)
  return div
}