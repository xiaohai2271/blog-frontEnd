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
import {NzModalRef, NzModalService} from 'ng-zorro-antd';

@Component({
    selector: 'editable-tag',
    template: `
        <nz-tag *ngIf="!inputVisible" title="双击进入编辑" [nzColor]="color" nzNoAnimation
                (click)="showInput(this.doubleClick)"
                [style.border-style]="showBorder ? 'solid': 'none'">
            {{text}}
            <ng-content></ng-content>
        </nz-tag>
        <input #inputElement
               nz-input
               [nzSize]="size"
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

    constructor(private modal: NzModalService) {
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
    @Input() showConfirmModal: boolean;
    @Input() doubleClick: boolean;
    @Input() autoClear: boolean;
    @Input() size: 'small' | 'default' | 'large';
    @Output() modalOK = new EventEmitter<{ value: string, originalValue: string, changed: boolean }>();
    @Output() modalCancel = new EventEmitter<{ value: string, originalValue: string, changed: boolean }>();

    private tmpKey: any;
    private doubleClickInfo = {
        date: null,
    };
    confirmModal?: NzModalRef;

    ngOnInit(): void {
        if (this.showEditIcon == null) {
            this.showEditIcon = true;
        }
        if (this.showBorder == null) {
            this.showBorder = true;
        }
        if (this.doubleClick == null) {
            this.doubleClick = true;
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
        if (this.doubleClick && doubleClick) {
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
        const value = {
            value: this.inputValue,
            originalValue: this.text,
            changed: this.inputValue !== this.text
        }
        this.valueChange.emit(value)
        this.text = this.inputValue;
        this.inputValue = '';
        this.inputVisible = false;
        if (this.showConfirmModal && value.changed && this.text != null) {
            this.confirmModal = this.modal.confirm({
                nzTitle: '数据变更',
                nzContent: '是否提交修改，点击确定提交修改，点击取消则恢复原数据',
                nzOnOk: () => this.modalOK.emit(value),
                nzOnCancel: () => this.modalCancel.emit(value)
            });
        }
        if (this.autoClear) {
            this.text = null
        }
    }

}
