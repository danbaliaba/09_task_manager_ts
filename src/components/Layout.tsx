import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
// import { useEffect } from 'react'
// import { selectUser } from '../redux/usersSlice';
// import { AppDispatch } from '../redux/store';
// import { useDispatch } from 'react-redux';

// rafce
const Layout = () => {
  // const { id } = useParams();
  // const dispatch: AppDispatch = useDispatch();

  // useEffect(() => {
  //   if (id) {
  //     dispatch(selectUser(+id))
  //   }
  // }, [id])

  return (
    <div>
        <Navigation />
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout
