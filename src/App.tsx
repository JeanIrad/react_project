import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Form from "./components/Form";
import { useEffect, useState } from "react";
import categories from "./expense-tracker/categories";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import ProductList from "./components/ProductList";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

function App() {
  // const [category, setCategory] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("");
  // const [expenses, setExpenses] = useState([
  //   {
  //     id: 1,
  //     amount: 43,
  //     description: "Netflix",
  //     category: "Entertainment",
  //   },
  //   {
  //     id: 2,
  //     amount: 33,
  //     description: "TV and Phones",
  //     category: "Utilities",
  //   },
  //   {
  //     id: 3,
  //     amount: 23,
  //     description: "Carrots",
  //     category: "Groceries",
  //   },
  // ]);
  // const visibleExpenses = selectedCategory
  //   ? expenses.filter((e) => e.category === selectedCategory)
  //   : expenses;

  const { users, error, isLoading, setError, setUsers } = useUsers();
  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    userService.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };
  const addUser = () => {
    const newUser = { id: 0, name: "Jean De Dieu" };
    const originalUsers = [...users];
    setUsers([newUser, ...users]);

    userService
      .create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };
  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((u) => (
          <li
            key={u.id}
            className="list-group-item d-flex justify-content-between"
          >
            {u.name}{" "}
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteUser(u)}
            >
              Delete
            </button>
          </li>
        ))}
        {/* <ExpenseForm
        onSubmit={(newExpense) =>
          setExpenses([...expenses, { ...newExpense, id: expenses.length + 1 }])
        }
      />
      <ExpenseFilter
        onSelectCategory={(category) => setSelectedCategory(category)}
      />
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) =>
          setExpenses(expenses.filter((expense) => expense.id !== id))
        }
      />
      <select
        className="form-select"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Household">Household</option>
      </select>
      <ProductList category={category} /> */}
      </ul>
    </>
  );
}

export default App;
