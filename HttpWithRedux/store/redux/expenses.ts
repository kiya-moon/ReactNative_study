import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store';

// Define a type for the slice state
interface ExpanseState {
  id: string,
  amount: number,
  date: Date,
  description: string,
}

// Define the initial state using that type
const initialState: ExpanseState = {
    id: '',
    amount: 0,
    date: new Date,
    description: '',
} satisfies ExpanseState as ExpanseState

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: [] as ExpanseState[],
  reducers: {
    // 필요한 기능 : 비용 세팅, 비용 추가, 업데이트, 삭제
    setExpense: (state, action: PayloadAction<ExpanseState[]>) => {
      return action.payload;
    },
    addExpense: (state, action: PayloadAction<ExpanseState>) => {
      state.push(action.payload)
    },
    updateExpense: (state, action: PayloadAction<ExpanseState>) => {
      const updatedExpense = action.payload;
      const index = state.findIndex(expense => expense.id === updatedExpense.id);
      if (index !== -1) {
        state[index] = updatedExpense;
      }
    }, 
    deleteExpense: (state, action: PayloadAction<string>) => {
      const idToDelete = action.payload;
      return state.filter(expense => expense.id !== idToDelete);
    }
  }
})

// Export action creators
export const setExpensesRdx = expensesSlice.actions.setExpense
export const rdxAddExpense = expensesSlice.actions.addExpense
export const rdxUpdateExpense = expensesSlice.actions.updateExpense
export const rdxDeleteExpense = expensesSlice.actions.deleteExpense

// Selector function
export const selectExpenses = (state: RootState) => state.expenses;

// Export the reducer
export default expensesSlice.reducer