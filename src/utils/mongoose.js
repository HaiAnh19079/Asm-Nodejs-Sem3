const MultipleMongooseToObject = function (mongooses) {
    return mongooses.map(mongooses => mongooses.toObject())
}
const MongooseToObject = function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose
}
export { MultipleMongooseToObject, MongooseToObject }
