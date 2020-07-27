import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    
    id: number;
    editMode: boolean = false;
    recipeForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private recipeService: RecipeService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((param: Params)=> {
            this.id = param['id'];
            this.editMode = this.id != null;
            this.inItForm();
        })
    }

    private inItForm() {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIng = new FormArray([]);
        if(this.editMode) {
            const recipe = this.recipeService.getRecipeById(this.id);
            console.log(recipe)
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
            if(recipe['ing']) {
                for(let ing of recipe.ing) {
                    recipeIng.push(new FormGroup({
                        'name': new FormControl(ing.name, Validators.required),
                        'amount':new FormControl(ing.amount, Validators.required)
                    }))
                }
            }
        }
        this.recipeForm = new FormGroup({
            name: new FormControl(recipeName, Validators.required),
            imageUrl: new FormControl(recipeImagePath, Validators.required),
            description: new FormControl(recipeDescription, Validators.required),
            ing: recipeIng
        })
    }

    onSubmit() { 
        // const newRecipe = new Recipe(this.recipeForm.value['name'],
        //     this.recipeForm.value['imagePath'],
        //     this.recipeForm.value['description'],
        //     this.recipeForm.value['ing'])
        if(this.editMode) {
            this.recipeService.updateRecipe(this.id, this.recipeForm.value)
        } else {
            this.recipeService.addRecipe(this.recipeForm.value)
        }
        this.onCancel();
    }

    get controls() { // a getter!
        return (<FormArray>this.recipeForm.get('ing')).controls;
    }

    addIng() {
        (<FormArray>this.recipeForm.get('ing')).push(
            new FormGroup({
                'name': new FormControl(null,Validators.required),
                'amount': new FormControl(null,Validators.required)
            })
        )
    }

    onCancel() {
        this.router.navigate(['../'],{relativeTo: this.route})
    }

    onDetIng(index: number) {
        (<FormArray>this.recipeForm.get('ing')).removeAt(index);
    }

}
