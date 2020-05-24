import { Item } from './item';

export class Group {
    constructor(
        private id: string,
        private title: string,
        private left: number,
        private top: number,
        private type?: string,
        private items: Array<Item> = []) { }

    public add(item: Item) {
        this.items.push(item);
    }
}
