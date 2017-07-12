import { Injectable } from '@angular/core';
import { CalculatorInterface } from './calculator.interface';
import { GameResult } from '../models/game-result.model';
import { Bet } from '../models/bet.model';
import { Dividend } from '../models/dividend.model';
import { ProductType } from '../models/product-type.const';
@Injectable()
export class WinCalService implements CalculatorInterface{

    readonly COMMISSION: number = 0.15;

    calculateDividends(bets: Bet[], result: GameResult): Dividend[] {

        let winBets: Bet[] = bets.filter((bet:Bet)=>bet.product == ProductType.W);

        if (winBets.length == 0) {
            return [];
        }


        let totalStake = winBets.reduce((sum: number, bet: Bet)=>sum + bet.stake, 0);

        let totalWinningPunterStake = winBets.reduce((total: number, bet:Bet)=>{

            if (this.isSelectionCorrect(bet, result)) {
                return total + bet.stake;
            } else {
                return total;
            }

        }, 0);
        

        let div = totalStake * (1 - this.COMMISSION) / totalWinningPunterStake;

        let dividend = new Dividend(ProductType.W, [result.first], div);

        return [dividend];
    }

    private isSelectionCorrect(bet:Bet, result: GameResult) {

        let isCorrect:boolean = false;

        if (bet.selections[0] == result.first) {
            isCorrect = true;
        }

        return isCorrect;
    }




}