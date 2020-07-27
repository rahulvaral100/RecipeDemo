import { Component, OnInit } from '@angular/core';
import { Ingredians } from '../shared/ingredians.model'
import { ShoppingListService } from './shopping-list.service'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
    
    ingredians: Ingredians[];

    constructor(private slService: ShoppingListService) { }

    ngOnInit(): void {
        this.ingredians = this.slService.getIngredients();
        this.slService.ingChanged.subscribe((ing: Ingredians[])=> {
            this.ingredians = ing;
        })
    }

    onEdit(id) {
        this.slService.editIndex.emit(id);
    }
}
