// TODO
// - Style
// - Split in specific js files

// Global vars and state ------------------------------------------------------------------
class Question {
  constructor(category, ask, answer) {
    this.category = category;
    this.ask = ask;
    this.answer = answer;
    this.answerHidden = true;
  }
}

const state = {
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
// ----------------------------------------------------------------------------------------

// DOM Resources --------------------------------------------------------------------------
const allButton = document.getElementById("all-btn");
const changeToNextQuestionButton = document.getElementById("next-question-btn");
const filtersField = document.getElementById("filters-field");
const pageCategoriesField = document.getElementById("page-categories-field");
const psHeaderText = document.getElementById("ps-header");
const questionCategory = document.getElementById("question-category");
const questionAsk = document.getElementById("question-ask-field");
const questionAnswer = document.getElementById("question-answer-field");
const revealCurrentQuestionButton = document.getElementById("reveal-question-btn");
const textTotalQuestionsQuantity = document.getElementById("total-questions-quantity");
const textTotalCategoriesQuantity = document.getElementById("total-categories-quantity");

// ----------------------------------------------------------------------------------------

// Stateless functions (utils) ------------------------------------------------------------
async function getPageCategoriesList(filePath){
  const indexFile = await fetch(filePath);
  const indexFileContent = await indexFile.text();
  const indexFileContentArray = jsyaml.load(indexFileContent).files; //array with .yaml
  const categories = indexFileContentArray.map(str => str.replace(".yaml", ""));
  return categories;
}

async function getQuestionsList(filePath){
  const questionsFile = await fetch(filePath);
  const questionsFileText = await questionsFile.text();
  const questionsFileContent = jsyaml.load(questionsFileText);
  const categories = questionsFileContent.categories;
  
  let questionsList = [];

  categories.forEach(categoryItem => {
    const categoryName = categoryItem.category;

    categoryItem.questions.forEach(questionItem => {
      const questionAsk = questionItem.question;
      const questionAnswer = questionItem.answer;

      questionsList.push(new Question(categoryName, questionAsk, questionAnswer));
    });
  });
  
  return questionsList;
}

function getCaregoriesList(questionsList){
  let categories = new Set();

  questionsList.forEach(questionItem => {
    categories.add(questionItem.category);
  });

  return categories;
}

function getFilteredQuestionsList(questionsList, allowedCategories){
  let filteredQuestionsList = [];

  if (questionsList.length < 1 || allowedCategories.size < 1){
    return []
  }

  questionsList.forEach(questionItem => {
    if (allowedCategories.has(questionItem.category)){
      filteredQuestionsList.push(questionItem);
    }
  })

  return filteredQuestionsList;
}

function getRandomQuestion(questionsList){

  let filteredQuestionsList = [];

  if (questionsList.length < 1){
    return null
  }

  const randomQuestionItem = filteredQuestionsList[Math.floor(Math.random() * filteredQuestionsList.length)];
  return randomQuestionItem;
}
// ----------------------------------------------------------------------------------------

// Functions ----------------------------------------------------------------------
function changeCurrentPageCategory(event){
  const clickedButton = event.currentTarget;
  state.currentPageCategory = clickedButton.value;
  refreshCurrentPageCategory();
}

async function refreshCurrentPageCategory(){
  state.allowedCategories = new Set();
  state.selectAllFlag = false;
  state.questionsList = await getQuestionsList(`../inputs/${state.currentPageCategory}.yaml`);
  state.categoriesList = getCaregoriesList(state.questionsList);

  psHeaderText.innerHTML = "~/" + state.currentPageCategory;

  createCheckBoxFilters();
  refreshAllowedCategoriesList();
  changeToNextQuestion();
}

function refreshCurrentQuestion(){
  if (!state.currentQuestion) {
    questionCategory.innerHTML = "";
    questionAsk.innerHTML = "";
    questionAnswer.innerHTML = "";
    return;
  }

  questionCategory.innerHTML = state.currentQuestion.category;
  questionAsk.innerHTML = state.currentQuestion.ask;

  if (state.currentQuestion.answerHidden) {
    questionAnswer.innerHTML = "hidden";
  } else {
    questionAnswer.innerHTML = state.currentQuestion.answer;
  }
}

function refreshAllowedCategoriesList(){
  let checkBoxList = filtersField.querySelectorAll("input");
  checkBoxList.forEach(checkBoxItem => {
    if (checkBoxItem.checked) {
      state.allowedCategories.add(checkBoxItem.id);
    } else {
      state.allowedCategories.delete(checkBoxItem.id);
    }
  });

  state.filteredQuestionsList = getFilteredQuestionsList(state.questionsList, state.allowedCategories);

  textTotalCategoriesQuantity.innerHTML = state.allowedCategories.size;
  textTotalQuestionsQuantity.innerHTML = state.filteredQuestionsList.length;

  // if (state.allowedCategories.size == 0) {
  //   textTotalQuestionsQuantity.innerHTML = 0;
  // } else {
  //   textTotalQuestionsQuantity.innerHTML = state.questionsList.length;
  // }
}

function selectAllFilters(){
  filtersObjectList = filtersField.querySelectorAll("input");

  filtersObjectList.forEach(filterObjectItem => {
    if(state.selectAllFlag) {
      filterObjectItem.checked = true;
    }
    else {
      filterObjectItem.checked = false;
    }
    filterObjectItem.dispatchEvent(new Event("change"));
  });
  state.selectAllFlag = !state.selectAllFlag;
  changeToNextQuestion();
}

function changeToNextQuestion(){
  state.currentQuestion = getRandomQuestion(state.filteredQuestionsList);
  
  if (state.currentQuestion) {
    if (state.currentQuestion.ask == state.lastQuestion.ask) {
      console.log("repetiu!");
      changeToNextQuestion();
    }

    state.lastQuestion = state.currentQuestion;
  }

  refreshCurrentQuestion();
}

function revealCurrentQuestion(){
  if (state.currentQuestion) {
    state.currentQuestion.answerHidden = false;
    refreshCurrentQuestion();
  }
}

function createPageCategoryButtons(){
  state.pageCategoriesList.forEach(pageCategoryItem => {
    const pageCategoryButton = document.createElement("button");

    pageCategoryButton.textContent = pageCategoryItem;
    pageCategoryButton.id = pageCategoryItem + "-btn";
    pageCategoryButton.value = pageCategoryItem;

    pageCategoryButton.addEventListener("click", (event) => changeCurrentPageCategory(event));

    pageCategoriesField.appendChild(pageCategoryButton);
  });
}

function createCheckBoxFilters(){
  filtersField.innerHTML = "";

  state.categoriesList.forEach(categoryItem => {
    const checkbox = document.createElement("input");
    const label = document.createElement("label");

    const text = document.createTextNode(categoryItem);

    checkbox.type = "checkbox";
    checkbox.id = categoryItem;
    checkbox.checked = "yes";

    label.htmlFor = checkbox.id;
    label.appendChild(text);

    checkbox.addEventListener("change", refreshAllowedCategoriesList);

    filtersField.appendChild(checkbox);
    filtersField.appendChild(label);
  })
}

async function main(){
  // Init
  state.pageCategoriesList = await getPageCategoriesList("../inputs/_index.yaml");
  state.currentPageCategory = state.pageCategoriesList[0];

  createPageCategoryButtons();
  refreshCurrentPageCategory();

  // Listeners
  allButton.addEventListener("click", selectAllFilters);
  changeToNextQuestionButton.addEventListener("click", changeToNextQuestion);
  revealCurrentQuestionButton.addEventListener("click", revealCurrentQuestion);
}
// ----------------------------------------------------------------------------------------

main();
