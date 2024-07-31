import { NavLink } from "react-router-dom";

const Navigation = () => {
  // 3. UI Routing (Пользовательский интерфейс маршрутизации)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Tasks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/users"
                className="nav-link"
              >
                Users
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
