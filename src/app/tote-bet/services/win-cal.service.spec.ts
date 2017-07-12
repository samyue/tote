import { TestBed, inject } from '@angular/core/testing';
import { WinCalService } from './win-cal.service';
import { Bet } from '../models/bet.model';
import { GameResult } from '../models/game-result.model';
import { Dividend } from '../models/dividend.model';
import { ProductType } from '../models/product-type.const';

describe('WinCalService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [WinCalService]
        });
    });

    it('should be able to inject the service', inject([WinCalService], (service: WinCalService) => {
        expect(service).toBeTruthy();
    }));

    it('should calculate correct Win dividend array', inject([WinCalService], (service: WinCalService) => {
        let bets: Bet[] = [
            {
                product: 'W',
                selections: [1],
                stake: 5
            },
            {
                product: 'W',
                selections: [2],
                stake: 5
            },
            {
                product: 'W',
                selections: [3],
                stake: 5
            },
            {
                product: 'W',
                selections: [4],
                stake: 5
            }
        ];

        let result: GameResult = {
            first: 2,
            second: 3,
            third: 1
        }

        let dividends: Dividend[] = service.calculateDividends(bets, result);
        expect(dividends[0]).toBeDefined();
        expect(dividends[0].product).toEqual(ProductType.W);
        expect(dividends[0].winningSelections.length).toEqual(1);
        expect(dividends[0].winningSelections[0]).toEqual(2);
        expect(dividends[0].dividend).toEqual(3.4);

    }));

    it('should return empty dividend array when no win bet is placed', inject([WinCalService], (service: WinCalService) => {
        let bets: Bet[] = [
            {
                product: 'P',
                selections: [1],
                stake: 5
            },
            {
                product: 'E',
                selections: [2, 3],
                stake: 5
            }
        ];

        let result: GameResult = {
            first: 2,
            second: 3,
            third: 1
        }

        let dividends: Dividend[] = service.calculateDividends(bets, result);
        expect(dividends.length).toEqual(0);

    }));
});
