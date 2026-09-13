export class Question {
  constructor(category, ask, answer) {
    this.category = category;
    this.ask = ask;
    this.answer = answer;
    this.answerHidden = true;
  }
}
