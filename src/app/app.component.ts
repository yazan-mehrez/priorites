import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

const myItems = require('./italian-cusine.json');

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('itemAnimation', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [animate(500)]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  showWinnerCard = false;
  winner: string;

  items: Item[] = myItems;

  currentQuestion = 1;
  totalQuestions = this.items.length - 1;

  currentIndex = 0;
  chosenItems: string[] = [];

  item1: Item;
  item2: Item;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      list: this.formBuilder.array([this.createItem()])
    });
  }

  ngOnInit() {
    this.showItems();
  }

  get lists(): FormArray {
    return this.form.get('list') as FormArray;
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      itemName: ''
    });
  }

  addItem() {
    this.lists.push(this.createItem());
  }

  removeItem(index: number) {
    this.lists.removeAt(index);
  }

  showItems() {
    this.item1 = this.items[this.currentIndex];
    this.item2 = this.items[this.currentIndex + 1];
  }

  chooseItem(chosenItem: string) {
    const unchosenItem =
      this.item1.name === chosenItem ? this.item2 : this.item1;

    this.currentQuestion++;

    this.items.splice(this.items.indexOf(unchosenItem), 1);

    if (this.items.length > 1) {
      this.showItems();
    } else {
      this.showWinner();
    }
  }

  showWinner() {
    this.winner = this.items[0].name;
    this.showWinnerCard = true;
  }
}

interface Item {
  name: string;
  image: string;
}
