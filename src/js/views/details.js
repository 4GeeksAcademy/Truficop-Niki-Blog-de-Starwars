import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Details = () => {
    const { category, uid } = useParams(); 
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadDetails(category, uid);

        return () => {
            actions.clearDetails();
        };
    }, [category, uid]);

    if (!store.details) {
        return <div>Loading details...</div>; 
    }

    console.log("Detalles recibidos antes del render:", store.details);

    const details = store.details;

    // Construir la URL de la imagen
    let imageUrl = `https://starwars-visualguide.com/assets/img/${category === 'people' ? 'characters' : category}/${uid}.jpg`;
    const fallbackImageUrl = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg"; // URL del big placeholder

    return (
        <div className="container mt-5">
            <div className="card d-flex flex-row">
                <img 
                    src={imageUrl} 
                    onError={(e) => { e.target.src = fallbackImageUrl; }} // Cambiar a big placeholder si la imagen no se carga
                    className="card-img-top" 
                    style={{ width: '400px', height: 'auto' }} 
                    alt={details.name} 
                />
                <div className="card-body">
                    <h5 className="card-title">{details.name}</h5>
                    <ul className="list-group list-group-flush">
                        {Object.entries(details).map(([key, value]) => (
                            <li key={key} className="list-group-item">
                                <strong>{key}:</strong> 
                                {Array.isArray(value) ? (
                                    value.map((item, index) => (
                                        <Link key={index} to={`/${key}/${item.split('/').pop()}`} className="link-primary">
                                            {item}
                                        </Link>
                                    ))
                                ) : key === 'homeworld' ? (
                                    <Link to={`/planets/${details.homeworld.split('/').pop()}`} className="link-primary">
                                        {details.homeworld}
                                    </Link>
                                ) : (
                                    value ? value : "N/A"
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
