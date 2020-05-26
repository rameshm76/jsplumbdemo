export class Item {
    constructor(
        public id: string,
        public name: string,
        public group: string,
        public left?: number,
        public top?: number
        ) { }
}
