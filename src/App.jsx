import "./App.css";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "./components/footer";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import MyCards from "./components/myCards";
import LogIn from "./components/logIn";
import SignUp from "./components/signUp";
import SignUpBusiness from "./components/signUpBusiness";
import LogOut from "./components/logOut";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/protectedRoute";
import CreateCard from "./components/createCard";
import EditCard from "./components/editCard";
import DeleteCard from "./components/deleteCard";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <ToastContainer />
      <header>
        <Navbar />
      </header>
      <main className="flex-fill container">
        <Routes>
          <Route path="SPA-realApp" element={<Home />} />
          <Route path="SPA-realApp/about" element={<About />} />
          <Route
            path="SPA-realApp/my-cards"
            element={
              <ProtectedRoute onlyBiz>
                <MyCards />
              </ProtectedRoute>
            }
          />
          <Route path="SPA-realApp/about" element={<About />} />
          <Route
            path="SPA-realApp/log-out"
            element={
              <ProtectedRoute>
                <LogOut />
              </ProtectedRoute>
            }
          />
          <Route path="SPA-realApp/log-in" element={<LogIn />} />
          <Route path="SPA-realApp/sign-up" element={<SignUp />} />
          <Route
            path="SPA-realApp/sign-up-business"
            element={<SignUpBusiness />}
          />
          <Route
            path="SPA-realApp/card-creator"
            element={
              <ProtectedRoute onlyBiz>
                <CreateCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="SPA-realApp/my-cards/edit/:id"
            element={
              <ProtectedRoute onlyBiz>
                <EditCard />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            path="SPA-realApp/my-cards/delete/:id"
            element={
              <ProtectedRoute onlyBiz>
                <DeleteCard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
