import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Favorites = () => {
    const { store, actions } = useContext(Context);

    const renderCard = (item) => {
        const imageUrl = `https://starwars-visualguide.com/assets/img/${item.category === 'people' ? 'characters' : item.category}/${item.uid}.jpg`;
        
        return (
            <div className="card m-3" style={{ width: "18rem" }} key={item.uid}>
                <img
                    src={imageUrl}
                    className="card-img-top"
                    alt={item.name}
                />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <Link to={`/${item.category}/${item.uid}`} className="btn btn-primary">
                        View Details
                    </Link>
                    <button
                        className="btn btn-danger ml-2"
                        onClick={() => actions.removeFromFavorites(item.uid)}
                    >
                        Remove
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="container">
            <h1>Your Favorites</h1>
            <div className="d-flex flex-wrap">
                {store.favorites.length > 0 ? (
                    store.favorites.map(item => renderCard(item))
                ) : (
                    <p>No favorites yet.</p>
                )}
            </div>
        </div>
    );
};
