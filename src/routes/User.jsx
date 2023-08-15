import { useNavigate, useParams } from "react-router-dom"
import { deleteUser, getUser } from "../users";

export function User() {
    const params = useParams();
    const navigate = useNavigate();

    const user = getUser(parseInt(params.userId));

    const handleDelete = () => {
        deleteUser(user.id);
        navigate("/users");
    };
    return (
        <div>
            <h2>{user.name}</h2>
            <div>
                <strong>Phone: </strong> {user.phone}
            </div>
            <div>
            <strong>Website: </strong> {user.website}
            </div>
            <br />
            <button onClick={handleDelete}>Back</button>
        </div>
    );
}