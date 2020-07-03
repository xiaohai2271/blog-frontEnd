import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'editable-tag',
    template: `
        <nz-tag *ngIf="!inputVisible" title="双击进入编辑" [nzColor]="color" nzNoAnimation
                (click)="showInput(true)"
                [style.border-style]="showBorder ? 'solid': 'none'">
            {{text}}
        </nz-tag>
        <input #inputElement
               nz-input
               nzSize="small"
               *ngIf="inputVisible"
               type="text"
               [(ngModel)]="inputValue"
               (blur)="handleInputConfirm()"
               (keydown.enter)="handleInputConfirm()"
        />
        <i nz-icon *ngIf="showEditIcon"
           nzType="edit"
           nzTheme="fill"
           style="cursor: pointer;margin-right: 8px;"
           (click)="showInput(false)">
        </i>
    `
})
export class EditableTagComponent implements OnInit, OnChanges {

    private static instanceArray: EditableTagComponent[] = []

    constructor() {
        EditableTagComponent.instanceArray.push(this);
    }

    inputVisible = false;
    inputValue = '';
    @ViewChild('inputElement', {static: false}) inputElement?: ElementRef;

    @Output() valueChange = new EventEmitter<{ value: string, originalValue: string, changed: boolean }>();
    @Input() color: string;
    @Input() showEditIcon: boolean;
    @Input() showBorder: boolean;
    @Input() text: string;
    @Input() key: any;

    private tmpKey: any;
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

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.key && !changes.key.isFirstChange()) {
            this.key = changes.key.currentValue;
            this.getFocus(this.tmpKey);
        }
    }

    showInput(doubleClick: boolean): void {
        this.inputValue = this.text;
        if (doubleClick) {
            if (!this.doubleClickInfo.date) {
                this.doubleClickInfo.date = new Date().getTime();
                return
            }
            if (new Date().getTime() - this.doubleClickInfo.date < 200) {
                this.inputVisible = true;
                setTimeout(() => this.inputElement?.nativeElement.focus(), 10);
            }
            this.doubleClickInfo.date = new Date().getTime();
        } else {
            this.inputVisible = true;
            setTimeout(() => this.inputElement?.nativeElement.focus(), 10);
        }
    }

    getFocus(key: any) {
        this.tmpKey = key;
        EditableTagComponent.instanceArray.forEach(tag => {
            if (tag.key === this.tmpKey) {
                tag.showInput(false);
            }
        })
    }


    handleInputConfirm(): void {
        this.valueChange.emit({
            value: this.inputValue,
            originalValue: this.text,
            changed: this.inputValue !== this.text
        })
        this.text = this.inputValue;
        this.inputValue = '';
        this.inputVisible = false;
    }

}
