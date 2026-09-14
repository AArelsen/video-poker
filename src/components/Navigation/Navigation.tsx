import { NavLink } from "react-router";

export function Navigation(){
    return (
        <nav arial-label="Main navigatin">
            <NavLink to="/">Game</NavLink>
            <NavLink to="/players">Players</NavLink>
            <NavLink to="/rules">Rules</NavLink>
        </nav>
    );
}