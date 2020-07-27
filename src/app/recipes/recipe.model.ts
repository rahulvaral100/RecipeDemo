import { Ingredians } from '../shared/ingredians.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ing : Ingredians[];

    constructor(name: string, description: string, imagePath: string, ing: Ingredians[]) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ing = ing;
    }
}