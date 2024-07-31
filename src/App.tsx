import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import TaskList from './components/TaskList';
import UserDetails from './components/UserDetails';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from './redux/tasksSlice';
import { AppDispatch } from './redux/store';
import { fetchUsers } from './redux/userSlice';
import UserListFC from './components/UserListFC';

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks())
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<TaskList />} />
        <Route path='/users' element={<UserListFC />} />
        <Route path='/users/:id' element={<UserDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
