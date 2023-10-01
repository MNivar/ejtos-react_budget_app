import React, { useContext, useState } from 'react'; //This line imports the necessary React features such as the useContext and useState hooks from the 'react' library.
import { AppContext } from '../context/AppContext'; //This line imports the AppContext from a file located in the '../context' directory. The AppContext is likely a context created using React's createContext API.


const Budget = () => { //This line defines a functional React component named "Budget."
    const { budget, expenses, currency } = useContext(AppContext); // This line uses the useContext hook to access the budget and expenses (which is an array) value from the AppContext. This assumes that the AppContext provider wraps this component's parent component.
    const [newBudget, setNewBudget] = useState(budget); //: This line initializes a state variable named newBudget using the useState hook. It sets the initial value of newBudget to the value of budget obtained from the context. Additionally, it creates a function setNewBudget to update the newBudget state.
    /*: This line defines a function named handleBudgetChange that takes an event as an
     argument. This function is intended to update the newBudget 
     state with the value of an input element when the user changes 
     it. The event.target.value represents the new value entered by 
     the user.*/

    const totalExpenses = expenses.reduce((total, item) => { //reduce is a JS function, reduce is a higher-order function in JavaScript used for iterating over elements in an array and reducing them to a single value. Takes 2 arguments, total and item. total is the accumulator that keeps track of the running total, and item is the current element being processed in the array.
        return (total += item.cost);
    }, 0);

    const test = currency;

    

    const handleBudgetChange = (event) => {


         const user_input = event.target.value;

        if (user_input > 20000){
            alert("The value cannot exceed 200000"); //alert pop up if a value exceeding 20k is inputted
            return;
        }

        if (user_input < totalExpenses){
            alert ("You cannot have a budget lower than your spending!");
            return;
        }
        setNewBudget(event.target.value);
    }
    return (
<div className='alert alert-secondary'>
Budget: {test}
<input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
</div>
    );
};
export default Budget;
