import { Link } from "react-router-dom";

export const UserCard = ({ id, name, description, address, phone, image }) => {
  return (
    <div className="d-flex py-2 col-12 col-md-6 col-lg-4 justify-content-center ">
      <div className="card " style={{ width: "18rem" }}>
        {image && <img src={image} className="card-img-top" alt="..." />}
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{address}</li>
          <li className="list-group-item">{phone}</li>
        </ul>
        <div className="card-body">
          <Link to={`/my-cards/edit/${id}`} className="card-link">
            Edit card
          </Link>
          <Link to={`/my-cards/delete/${id}`} className="card-link link-danger">
            Delete card
          </Link>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
