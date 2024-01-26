import {gql} from '@apollo/client'

export const LOAD_PRODUCTS = gql`
    query GetProducts($categoryId: ObjectId, $keyword: String, $skip: Int, $limit: Int) {
        GetProducts(categoryId: $categoryId, keyword: $keyword, skip: $skip, limit: $limit) {
        code
        name
        price
        brand
        _id
        }
    }
`