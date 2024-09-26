import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-light bg-light mb-3 mx-3">
            <Link to="/">
                <span className="navbar-brand mb-0 h1">Star Wars</span>
            </Link>
            <div className="ml-auto">
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Favorites {store.favorites.length}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                        {store.favorites.length > 0 ? (
                            store.favorites.map((item) => (
                                <li key={item.uid} className="d-flex justify-content-between align-items-center px-3">
                                    <Link to={`/${item.category}/${item.uid}`} className="dropdown-item">
                                        {item.name}
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm ml-2"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evita que el dropdown se cierre
                                            actions.removeFromFavorites(item.uid);
                                        }}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item">No favorites yet.</li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
