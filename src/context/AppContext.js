import React, { createContext, useReducer } from 'react';/*This code imports the necessary modules from the 'react' library.
It imports createContext and useReducer, which are used to create a
context and manage state with a reducer, respectively. */

// 5. The reducer - this is used to update the state, based on the action

/*This is a reducer function named AppReducer. A reducer is a pure 
function that takes the current state and an action as parameters and
 returns a new state based on the action type. In this reducer, 
 various action types like 'ADD_EXPENSE', 'RED_EXPENSE', 
 'DELETE_EXPENSE', and 'CHG_CURRENCY' are handled to update the
  application's state.*/
export const AppReducer = (state, action) => {
        /*This line exports a function named AppReducer. In Redux, a 
    reducer is a pure JavaScript function that takes two arguments:
     state and action. The state argument represents the current 
     state of your application, and the action argument is an 
     object that describes what kind of state change should occur.*/
    let budget = 0;

        /*This line begins a switch statement based on the type property 
    of the action object. In Redux, actions are plain JavaScript 
    objects that contain a type property, which describes the action
     to be taken.*/
    switch (action.type) {
        case 'ADD_EXPENSE': //ADD_EXPENSE is property type of Action
            let total_budget = 0; //inializes budget to 0
            total_budget = state.expenses.reduce(
                (previousExp, currentExp) => {
                    return previousExp + currentExp.cost
                },0
            );
            total_budget = total_budget + action.payload.cost;
            action.type = "DONE";
            if(total_budget <= state.budget) {
                total_budget = 0;
                state.expenses.map((currentExp)=> {
                    if(currentExp.name === action.payload.name) {
                        currentExp.cost = action.payload.cost + currentExp.cost;
                    }
                    return currentExp
                });
                return {
                    ...state,  //The return statement returns a new state object using the spread operator (...state) to copy the existing state properties. This is also a common pattern in Redux reducer functions. It ensures that you maintain immutability by creating a new state object with the updated values.
                };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return {
                    ...state
                }
            }
            case 'RED_EXPENSE':
                const red_expenses = state.expenses.map((currentExp)=> {
                    if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                        currentExp.cost =  currentExp.cost - action.payload.cost;
                        budget = state.budget + action.payload.cost
                    }
                    return currentExp
                })
                action.type = "DONE";
                return {
                    ...state,
                    expenses: [...red_expenses],
                };
            case 'DELETE_EXPENSE':
            action.type = "DONE";
            state.expenses.map((currentExp)=> {
                if (currentExp.name === action.payload) {
                    budget = state.budget + currentExp.cost
                    currentExp.cost =  0;
                }
                return currentExp
            })
            action.type = "DONE";
            return {
                ...state,
                budget
            };
        case 'SET_BUDGET':
            action.type = "DONE";
            state.budget = action.payload;

            return {
                ...state,
            };
        case 'CHG_CURRENCY':
            action.type = "DONE";
            state.currency = action.payload;
            return {
                ...state
            }

        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£'
};

// 2. Creates the context this is the thing our components import and use to get the state
/*This line creates a React context called AppContext using the createContext 
function. A context is a way to share state data between components 
without having to pass props manually through each level of the 
component tree. Components that need access to this context will
 import it and use it to access the state provided by the context.*/
export const AppContext = createContext();
/*This line defines a React component called AppProvider. The AppProvider
 component serves as the provider for the context and wraps the 
 components that need access to the state. It accepts props as its 
 argument, which is a common pattern for React components.*/
// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);
    let remaining = 0;

    if (state.expenses) {
            const totalExpenses = state.expenses.reduce((total, item) => {
            return (total = total + item.cost);
        }, 0);
        remaining = state.budget - totalExpenses;
    }

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining: remaining,
                dispatch,
                currency: state.currency
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
