import React from "react";

//Redux
import { useSelector } from "react-redux";

//Components
import Header from "./Components/Header";

//Container
import ListsContainer from "./Containers/ListsContainer";
import BoardsContainer from "./Containers/BoardsContainer";
import Login from "./Containers/Login";

//Router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from "./router/ProtectedRoute";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <header>
        <Header isLoggedIn={isLoggedIn} />
      </header>
      <main>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <ProtectedRoute
              path="/boards/:id"
              component={BoardsContainer}
              isAuth={isLoggedIn}
            />
            <ProtectedRoute
              path="/board/:id"
              component={ListsContainer}
              isAuth={isLoggedIn}
            />
          </Switch>
        </Router>
      </main>
    </>
  );
};

export default App;
