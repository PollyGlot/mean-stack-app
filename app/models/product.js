var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// product Schema
var ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    description: String,
    price: String,
    category: String,
    image: {
        url: String
    }
});

// // product Schema
// var ProductSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//         index: {
//             unique: true
//         }
//     },
//     shortDescription: String,
//     longDescription: String,
//     price: String,
//     category: String,
//     image: String
// });

module.exports = mongoose.model('Product', ProductSchema);
