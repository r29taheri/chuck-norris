import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  leftTransform: string;
  rightTransform: string;
  centerCircleRotateLeft: string;
  centerCircleRotateRight: string;
  changeCat: boolean = false;
  showLoading: boolean = true;
  catOuterContainerEl: string;
  constructor() { }
  handleMouseMove(e: MouseEvent) {
    if(window.innerWidth < 768) return;
    const halfWinWidth = window.innerWidth / 2;
    const halfWinHeight = window.innerHeight / 2;
    const wMagicNumber = ((halfWinWidth - e.pageX) / halfWinWidth) * 10;
    const hMagicNumber = ((halfWinHeight - e.pageY) / halfWinHeight) * 20;
    this.leftTransform = `translate(${50 + wMagicNumber}%, ${-50 + hMagicNumber}%)`;
    this.rightTransform = `translate(${-50 + wMagicNumber}%, ${-50 + hMagicNumber}%)`;
    this.centerCircleRotateLeft = `translate(50%, -50%) rotate(${45 * wMagicNumber}deg)`;
    this.centerCircleRotateRight = `translate(-50%, -50%) rotate(${-90 * wMagicNumber}deg)`;
  }
}