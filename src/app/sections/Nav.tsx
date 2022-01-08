import { NavLink } from "react-router-dom"
import QueryVesting from "pages/QueryVesting"
import RegisterVesting from "txs/RegisterVesting"

export const routes = [
  { title: "Query", path: "/query", element: <QueryVesting /> },
  { title: "Register", path: "/register", element: <RegisterVesting /> },
]

const Nav = () => {
  return (
    <nav>
      {routes.map(({ path, title }) => (
        <li key={path}>
          <NavLink to={path}>{title}</NavLink>
        </li>
      ))}
    </nav>
  )
}

export default Nav
