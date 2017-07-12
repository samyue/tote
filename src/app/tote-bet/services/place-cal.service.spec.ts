import { TestBed, inject } from '@angular/core/testing';
import { Bet } from '../models/bet.model';
import { GameResult } from '../models/game-result.model';
import { Dividend } from '../models/dividend.model';
import { ProductType } from '../models/product-type.const';
import { PlaceCalService } from './place-cal.service';

describe('PlaceCalService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [PlaceCalService]
        });
    });

    it('should be able to inject the service', inject([PlaceCalService], (service: PlaceCalService) => {
        expect(service).toBeTruthy();
    }));

    it('should calculate correct Place dividend array', inject([PlaceCalService], (service: PlaceCalService) => {
        let bets: Bet[] = [
            {
                product: 'P',
                selections: [1],
                stake: 5
            },
            {
                product: 'P',
                selections: [2],
                stake: 15
            },
            {
                product: 'P',
                selections: [3],
                stake: 5
            },
            {
                product: 'P',
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
        expect(dividends[0].product).toEqual(ProductType.P);
        expect(dividends[0].winningSelections.length).toEqual(1);
        expect(dividends[0].winningSelections[0]).toEqual(2);
        expect(dividends[0].dividend).toBeGreaterThan(0.58)

        expect(dividends[1]).toBeDefined();
        expect(dividends[1].product).toEqual(ProductType.P);
        expect(dividends[1].winningSelections.length).toEqual(1);
        expect(dividends[1].winningSelections[0]).toEqual(3);
        expect(dividends[1].dividend).toEqual(1.76);

        expect(dividends[2]).toBeDefined();
        expect(dividends[2].product).toEqual(ProductType.P);
        expect(dividends[2].winningSelections.length).toEqual(1);
        expect(dividends[2].winningSelections[0]).toEqual(1);
        expect(dividends[2].dividend).toEqual(1.76);

    }));

    it('should return empty dividend array when no place bet is placed', inject([PlaceCalService], (service: PlaceCalService) => {
        let bets: Bet[] = [
            {
                product: 'W',
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
