import { Injectable } from '@angular/core';
import { Bet } from '../models/bet.model';
import { GameResult } from '../models/game-result.model';
import { CalculatorInterface } from './calculator.interface';
import { WinCalService } from './win-cal.service';
import { Dividend } from '../models/dividend.model';
import { PlaceCalService } from './place-cal.service';
import { ExactaCalService } from './exacta-cal.service';

@Injectable()
export class DividendService{
    calculators: CalculatorInterface[];
    constructor(private winCal: WinCalService, private placeCal: PlaceCalService, private exactaCal: ExactaCalService){
        //Register the calculators that are required for dividend calucation
        this.calculators = [
            winCal,
            placeCal,
            exactaCal,
        ];
    }

    calculate(bets: Bet[], result: GameResult): Dividend[]{
        let allDividends: Dividend[] = this.calculators.reduce((allDividends: Dividend[], cal:CalculatorInterface)=>{
            let dividends: Dividend[] = cal.calculateDividends(bets, result);
            return allDividends.concat(dividends);
        }, [])
        return allDividends;
    }
}