import {TemplateRef} from '@angular/core';

export class Data<T> {
    title: string;
    fieldValue: string;
    show: boolean = true;
    primaryKey?: boolean = false;
    isActionColumns?: boolean = false;
    template?: {
        template: TemplateRef<any>,
        keymap?: {
            [value: string]: string
        }
    };
    action ?: {
        name: string,
        color?: string,
        order?: number,
        fontSize?: string,
        needConfirm?: boolean,
        click: (data: T) => void,
        hover?: (data: T) => void | null;
    }[] = []
}
