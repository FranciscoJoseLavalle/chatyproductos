// import File from '../classes/file.js';
// const productDB = new File('products')

// const productsController = {
//     getAllProduct: async () => {
//         try {
//             const allProducts = await productDB.getAll()
//             return allProducts
//         } catch (error) {
//             console.log(`ERROR: ${error}`)
//         }
//     },

//     addNewProduct: async (product) => {
//         try {
//             const prevProducts = await productDB.getAll()

//             const getNewId = () => {
//                 let lastID = 0
//                 if (prevProducts.length) {
//                     lastID = prevProducts[prevProducts.length - 1].id
//                 }
//                 return lastID + 1
//             }

//             const newProduct = {
//                 id: getNewId(),
//                 title: product.title ? product.title : 'No Title',
//                 price: product.price ? product.price : 0,
//                 thumbnail: product.thumbnail
//             }

//             await productDB.addItem(newProduct)
//         } catch (error) {
//             console.log(`ERROR: ${error}`)
//         }
//     },
// }

// export default productsController
