import { ToteDividendPipe } from './tote-dividend.pipe';
import { ExactaCalService } from '../../tote-bet/services/exacta-cal.service';
import { TestBed, inject } from '@angular/core/testing';
import { CurrencyPipe } from '@angular/common';
import { Dividend } from '../../tote-bet/models/dividend.model';
import { ProductType } from '../../tote-bet/models/product-type.const';
describe('ToteDividendPipe', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [CurrencyPipe, ToteDividendPipe]
        });
    });

    it('transforms win dividend', inject([ToteDividendPipe], (pipe: ToteDividendPipe) => {
        let divdend = new Dividend(ProductType.W, [2], 5 );
        expect(pipe.transform(divdend)).toBe('Win:2:$5.00');
    }));

    it('transforms place dividend', inject([ToteDividendPipe], (pipe: ToteDividendPipe) => {
        let divdend = new Dividend(ProductType.P, [2], 5 );
        expect(pipe.transform(divdend)).toBe('Place:2:$5.00');
    }));

    it('transforms place dividend', inject([ToteDividendPipe], (pipe: ToteDividendPipe) => {
        let divdend = new Dividend(ProductType.E, [2, 3], 5 );
        expect(pipe.transform(divdend)).toBe('Exacta:2,3:$5.00');
    }));



});