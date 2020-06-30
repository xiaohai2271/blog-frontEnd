export class Data<T> {
    fieldName: string;
    fieldValue: string;
    show: boolean;
    bindData?: T;
    isActionColumns: boolean;
    action: {
        name: string,
        color: string,
        order: number,
        fontSize: string,
        click: (data: T) => void,
        hover: (data: T) => void;
    }[]
}
