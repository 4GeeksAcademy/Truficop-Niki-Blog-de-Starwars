const getState = ({ getStore, setStore }) => {
    return {
        store: {
            people: [],
            vehicles: [],
            planets: [],
            favorites: [],
            details: null
        },
        actions: {
            loadPeople: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/people");
                    const data = await response.json();
                    setStore({ people: data.results });
                } catch (error) {
                    console.log("Error loading people from SWAPI", error);
                }
            },
            loadVehicles: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/vehicles");
                    const data = await response.json();
                    setStore({ vehicles: data.results });
                } catch (error) {
                    console.log("Error loading vehicles from SWAPI", error);
                }
            },
            loadPlanets: async () => {
                try {
                    const response = await fetch("https://www.swapi.tech/api/planets");
                    const data = await response.json();
                    setStore({ planets: data.results });
                } catch (error) {
                    console.log("Error loading planets from SWAPI", error);
                }
            },
            addToFavorites: (item) => {
                const store = getStore();
                if (!item || !item.uid || !item.category) {
                    console.error("Error: Intentando agregar un favorito con datos inválidos:", item);
                    return;
                }

                if (!store.favorites.find(fav => fav.uid === item.uid)) {
                    setStore({ favorites: [...store.favorites, item] });
                    console.log("Favorito agregado:", item); 
                }
            },
            removeFromFavorites: (uid) => {
                const store = getStore();
                const newFavorites = store.favorites.filter(fav => fav.uid !== uid);
                setStore({ favorites: newFavorites });
                console.log("Favorito eliminado:", uid);
            },
            loadDetails: async (category, uid) => {
                try {
                    let apiCategory = category;
                    if (category === 'characters' || category === 'people') {
                        apiCategory = 'people'; 
                    }

                    const response = await fetch(`https://www.swapi.tech/api/${apiCategory}/${uid}`);
                    if (!response.ok) {
                        throw new Error(`Error loading details for ${apiCategory} with uid ${uid}`);
                    }
                    const data = await response.json();
                    setStore({ details: data.result.properties }); 
                } catch (error) {
                    console.log(`Error fetching details for ${category}`, error);
                }
            },
            clearDetails: () => {
                setStore({ details: null });
            }
        }
    };
};

export default getState;
