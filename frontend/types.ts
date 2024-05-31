type Item = {
    id ?: string,
    itemName: string,
    unit: 'kg' | 'g' | 'l' | 'ml' | 'whole' | 'packet' | 'bag',
    unitPrice?: number,
    quantityInStock: number
}

type Ingredient = {
    id?: string,
    itemUsed: Item,
    amount: number
}

type Dish = {
    id ?: string
    dishName: string,
    price: number,
    ingredients: Ingredient[]
}