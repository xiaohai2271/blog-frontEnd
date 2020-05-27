import {Article} from './Article';

export class Category {
    id: number;
    name: string;
    articles?: Article[];
}


export class Tag {
    id: number;
    name: string;
    articles?: Article[];
}
