import { FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";

const UserDetails: FC = () => {
  const { users } = useSelector((state: RootState) => state.persons);
  const { id } = useParams() as { id: string };
  const { street, city, geo, suite, zipcode } = users[+id - 1].address as {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };

  const navigate = useNavigate();
  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div
        className="card mb-3"
        style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)", width: "400px" }}
      >
        <div className="card-body text-center">
          <h1 className="text-center mb-4">{users[+id - 1].name}</h1>
          <p>
            <strong>Company:</strong> {users[+id - 1].company.name}
          </p>
          <p>
            <strong>Phone:</strong> {users[+id - 1].phone}
          </p>
          <p>
            <strong>Email:</strong> {users[+id - 1].email}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={`http://${users[+id - 1].website}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {users[+id - 1].website}
            </a>
          </p>
          <h5 className="mt-4">Address:</h5>
          <ul className="list-unstyled">
            <li>
              <strong>Street:</strong> {street}
            </li>
            <li>
              <strong>Suite:</strong> {suite}
            </li>
            <li>
              <strong>City:</strong> {city}
            </li>
            <li>
              <strong>Zipcode:</strong> {zipcode}
            </li>
            <li>
              <strong>Geolocation:</strong> {geo.lat} (latitude), {geo.lng}{" "}
              (longitude)
            </li>
          </ul>
          {/* <NavLink to='/users'> */}
          <button
            onClick={() => {
              navigate("/users");
            }}
            className="btn btn-secondary mt-3"
          >
            Close
          </button>
          {/* </NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
