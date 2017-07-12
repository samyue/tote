import { TestBed, inject } from '@angular/core/testing';
import { Bet } from '../models/bet.model';
import { GameResult } from '../models/game-result.model';
import { Dividend } from '../models/dividend.model';
import { ProductType } from '../models/product-type.const';
import { ExactaCalService } from './exacta-cal.service';

describe('ExactaCalService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [ExactaCalService]
        });
    });

    it('should be able to inject the service', inject([ExactaCalService], (service: ExactaCalService) => {
        expect(service).toBeTruthy();
    }));

    it('should calculate correct Win dividend array', inject([ExactaCalService], (service: ExactaCalService) => {
        let bets: Bet[] = [
            {
                product: 'E',
                selections: [1, 2],
                stake: 5
            },
            {
                product: 'E',
                selections: [2, 3],
                stake: 5
            },
            {
                product: 'E',
                selections: [1, 3],
                stake: 5
            },
            {
                product: 'E',
                selections: [4, 1],
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
        expect(dividends[0].product).toEqual(ProductType.E);
        expect(dividends[0].winningSelections.length).toEqual(2);
        expect(dividends[0].winningSelections[0]).toEqual(2);
        expect(dividends[0].winningSelections[1]).toEqual(3);
        expect(dividends[0].dividend).toBeGreaterThan(3.2);
        expect(dividends[0].dividend).toBeLessThan(3.3);

    }));

    it('should return empty dividend array when no exacta bet is placed', inject([ExactaCalService], (service: ExactaCalService) => {
        let bets: Bet[] = [
            {
                product: 'P',
                selections: [1],
                stake: 5
            },
            {
                product: 'W',
                selections: [2],
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
