import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

    @HostBinding('class.open') isOpen = false;
    @HostListener('click') toggle() {
        this.isOpen = !this.isOpen; 
    }
    // @HostListener('mouseover') mouseover(eventData: Event) {
    //     this.isOpen = true
    //    // this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    // }
    // @HostListener('mouseleave') mouseleave(eventData: Event) {
    //     this.isOpen = false;
    // }
  constructor(private elRef: ElementRef) { }
}
