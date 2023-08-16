import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { getAllUsers } from "../users"

export function Users() {
    const [searchParams, setSearchParams] = useSearchParams();
    const users = getAllUsers();
    const filter = searchParams.get("filter") ?? "";

    const handleFilter = (e) => {
        setSearchParams({filter: e.target.value})
    }
    return (
    <div>
        <h1>Users</h1>
        <input value={filter} onChange={handleFilter} type="text" placeholder="filter"></input>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: "10px"}}>
        <ul>
            {users.filter(user => {
                if (!filter) return true;
                
                const name = user.name.toLowerCase();
                return name.includes(filter.toLowerCase());
            }).map(user => (
            <li style={{listStyle: "None", paddingTop: "-10px"}}key={user.id}>
                <h3>
                    <NavLink 
                    style={{fontSize: "23px", marginTop: "0px"}} 
                    to={user.id.toString()}>{user.name}
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