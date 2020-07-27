import { Injectable, EventEmitter, Output  } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredians } from '../shared/ingredians.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

    @Output() selectedRecipe = new EventEmitter<Recipe>();
    @Output() recipeChanged = new EventEmitter<Recipe[]>();

    recipes: Recipe[] = [
        new Recipe('Test Recipe', 'Test Discription', 'https://placeimg.com/640/480/any',[ new Ingredians('meat',1),new Ingredians('burger',2)]),
        new Recipe('Test Recipe 2', 'Test Discription', 'https://placeimg.com/641/481/any',[ new Ingredians('meat',1),new Ingredians('burger',2)]),
        new Recipe('Test Recipe 3 ', 'Test Discription', 'https://placeimg.com/641/482/any',[ new Ingredians('meat',1),new Ingredians('burger',2)])
    ];
    
    constructor(private slService: ShoppingListService) {
        
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(index) {
        return this.recipes.slice()[index];
    }

    addIngredientsToShoppingList(ing : Ingredians[]) {
        this.slService.addIngredientsToShoppingList(ing);
    }

    updateRecipe(index, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.emit(this.recipes.slice());
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
        this.recipeChanged.emit(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.emit(this.recipes.slice());
    }
}
