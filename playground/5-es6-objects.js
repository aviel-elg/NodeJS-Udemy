const name = 'Aviel'
const userAge = 21

const user = {
    name, 
    age: userAge,
    location: 'Israel'
}

console.log(user)

// Object Destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// const label = product.label
// const stock = product.stock

// const {label, stock, rating} = product
// const {label: productLabel, stock, rating = 5} = product

// console.log(productLabel)
// console.log(stock)
// console.log(rating)

const transaction = (type, {label, stock}) => {
    console.log(type, label, stock)
}

transaction('order', product)