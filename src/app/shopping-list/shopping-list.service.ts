import { Injectable, EventEmitter, Output } from '@angular/core';
import { Ingredians } from '../shared/ingredians.model'

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

    @Output() ingChanged = new EventEmitter<Ingredians[]>();
    @Output() editIndex = new EventEmitter<number>();

    private ingredians: Ingredians[] =[
        new Ingredians('apple',20),
        new Ingredians('abc',30),
    ];

    constructor() { }

    getIngredients() {
        return this.ingredians.slice();
    }

    addIngredients(ing) {
        this.ingredians.push(ing);
        this.ingChanged.emit(this.ingredians.slice());
    }

    addIngredientsToShoppingList(ing: Ingredians[]) {
        this.ingredians.push(...ing);
        this.ingChanged.emit(this.ingredians.slice());
    }

    getIng(index) {
        return this.ingredians[index];
    }

    updateIng(index, ing: Ingredians) {
        this.ingredians[index] = ing;
        this.ingChanged.emit(this.ingredians.slice());
    }

    deleteIng(index) {
        this.ingredians.splice(index, 1);
        this.ingChanged.emit(this.ingredians.slice());
    }
}
