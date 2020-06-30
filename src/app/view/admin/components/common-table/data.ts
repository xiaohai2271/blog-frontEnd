export class Data<T> {
    fieldName: string;
    fieldValue: string;
    show: boolean = true;
    primaryKey?: boolean = false;
    isActionColumns?: boolean = false;
    action?: {
        name: string,
        color?: string,
        order?: number,
        fontSize?: string,
        click: (data: T) => void,
        hover?: (data: T) => void | null;
    }[] = []
}
