import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, editUser, IUser } from "../redux/userSlice";
import { NavLink } from "react-router-dom";
import style from "../styles/User.module.css";

interface IProps {
  user: IUser;
}

const UserFC: FC<IProps> = ({ user }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const dispatch = useDispatch();


  // const { id } = useParams();

  return (
    <div
      className="card mb-3"
      style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
    >
      <div className="card-body">
        {isEdit ? (
          <div>
            <input
              className="form-control mb-2"
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className="form-control mb-2"
              name="company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <input
              className="form-control mb-2"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              onClick={() => {
                setIsEdit(false);
                dispatch(
                  editUser({
                    ...user,
                    name: userName,
                    company: {
                      name: companyName,
                    },
                    phone,
                  })
                );
              }}
              className="btn btn-success btn-sm me-2"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <NavLink
              className='className="d-flex align-items-center flex-grow-1 text-decoration-none'
              to={`/users/${user.id}`}
              >
              <div style={{ flexGrow: 1 }}>
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {user.company.name}
                </h6>
                <p className={`card-text ${style.color}`}>{user.phone}</p>
              </div>
            </NavLink>
            <button
              onClick={() => setIsEdit(true)}
              className="btn btn-warning btn-sm me-2"
            >
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteUser(user.id - 1))}
              className="btn btn-danger btn-sm"
            >
              Del
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFC;
