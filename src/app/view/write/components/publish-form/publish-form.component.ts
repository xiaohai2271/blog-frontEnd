import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../../../class/Tag';
import {COLOR_LIST} from '../../../../utils/color';

@Component({
    selector: 'c-publish-form',
    templateUrl: './publish-form.component.html',
    styleUrls: ['./publish-form.component.less']
})
export class PublishFormComponent implements OnInit {

    @ViewChild('inputElement', {static: true}) tagInputElement: ElementRef;
    @Input() tagNacList: { name: string; size: number }[];
    @Input() categoryList: Category[];
    @Input() primaryData: { id: number; type: boolean; tags: string[]; category: string; url?: string };
    @Output() submitEvent = new EventEmitter<{
        id: number;
        type: boolean;
        tags: string[];
        category: string;
        isUpdate: boolean;
        url?: string;
    }>();
    formGroup: FormGroup;
    tagTmpList: string[] = [];
    tagInputVisible: boolean = false;
    tagListTouched: boolean = false;
    editTagText: string = '新增';
    color: string[] = [];

    constructor(private fb: FormBuilder) {
    }

    randomColor = () => this.color = COLOR_LIST.map(c => c.bgColor).sort(() => Math.floor(Math.random() * 2));

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            isUpdate: [false, Validators.required],
            type: [true, Validators.required],
            tagList: [null, Validators.required],
            tags: [null],
            category: [null, Validators.required],
            url: [null]
        });
        if (this.primaryData) {
            this.formGroup.get('type').setValue(this.primaryData.type);
            const tags = this.primaryData.tags;
            this.formGroup.get('tagList').setValue(tags);
            this.tagTmpList = tags;
            this.formGroup.get('category').setValue(this.primaryData.category);
            this.formGroup.get('url').setValue(this.primaryData.url);
        }
        this.randomColor();
    }

    publishArticle() {
        // console.log(this.formGroup.value)
        const formData = {
            id: this.formGroup.value.isUpdate ? this.primaryData?.id : null,
            type: this.formGroup.value.type,
            tags: this.formGroup.value.tagList,
            category: this.formGroup.value.category,
            url: this.formGroup.value.type ? null : this.formGroup.value.url,
            isUpdate: this.formGroup.value.isUpdate
        };
        this.submitEvent.emit(formData);
    }

    // 点击New Tag  显示输入框
    showTagInput() {
        this.tagInputVisible = true;
        setTimeout(() => {

            this.tagInputElement.nativeElement.focus();
        }, 10);
    }

    // 点击标签右侧的x
    handleClose(t: string) {
        this.tagTmpList = this.tagTmpList.filter(tag => tag !== t);
        this.formGroup.get('tagList').setValue(this.tagTmpList);
    }

    // 输入框输入完成
    handleTagInputConfirm($event: { value: string; originalValue: string; changed: boolean }) {
        this.tagListTouched = true;
        // const tmpTag = this.formGroup.get('tags').value;
        const tmpTag = $event.value;
        if (tmpTag && this.tagTmpList.indexOf(tmpTag) === -1) {
            this.tagTmpList = [...this.tagTmpList, tmpTag];
        }
        this.formGroup.get('tags').setValue('');
        this.formGroup.get('tagList').setValue(this.tagTmpList.length ? this.tagTmpList : null);
        this.formGroup.get('tagList').updateValueAndValidity();
        this.tagInputVisible = false;
        this.editTagText = '新增';
    }

    // 点击tag切换
    tagChange($event: boolean, name: string) {
        this.tagListTouched = true;
        if (this.tagTmpList?.indexOf(name) > -1) {
            this.tagTmpList = this.tagTmpList.filter(v => v !== name);
        } else {
            this.tagTmpList.push(name);
        }
        this.formGroup.get('tagList').setValue(this.tagTmpList.length ? this.tagTmpList : null);
        this.formGroup.get('tagList').updateValueAndValidity();
    }

    // 清除url内容
    clearInput() {
        this.formGroup.get('url').setValue('');
    }

    // 点选了文章类型

    articleTypeChanged() {
        this.formGroup.get(`url`).clearValidators();
        const type = this.formGroup.get(`type`).value;
        this.formGroup.get(`url`).setValidators(type ? null : [
                Validators.required,
                Validators.pattern('^(https:\/\/|http:\/\/|)([\\w-]+\\.)+[\\w-]+(\\/[\\w-./?%&=]*)?$')
            ]
        );
        this.formGroup.get(`url`).updateValueAndValidity();
    }
}
