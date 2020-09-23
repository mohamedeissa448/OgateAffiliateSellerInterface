import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appItemSelectChanger]'
})
export class ItemSelectChangerDirective {

  constructor(private _ren: Renderer2, private _el: ElementRef) { }

  @HostListener('click') onClick() {
    const el = document.querySelector('.taskl-list-item-active'); // first
    if(el)el.classList.remove('taskl-list-item-active');
    this._ren.addClass(this._el.nativeElement, 'taskl-list-item-active');
  }
  

}