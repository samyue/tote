import { GameResult } from '../models/game-result.model';
import { Bet } from '../models/bet.model';
import { Dividend } from '../models/dividend.model';
export interface CalculatorInterface {
    calculateDividends(bets: Bet[], result: GameResult): Dividend[];
}