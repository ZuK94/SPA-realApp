import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContextProvider";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <>
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <NavLink
              to={"SPA-realApp"}
              className="d-flex  align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <div className=" me-3 ">
                Real <i className="bi bi-incognito"></i> App
              </div>
            </NavLink>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <NavLink
                  to={"SPA-realApp"}
                  className="nav-link px-2 text-white"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"SPA-realApp/about"}
                  className="nav-link px-2 text-white"
                >
                  About
                </NavLink>
              </li>
              {user?.biz && (
                <>
                  <li>
                    <NavLink
                      to={"SPA-realApp/my-cards"}
                      className="nav-link px-2 text-white"
                    >
                      My cards
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            <ul className="nav col-12 col-lg-auto ms-lg-auto justify-content-center mb-2  mb-md-0">
              {user ? (
                <li>
                  <NavLink
                    to={"SPA-realApp/log-out"}
                    className="nav-link px-2 text-danger"
                  >
                    Log Out
                  </NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink
                      to={"SPA-realApp/log-in"}
                      className="nav-link px-2 text-primary"
                    >
                      Log in
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"SPA-realApp/sign-up"}
                      className="nav-link px-2 text-warning"
                    >
                      sign-up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"SPA-realApp/sign-up-business"}
                      className="nav-link px-2 text-warning"
                    >
                      sign-up business
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};
export default Navbar;
