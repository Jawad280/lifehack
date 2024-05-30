type Item = {
    id ?: string,
    itemName: string,
    unit: 'kg' | 'g' | 'l' | 'ml' | 'whole' | 'packet' | 'bag',
    unitPrice?: number,
    quantityInStock: number
}

type Ingredient = {
    itemUsed: Item,
    amount: number
}

type Dish = {
    name: string,
    price: number,
    ingredients: Ingredient[]
}