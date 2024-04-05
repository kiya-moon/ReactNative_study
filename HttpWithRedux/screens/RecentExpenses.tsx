import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpensesContext } from '../store/context/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import { useAppSelector, useAppDispatch} from '../store/redux/hooks';
import { setExpensesRdx } from '../store/redux/expenses';

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const expensesCtx = useContext(ExpensesContext);
  const expensesRdx = useAppSelector((state) => state.expenses)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpenses();
      setIsFetching(false);
      // expensesCtx.setExpenses(expenses);
      dispatch(setExpensesRdx(expenses));
    }

    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />
  }

  const recentExpenses = expensesRdx.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
