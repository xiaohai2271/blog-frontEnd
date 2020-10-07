import {AfterViewInit, Attribute, Directive, EventEmitter, Input, Output} from '@angular/core';
import {EditorConfig} from '../../../class/EditorConfig';

declare var editormd: any;
declare var $: any;

@Directive({
    selector: '[appEditorMd]'
})
export class EditorMdDirective implements AfterViewInit {

    @Input() editormdConfig: EditorConfig; // 配置选项
    @Output() editorChange: EventEmitter<string> = new EventEmitter<string>(); // 发射器
    editor: any; // editormd编辑器

    constructor(@Attribute('id') private id: string) {
    }

    ngAfterViewInit(): void {
        this.editor = editormd(this.id, this.editormdConfig); // 创建编辑器

        const out = this.editorChange;
        const textarea = $('#' + this.id + ' :first'); // 获取textarea元素

        // 当编辑器内容改变时，触发textarea的change事件
        // tslint:disable-next-line:only-arrow-functions
        this.editor.on('change', function() {
            out.emit(textarea.val());
        });
    }
}
