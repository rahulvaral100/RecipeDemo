import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredians } from '../../shared/ingredians.model'
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit {
    @Output() ingredientAdded = new EventEmitter<Ingredians>();
    @ViewChild('f') ingForm: NgForm;
    editMode: boolean = false;
    editIndex: number;

    constructor(private slService: ShoppingListService) { }

    ngOnInit(): void {
        this.slService.editIndex.subscribe((index: number)=> {
            this.editMode = true;
            this.editIndex = index;
            let ing = this.slService.getIng(index);
            this.ingForm.setValue({
                name: ing.name,
                amt: ing.amount
            })
        })
    }

    onAddItem(form: NgForm) {
        let value = form.value;
        const newIngrediant = new Ingredians(value.name, value.amt);
        if(this.editMode) {
            this.slService.updateIng(this.editIndex, newIngrediant);
        } else {
            this.slService.addIngredients(newIngrediant);
        }
        this.editMode = false;
        form.reset();
    }

    onClear() {
        this.editMode = false;
        this.ingForm.reset();
    }

    onDelete() {
        this.onClear();
        this.slService.deleteIng(this.editIndex);
    }
}
