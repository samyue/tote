export class Dividend {
    product: string;
    winningSelections: number[];
    dividend: number; //dividend in cent unit
    constructor(product: string, winningSelections: number[], dividend: number ){
        this.product = product;
        this.winningSelections = winningSelections;
        this.dividend = dividend;

    };
}