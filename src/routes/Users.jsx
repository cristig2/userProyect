import { NavLink, Outlet, useLocation, useSearchParams } from "react-router-dom";
import { getAllUsers } from "../users"

export function Users() {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    
    const users = getAllUsers();
    const filter = searchParams.get("filter") ?? "";

    const handleFilter = (e) => {
        setSearchParams({filter: e.target.value})
    }
    return (
    <div>
        <h1>Users</h1>
        <input value={filter} onChange={handleFilter} type="text" placeholder="Write a name"></input>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
        <ul>
            {users.filter(user => {
                if (!filter) return true;
                
                const name = user.name.toLowerCase();
                return name.includes(filter.toLowerCase());
            }).map(user => (
            <li style={{listStyle: "None"}}key={user.id}>
                <h3 style={{ fontSize: "23px"}}>
                    <NavLink 
                    style={({ isActive }) => (isActive ? {color: "black"} : {})} 
                    to={user.id.toString() + location.search}>{user.name}
                    </NavLink>
                </h3>
            </li>
            ))}
        </ul>
        <article>
            <Outlet />
        </article>
        </div>
    </div>    
    );
}