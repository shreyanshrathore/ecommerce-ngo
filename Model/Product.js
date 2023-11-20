const mongoose = require("mongoose")
const {Schema} = mongoose


const productSchema = new Schema ({
    title: { type: String, required: true, unique: true},
    description: { type: String},
    price: { type: Number, min:[1, 'wrong min price'], max:[100000, 'wrong max price']},
    discountPercentage: { type: Number, min:[0, 'wrong min discount'], max:[100, 'wrong max discount']},
    rating: { type: Number, min:[0, 'wrong rating'], max: [5, "wrong rating "], default:0},
    stock: { type: Number, min:[0, 'wrong rating'],  default:0},
    brand: { type: String},
    category: { type: String},
    thumbnail: { type: String},
    images: { type: [String]},
    deleted: { type: Boolean, default: false},
    admin:{ type: Schema.Types.ObjectId  , ref: 'User', required: true},
    approved: {type: Boolean, required: true,  default: false}
})

const virtual = productSchema.virtual('id')
virtual.get(function(){
    return this._id;
})

productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){ delete ret._id}
})


exports.Product = mongoose.model('Product', productSchema)