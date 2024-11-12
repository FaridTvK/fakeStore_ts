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
    // console.log(product);





    // ! v1.
    // const productElement = createProductElement(product)
    // output.appendChild(productElement)

    // ! v2.
    output.appendChild(createProductElement(product))

  })


}


function createProductElement(product: IProduct): HTMLElement {
  const div = document.createElement("div") as HTMLDivElement;

  const title = document.createElement("h3") as HTMLHeadElement
  title.textContent = product.title

  const image = createImage(product.image)
  const price = createPrice(product.price)



  const addToCardBtn = document.createElement("button") as HTMLButtonElement;
  addToCardBtn.textContent = "Add To Cart"

  addToCardBtn.addEventListener("click", () => {
    console.log(`${product.title} added to cart`);
  })

  div.appendChild(title)
  div.appendChild(image)
  div.appendChild(price)
  div.appendChild(addToCardBtn)

  return div
}


function createImage(urlBild: string): HTMLImageElement {
  const imageElement = document.createElement("img") as HTMLImageElement;
  imageElement.src = urlBild
  imageElement.alt = "Product Image"
  imageElement.classList.add("product-img")
  return imageElement
}

function createPrice(value: number): HTMLHeadElement {
  const paragraph = document.createElement("h3") as HTMLHeadElement;
  paragraph.textContent = `${value}$`
  return paragraph
}



searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.trim().toLowerCase()
  console.log(searchValue);

  const filteredProduct: IProduct[] = productsArray.filter((product: IProduct) => {
    return product.title.toLowerCase().includes(searchValue)
  }
  )
  console.log(filteredProduct);
  showProducts(filteredProduct)
})



sortInput.addEventListener("change", () => {
  const sortBy = sortInput.value.trim()

  let sortedProducts = [...productsArray]

  if (sortBy === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price)
  } else {
    sortedProducts.sort((a, b) => a.price - b.price)
  }

  showProducts(sortedProducts)
})



categoriesBtn.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener("click", () => {
    const category = btn.textContent?.trim().toLowerCase()
    console.log(category);
    let relateApiURL = ""

    if (category === "men's clothing") {
      relateApiURL = `${BASE_URL_PRODUCTS}/category/men's%20clothing`
    } else if (category === "electronics") {
      relateApiURL = `${BASE_URL_PRODUCTS}/category/electronics`
    } else if (category === "jewelery") {
      relateApiURL = `${BASE_URL_PRODUCTS}/category/jewelery`
    } else if (category === "women's clothing") {
      relateApiURL = `${BASE_URL_PRODUCTS}/category/women's%20clothing`
    }

    fetchAllProducts(relateApiURL)

  })
})

