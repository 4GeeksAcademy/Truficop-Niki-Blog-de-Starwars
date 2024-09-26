import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadPeople();
        actions.loadVehicles();
        actions.loadPlanets();
    }, []);

    const renderCard = (item, category) => {
        // Usar la URL del placeholder si no hay imagen disponible
        const imageUrl = `https://starwars-visualguide.com/assets/img/${category === 'people' ? 'characters' : category}/${item.uid}.jpg`;
        const fallbackImageUrl = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; // URL del placeholder

        return (
            <div className="card m-3" style={{ width: "18rem" }} key={item.uid}>
                <img
                    src={imageUrl}
                    onError={(e) => { e.target.src = fallbackImageUrl; }} // Cambiar a placeholder si la imagen no se carga
                    className="card-img-top"
                    alt={item.name}
                />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <Link to={`/${category}/${item.uid}`} className="btn btn-primary">
                        View Details
                    </Link>
                    <button
                        className="btn btn-warning ml-2"
                        onClick={() => actions.addToFavorites({ uid: item.uid, name: item.name, category })}
                    >
                        Add to Favorites
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="container">
            <h1>People</h1>
            <div className="d-flex flex-wrap">
                {store.people.map(person => renderCard(person, "characters"))}
            </div>

            <h1>Vehicles</h1>
            <div className="d-flex flex-wrap">
                {store.vehicles.map(vehicle => renderCard(vehicle, "vehicles"))}
            </div>

            <h1>Planets</h1>
            <div className="d-flex flex-wrap">
                {store.planets.map(planet => renderCard(planet, "planets"))}
            </div>
        </div>
    );
};
