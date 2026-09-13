import { Question } from "./models.js";


export const state = {
  currentQuestion: null,
  questionsList: [],
  categoriesList: [],
  allowedCategories: new Set(),
  filteredQuestionsList: [],
  pageCategoriesList: [],
  currentPageCategory: null,
  selectAllFlag: false,
  lastQuestion: new Question()
}
