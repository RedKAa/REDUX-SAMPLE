const { createStore } = window.Redux;

// setup REDUX store: state, reducer, store

const initialState = JSON.parse(localStorage.getItem('hobbies')) || [];

const hobbiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_HOBBY": {
      const newState = [...state];
      newState.push(action.payload);
      return newState;
    }
    default:
      return state;
  }
};

const store = createStore(hobbiesReducer);
// end setup REDUX store

// -------------------------------------------

// RENDER Hobbies List

const renderHobbies = (hobbies) => {
  if (!Array.isArray(hobbies) || hobbies.length == 0) return;

  const ulElement = document.querySelector("#hobbyList");
  if (!ulElement) return;

  // reset list hobbies
  ulElement.innerHTML = "";

  for (const hobby of hobbies) {
    const liElement = document.createElement("li");
    liElement.textContent = hobby;
    ulElement.appendChild(liElement);
  }
};

// RENDER initialState List
const initialHobbies = store.getState();
renderHobbies(initialHobbies);

// Handle form submit
const formElement = document.querySelector("#addNewHobbyForm");
if (formElement) {
  const handleSubmit = (e) => {
    //prevent browser from reloading
    e.preventDefault();

    const inputElement = formElement.querySelector("#input");
    if (!inputElement) return;

    const action = {
      type: "ADD_HOBBY",
      payload: inputElement.value,
    };

    store.dispatch(action);
    formElement.reset();
  };
  formElement.addEventListener('submit', handleSubmit);
}

// Handle when the state changes
store.subscribe(() => {
  const hobbies = store.getState();
  renderHobbies(hobbies);
  localStorage.setItem('hobbies', JSON.stringify(hobbies));
});
