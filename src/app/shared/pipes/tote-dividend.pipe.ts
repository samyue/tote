import { Pipe, PipeTransform } from '@angular/core';
import { Dividend } from '../../tote-bet/models/dividend.model';
import { ProductType } from '../../tote-bet/models/product-type.const';
import { CurrencyPipe } from '@angular/common';

@Pipe({
    name: 'toteDividend',
})
export class ToteDividendPipe implements PipeTransform {
    constructor(private currencyPipe: CurrencyPipe){}
    readonly productMap = {
        W: 'Win',
        P: 'Place',
        E: 'Exacta'
    }
    transform(value: Dividend): string {
        if (!value) {
            return '';
        }

        let productDisplayName: string = this.productMap[value.product];
        let winningSelections: string;
        if (value.product == ProductType.W || value.product == ProductType.P ) {
            winningSelections = `${value.winningSelections[0]}`;
        } else if (value.product == ProductType.E) {
            winningSelections = `${value.winningSelections[0]},${value.winningSelections[1]}`;
        }

        let dividend: string = this.currencyPipe.transform(value.dividend, 'USD', true);


        return `${productDisplayName}:${winningSelections}:${dividend}`;
    }

}
