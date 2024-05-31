type Item = {
    id ?: string,
    itemName: string,
    unit: 'kg' | 'g' | 'l' | 'ml' | 'whole' | 'packet' | 'bag',
    unitPrice?: number,
    quantityInStock: number
}

type Ingredient = {
    amount: number,
    dish_id?: string,
    item_id?: string,
}

type Dish = {
    id ?: string
    dishName: string,
    price: number,
    ingredients: Ingredient[]
}