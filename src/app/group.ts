import { Item } from './item';

export class Group {
    constructor(
        public id: string,
        public title: string,
        public left: number,
        public top: number,
        public type?: string,
        public items: Array<Item> = []) { }

    public add(item: Item) {
        this.items.push(item);
    }
}
