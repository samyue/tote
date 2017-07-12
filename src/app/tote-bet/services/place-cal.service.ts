import { Injectable } from '@angular/core';
import { CalculatorInterface } from './calculator.interface';
import { GameResult } from '../models/game-result.model';
import { Bet } from '../models/bet.model';
import { Dividend } from '../models/dividend.model';
import { ProductType } from '../models/product-type.const';
@Injectable()
export class PlaceCalService implements CalculatorInterface{

    readonly COMMISSION: number = 0.12;

    calculateDividends(bets: Bet[], result: GameResult): Dividend[] {

        let placeBets: Bet[] = bets.filter((bet:Bet)=>bet.product == ProductType.P);

        if (placeBets.length == 0) {
            return [];
        }

        let totalStake = placeBets.reduce((sum: number, bet: Bet)=>sum + bet.stake, 0);


        let firstPlaceDiv = this.calPlaceDividend(placeBets, totalStake, result.first);
        let secondPlaceDiv = this.calPlaceDividend(placeBets, totalStake, result.second);
        let thirdPlaceDiv = this.calPlaceDividend(placeBets, totalStake, result.third);

        let placeDividends: Dividend[] = [
            firstPlaceDiv,
            secondPlaceDiv,
            thirdPlaceDiv
        ];

        return placeDividends;
    }

    private calPlaceDividend(placeBets: Bet[], totalStake: number, runnerNumber): Dividend {
        let totalRelatedPunterStake: number = this.getPunterStake(placeBets, runnerNumber);

        let div = totalStake * (1 - this.COMMISSION) / (3 * totalRelatedPunterStake);

        let dividend: Dividend = new Dividend(ProductType.P, [runnerNumber], div);
        return dividend;
    }



    private getPunterStake(placeBets: Bet[], runnerNumber: number): number {
        let total = placeBets.reduce((total: number, bet:Bet)=>{

            if (this.isSelectionCorrect(bet, runnerNumber)) {
                return total + bet.stake;
            } else {
                return total;
            }

        }, 0);

        return total;
    }

    private isSelectionCorrect(placeBets: Bet, runnerNumber: number): boolean {

        let isCorrect:boolean = false;

        if (placeBets.selections[0] == runnerNumber) {
            isCorrect = true;
        }

        return isCorrect;
    }





}