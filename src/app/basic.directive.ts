import { Directive, ElementRef, OnInit, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appBasic]'
})
export class BasicDirective implements OnInit {

    constructor(private ele: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
       // this.ele.nativeElement.style.color = 'blue';
       
    }

    @HostListener('mouseover') mouseover(eventData: Event) {
        this.renderer.setStyle(this.ele.nativeElement,'color','blue');
    }
    @HostListener('mouseleave') mouseleave(eventData: Event) {
        this.renderer.setStyle(this.ele.nativeElement,'color','transparent');
    } 

}
