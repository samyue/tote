import { Injectable } from '@angular/core';
import { CalculatorInterface } from './calculator.interface';
import { GameResult } from '../models/game-result.model';
import { Bet } from '../models/bet.model';
import { Dividend } from '../models/dividend.model';
import { ProductType } from '../models/product-type.const';
@Injectable()
export class ExactaCalService implements CalculatorInterface{

    readonly COMMISSION: number = 0.18;

    calculateDividends(bets: Bet[], result: GameResult): Dividend[] {

        let exactaBets: Bet[] = bets.filter((bet:Bet)=>bet.product == ProductType.E);

        if (exactaBets.length == 0) {
            return [];
        }

        let totalStake = exactaBets.reduce((sum: number, bet: Bet)=>sum + bet.stake, 0);

        let totalRelatedPunterStake = exactaBets.reduce((total: number, bet:Bet)=>{

            if (this.isSelectionCorrect(bet, result)) {
                return total + bet.stake;
            } else {
                return total;
            }

        }, 0);

        let div = totalStake * (1 - this.COMMISSION) / totalRelatedPunterStake;

        let dividend = new Dividend(ProductType.E, [result.first, result.second], div);

        return [dividend];
    }

    private isSelectionCorrect(bet:Bet, result: GameResult) {

        let isCorrect:boolean = false;

        if (bet.selections[0] == result.first && bet.selections[1] == result.second) {
            isCorrect = true;
        }

        return isCorrect;
    }




}