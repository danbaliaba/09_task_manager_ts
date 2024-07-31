import { ChangeEvent, Component } from "react";
import { IUser } from "./UserList";
import style from "../styles/User.module.css";
import { NavLink} from "react-router-dom";

interface IProps {
  user: IUser;
  deleteUser: () => void;
  editUser: (user: IUser) => void;
  changeIsDetails: (userDetails: IUser | null) => void;
  setUser: (user: IUser) => void;
  setChange:  React.Dispatch<React.SetStateAction<(() => void) | null>>
}

interface IState {
  userInfo: boolean;
  isEdit: boolean;
  name: string;
  company: string;
  phone: string;
}

export default class User extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      userInfo: false,
      isEdit: false,
      name: props.user.name,
      company: props.user.company.name,
      phone: props.user.phone,
    };
  }

  toggleEdit = () => {
    this.setState((prevState) => ({ ...prevState, isEdit: !prevState.isEdit }));

    // this.setState((prevState) => {
    //     return {...prevState, isEdit: !prevState.isEdit}
    // })
  };

  /*   toggleUserDetails = () => {
    this.setState((prevState) => ({
      ...prevState,
      userInfo: !prevState.userInfo,
    }));
  }; */

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({ ...prevState, [name]: value }));
    // this.setState((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  };

  saveUser = () => {
    const { company, name, phone } = this.state;
    const { editUser, user } = this.props;

    const updatedUser = {
      ...user,
      name,
      company: { name: company },
      phone,
    };

    editUser(updatedUser);
    this.toggleEdit();
  };

  render() {
    return (
      <div className="card mb-3" style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <div className="card-body">
          {this.state.isEdit ? (
            <div>
              <input
                className="form-control mb-2"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <input
                className="form-control mb-2"
                name="company"
                value={this.state.company}
                onChange={this.handleChange}
              />
              <input
                className="form-control mb-2"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
              />
              <button onClick={this.saveUser} className="btn btn-success btn-sm me-2">
                Save
              </button>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <NavLink
                className='className="d-flex align-items-center flex-grow-1 text-decoration-none'
                to={`/users/${this.props.user.id}`}
                onClick={() => {
                  this.props.setChange(() => () => this.props.changeIsDetails(this.props.user));
                  this.props.setUser(this.props.user);
                  this.props.changeIsDetails(this.props.user);
                }}
              >
                <div style={{ flexGrow: 1 }}>
                  <h5 className="card-title">{this.props.user.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {this.props.user.company.name}
                  </h6>
                  <p className={`card-text ${style.color}`}>
                    {this.props.user.phone}
                  </p>
                </div>
              </NavLink>
              <button onClick={this.toggleEdit} className="btn btn-warning btn-sm me-2">
                Edit
              </button>
              <button onClick={this.props.deleteUser} className="btn btn-danger btn-sm">
                Del
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
