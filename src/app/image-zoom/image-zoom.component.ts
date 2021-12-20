import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.css']
})
export class ImageZoomComponent  {
  @Input() imgPath: string='';

  @ViewChild('element')
  element!: ElementRef;

  public img:any;
  public parentSize :any;

  constructor() {
  }

  ngAfterViewInit() {
    this.img = document.createElement('img');
    this.img.src = this.imgPath;
    // console.log(`${this.img.width}x${this.img.height} img: `, this.img);
    
    this.parentSize = {
      element: this.element.nativeElement.parentNode.parentNode,
      get width() {
        return this.element.offsetWidth;
      },
      get height() {
        return this.element.offsetHeight;
      },
    }
    // console.log(`${this.parentSize.width}x${this.parentSize.height} img: `, this.parentSize);

    this.element.nativeElement.style.width = `${this.parentSize.width}px`;
    this.element.nativeElement.style.height = `${this.parentSize.height}px`;
  }
  //For Zoom Image and moving image on mouse pointer move
  public imgZoom(event:any, zoom = 1): void {
    const img = event.target.children[0];

    const parentHeight = event.target.offsetHeight;
    const parentWidth = event.target.offsetWidth;
    const posX = event.layerX;
    const posY = event.layerY;

    img.style.width = `${parentWidth * zoom}px`;
    // console.log('parentWidth * zoom: ', img.width = parentWidth * zoom);
    img.style.height = `${parentHeight * zoom}px`;
    // console.log('parentHeight * zoom: ', img.height = parentHeight * zoom);

    // console.log(`\nx: ${posX} | y: ${posY}`);

    // console.log('img.width: ', img.width);
    // mouse move event move image
    img.style.left = `-${(event.layerX * (zoom - 1))}px`;
    img.style.top = `-${(event.layerY * (zoom - 1))}px`;
  }
  //For Reset image
  public resetImgZoom(event:any, zoom = 1): void {
    const img = event.target.children[0];

    const parentHeight = event.target.offsetHeight;
    const parentWidth = event.target.offsetWidth;
    img.style.width = `${parentWidth}px`;
    img.style.height = `${parentHeight}px`;

    event.target.children[0].style.top = `${0}px`;
    event.target.children[0].style.left = `${0}px`;
  }
}
