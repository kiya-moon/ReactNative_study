import { useContext } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/context/expenses-context';
import { useAppSelector } from '../store/redux/hooks';

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const expensesRdx = useAppSelector((state) => state.expenses)

  return (
    <ExpensesOutput
      expenses={expensesRdx}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;
