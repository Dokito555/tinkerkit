
export interface ItemRequestModel {
    id: String
    name: String
    tag: String
    price: Number
}

export interface ItemResponseModel {
    id: String
    name: String
    tag: String
    isAvailable: Boolean
    createdAt: Date
    updatedAt: Date
}