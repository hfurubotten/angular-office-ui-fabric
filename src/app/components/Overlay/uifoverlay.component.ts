import { Component, Input, Output, EventEmitter } from '@angular/core';
import 'office-ui-fabric-js/src/components/Overlay/Overlay';

@Component({
    moduleId: module.id,
    selector: 'uif-overlay',
    templateUrl: './uifoverlay.component.html'
})
export class UifOverlayComponent {
    @Input() uifId: string = '';
    @Input() uifDark: boolean = false;
    @Input() uifShow: boolean = false;
    @Input() uifPersistent: boolean = false;
    @Output() uifClick: EventEmitter<any> = new EventEmitter<any>();
    private overlay: fabric.Overlay;
    private visible: boolean = false;

    constructor() { }

    private initialize():void {
        var overlayContainer = document.getElementById(this.uifId);
        var overlayElement = <HTMLElement>overlayContainer.querySelector(".ms-Overlay");
        this.overlay = new fabric.Overlay(overlayElement);
    }

    private showOverlay():void {
        if(this.overlay != null) {
            if(this.uifShow) {
                this.overlay.show();
            } else {
                this.overlay.hide();
            }
        }
    }

    overlayClick():void {
        this.handlePersistence();
        this.uifClick.emit();
    }

    private handlePersistence():void {
        if(this.uifPersistent) {
            this.showOverlay();
        } else {
            this.uifShow = false;
        }
    }

    ngOnChanges(changes: any) {
        this.showOverlay();
     }

     ngAfterViewInit() {
        this.initialize();
        this.showOverlay();
     }
     
}