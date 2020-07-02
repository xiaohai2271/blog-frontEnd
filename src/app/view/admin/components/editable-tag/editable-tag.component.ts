import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'editable-tag',
    template: `
        <nz-tag *ngIf="!inputVisible" class="editable-tag" title="双击进入编辑" [nzColor]="color" nzNoAnimation
                (click)="showInput(true)"
                [style.border-style]="showBorder ? 'solid': 'none'">
            <ng-content></ng-content>
        </nz-tag>
        <input #inputElement
               nz-input
               nzSize="small"
               *ngIf="inputVisible"
               type="text"
               [(ngModel)]="inputValue"
               style="width: 78px;"
               (blur)="handleInputConfirm()"
               (keydown.enter)="handleInputConfirm()"
        />
        <i nz-icon *ngIf="showEditIcon"
           nzType="edit"
           nzTheme="fill"
           style="cursor: pointer;margin-right: 8px;"
           (click)="showInput(false)">
        </i>
    `,
    styles: [`.editable-tag {
        background: rgb(255, 255, 255);
    }`]
})
export class EditableTagComponent implements OnInit {

    constructor() {
    }

    inputVisible = false;
    inputValue = '';
    @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;

    @Output() valueChange = new EventEmitter<string>();
    @Input() color: string;
    @Input() showEditIcon: boolean;
    @Input() showBorder: boolean;
    private doubleClickInfo = {
        date: null,
    };

    ngOnInit(): void {
        if (this.showEditIcon == null) {
            this.showEditIcon = true;
        }
        if (this.showBorder == null) {
            this.showBorder = true;
        }
    }

    showInput(doubleClick: boolean): void {
        if (doubleClick) {
            if (!this.doubleClickInfo.date) {
                this.doubleClickInfo.date = new Date().getTime();
                return
            }
            if (new Date().getTime() - this.doubleClickInfo.date < 200) {
                this.inputVisible = true;
                setTimeout(() => {
                    this.inputElement?.nativeElement.focus();
                }, 10);
            }
            this.doubleClickInfo.date = new Date().getTime();
        } else {
            this.inputVisible = true;
            setTimeout(() => {
                this.inputElement?.nativeElement.focus();
            }, 10);
        }
    }

    handleInputConfirm(): void {
        this.valueChange.emit(this.inputValue)
        this.inputValue = '';
        this.inputVisible = false;
    }

}
