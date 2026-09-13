import { elements } from "./dom.js";
import { state } from "./state.js";
import { Question } from "./models.js";


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
  if (questionsList.length < 1){
    return null
  }

  const randomQuestionItem = questionsList[Math.floor(Math.random() * questionsList.length)];
  return randomQuestionItem;
}

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

  elements.psHeaderText.innerHTML = "~/" + state.currentPageCategory;

  createCheckBoxFilters();
  refreshAllowedCategoriesList();
  changeToNextQuestion();
}

function refreshCurrentQuestion(){
  if (!state.currentQuestion) {
    elements.questionCategory.innerHTML = "";
    elements.questionAsk.innerHTML = "";
    elements.questionAnswer.innerHTML = "";
    return;
  }

  elements.questionCategory.innerHTML = state.currentQuestion.category;
  elements.questionAsk.innerHTML = state.currentQuestion.ask;

  if (state.currentQuestion.answerHidden) {
    elements.questionAnswer.innerHTML = "hidden";
  } else {
    elements.questionAnswer.innerHTML = state.currentQuestion.answer;
  }
}

function refreshAllowedCategoriesList(){
  let checkBoxList = elements.filtersField.querySelectorAll("input");
  checkBoxList.forEach(checkBoxItem => {
    if (checkBoxItem.checked) {
      state.allowedCategories.add(checkBoxItem.id);
    } else {
      state.allowedCategories.delete(checkBoxItem.id);
    }
  });

  state.filteredQuestionsList = getFilteredQuestionsList(state.questionsList, state.allowedCategories);

  elements.textTotalCategoriesQuantity.innerHTML = state.allowedCategories.size;
  elements.textTotalQuestionsQuantity.innerHTML = state.filteredQuestionsList.length;
}

function selectAllFilters(){
  elements.filtersObjectList = elements.filtersField.querySelectorAll("input");

  elements.filtersObjectList.forEach(filterObjectItem => {
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

    elements.pageCategoriesField.appendChild(pageCategoryButton);
  });
}

function createCheckBoxFilters(){
  elements.filtersField.innerHTML = "";

  state.categoriesList.forEach(categoryItem => {
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const container = document.createElement("span");

    const text = document.createTextNode(categoryItem);

    container.className = "category-filter-container"

    checkbox.type = "checkbox";
    checkbox.id = categoryItem;
    checkbox.className = "category-filter";
    checkbox.checked = "yes";

    label.htmlFor = checkbox.id;
    label.className = "category-filter-label"
    label.appendChild(text);

    checkbox.addEventListener("change", refreshAllowedCategoriesList);

    container.appendChild(checkbox);
    container.appendChild(label);

    elements.filtersField.appendChild(container);
  })
}

async function main(){
  state.pageCategoriesList = await getPageCategoriesList("../inputs/_index.yaml");
  state.currentPageCategory = state.pageCategoriesList[0];

  createPageCategoryButtons();
  refreshCurrentPageCategory();

  // Listeners
  elements.allButton.addEventListener("click", selectAllFilters);
  elements.changeToNextQuestionButton.addEventListener("click", changeToNextQuestion);
  elements.revealCurrentQuestionButton.addEventListener("click", revealCurrentQuestion);
}

main();
