import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { DividendService } from '../services/dividend.service';
import { Bet } from '../models/bet.model';
import { GameResult } from '../models/game-result.model';
import { Dividend } from '../models/dividend.model';
import { toteInputValidator } from '../validators/tote-input.validator';

@Component({
  selector: 'app-bet-panel',
  templateUrl: './bet-panel.component.html',
  styleUrls: ['./bet-panel.component.scss']
})
export class BetPanelComponent implements OnInit {

  inputData: FormControl;
  form: FormGroup;

  dividends: Dividend[] = [];

  exampleData: string = 'Bet:W:1:3\nBet:W:2:4\nBet:W:3:5\nBet:W:4:5\nBet:W:1:16\nBet:W:2:8\nBet:W:3:22\nBet:W:4:57\nBet:W:1:42\nBet:W:2:98\nBet:W:3:63\nBet:W:4:15\nBet:P:1:31\nBet:P:2:89\nBet:P:3:28\nBet:P:4:72\nBet:P:1:40\nBet:P:2:16\nBet:P:3:82\nBet:P:4:52\nBet:P:1:18\nBet:P:2:74\nBet:P:3:39\nBet:P:4:105\nBet:E:1,2:13\nBet:E:2,3:98\nBet:E:1,3:82\nBet:E:3,2:27\nBet:E:1,2:5\nBet:E:2,3:61\nBet:E:1,3:28\nBet:E:3,2:25\nBet:E:1,2:81\nBet:E:2,3:47\nBet:E:1,3:93\nBet:E:3,2:51\nResult:2:3:1';

  constructor(private fb: FormBuilder, private dividendService: DividendService) { }

  ngOnInit() {
    this.inputData = new FormControl('', [Validators.required, toteInputValidator()]);
    this.form = this.fb.group({
      'inputData': this.inputData,

    });

  }


  loadExampleData() {
    this.inputData.setValue(this.exampleData);
    this.dividends = [];
  }

  clear() {
    this.form.reset();
    this.dividends = [];
  }

  submit() {
      let bets: Bet[] = this.parseBetsInput();
      let result: GameResult = this.parseResultInput();

      this.dividends = this.dividendService.calculate(bets, result);
  }

  
  parseBetsInput() {

    let reg = /Bet:[W|P|E]:\d+(,\d+)?:\d+/g;
    let value = this.inputData.value;
    
    let found = value.match(reg);

    let bets: Bet[] = found.reduce((betArray, item)=>{

      let bet: Bet = this.proceseBetItem(item);
      return [...betArray, bet];
      
    }, [])
    return bets;

  }

  parseResultInput(): GameResult {
    let reg = /(Result:\d+:\d+:\d+){1}/g;
    let value = this.inputData.value;

    let found = value.match(reg);

    let res = found[0].split(':');
    let first: number = parseInt(res[1]);
    let second: number = parseInt(res[2]);
    let third: number = parseInt(res[3]);

    return new GameResult(first, second, third);

  }

  proceseBetItem(item: string) {
    let res = item.split(':');
    let product: string = res[1];
    let selections: number[] = res[2].split(',').map(item=>parseInt(item, 10));
    let stake: number = parseInt(res[3]);
    return new Bet(product, selections, stake);
  }

}
