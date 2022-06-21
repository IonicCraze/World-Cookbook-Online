const loginFormHandler = async (e) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    e.preventDefault();
    const myForm = document.querySelector('form');
    let formArray = [];
    for (const element of myForm.elements) {
        formArray.push(element.value);
        }   
  
    let ingredientArray = [];
    for (i = 0; i < formArray.length; i++) {
        
        if (i > 1 && i < formArray.length-2){
            ingredientArray.push(formArray[i])
        }
    }
    
    const name = formArray[0];
    const meal = formArray[formArray.length - 2]
    const ingredients = ingredientArray.join(',');

    nextStep(name, meal, ingredients);
    remove();
};

const nextStepBtn = document.getElementById('nextStepBtn');
const addBtn = document.getElementById('addIngredientBtn');

const addIngredient = (e) => {
   e.preventDefault();
var newLi = document.createElement('li')
var newInput = document.createElement('input')
var ingredientList = document.getElementById('list');

ingredientList.appendChild(newLi);
newLi.appendChild(newInput);
newLi.classList.add('listItem')
newInput.setAttribute('type', 'text');
newInput.classList.add('ingredient')
}

const nextStep = (name, meal, ingredients) =>{
    let newForm = document.createElement('form');
    let newInput = document.createElement('input');
    let newH3 = document.createElement('h3');
    let newUl = document.createElement('ul');
    let newLi = document.createElement('li');
    let newAddBtn = document.createElement('button');
    let submitBtn = document.createElement('button');

    document.getElementById('postDiv').appendChild(newForm);
    newForm.appendChild(newH3);
    newH3.textContent = 'Please Enter Step by Step Instructions';
    newForm.appendChild(newAddBtn);
    newAddBtn.setAttribute('id', 'addStepBtn');
    newAddBtn.textContent = 'Add Step';
    newForm.appendChild(newUl);
    newUl.setAttribute('id', 'stepList');
    newUl.appendChild(newLi);
    newLi.appendChild(newInput);
    newInput.setAttribute('type', 'text');
    newForm.appendChild(submitBtn);
    submitBtn.textContent = 'Submit Recipe';
    submitBtn.setAttribute('type', 'submit')
    newInput.classList.add('ingredient');
    const addStepBtn = document.getElementById('addStepBtn');
    addStepBtn.addEventListener('click', addStep);
    
    const collectSteps = async (e) => {
        e.preventDefault();
        const stepForm = document.querySelector('form');
        let stepsFormArray = [];
        for (const element of stepForm.elements) {
            stepsFormArray.push(element.value);            
        } 
      
        let stepsArray = [];
        for (i = 0; i < stepsFormArray.length; i++) {
            if (i > 0 && i < stepsFormArray.length-1){
                stepsArray.push(stepsFormArray[i])
            }
        }
        const steps = stepsArray.join(',');
        console.log(steps);
        console.log(name);
        console.log(meal);
        console.log(ingredients);

        if (name && ingredients && steps && meal) {
        
            const response = await fetch('/api/posts/newpost', {
                method: 'POST',
                body: JSON.stringify({ name, ingredients, steps, meal }),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.ok) {
                document.location.replace('/')
            } else {
                alert('Failed to Post')
            }
        }
    }

    submitBtn.addEventListener('click', collectSteps)
};

const remove = () => {
    document.getElementById('myForm').remove();
}

const addStep = (e) => {
    e.preventDefault();
    let newLi = document.createElement('li');
    let newInput = document.createElement('input');
    let stepList = document.getElementById('stepList');

    stepList.appendChild(newLi);
    newLi.appendChild(newInput);
    newLi.classList.add('listItem');
    newInput.setAttribute('type', 'text');
    newInput.classList.add('ingredient')
}

addBtn.addEventListener('click', addIngredient);
nextStepBtn.addEventListener('click', loginFormHandler);


