import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Header from "./components/common/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./components/tasksComponent/Board";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserColumns, getUserInfo } from "./redux/actions/user-actions";
import Loader from "./components/common/Loader";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserColumns());
  }, [dispatch,isAuthenticated]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Header user={user} />
      <Routes>
        {!isAuthenticated && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* Protected Routes */}
        {isAuthenticated && (
          <>
            <Route
              path="/board"
              element={
                <DndProvider backend={HTML5Backend}>
                  <Board />
                </DndProvider>
              }
            />
            <Route path="*" element={<Navigate to="/board" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
