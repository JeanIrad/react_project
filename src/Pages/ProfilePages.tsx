import { NavLink, Outlet } from "react-router-dom";

const profiles = [1, 2, 3, 4, 5, 6];
const ProfilePages = () => {
  return (
    <div>
      {profiles.map((pr) => (
        <NavLink
          key={pr}
          to={`/profiles/${pr}`}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Profile {pr}
        </NavLink>
      ))}
      <Outlet />
    </div>
  );
};

export default ProfilePages;
