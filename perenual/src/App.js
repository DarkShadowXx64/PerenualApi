import React, {useState, useEffect} from "react";
import axios from "axios";

function Plants(){
    const [data, setData] = useState(null);
    const [plant, setPlant] = useState('');

    const handleInputChange = (e) => {
      setPlant(e.target.value)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://perenual.com/api/pest-disease-list?key=sk-ukQs6532880c5fbdb2577&q=${plant}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        
        fetchData();
    }, []);

    return(
        <>
            <div>
                <h1>API Data</h1>
                <pre>{JSON.stringify(data, null, 2)}</pre>
                <div>
                    <input type="text" placeholder="Escribe el nombre de una planta"
                    value={plant} onChange={handleInputChange}
                    />
                    <button>Buscar</button>
                </div>
                <div>
                  {plant.length > 0 && (
                    <div>
                      {plant.map((item, index) => (
                        <div key={index}>
                          <p>nombre: {item.common_name}</p>
                          <p>cientifico: {item.scientific_name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
            </div>
        </>
    )
}
export default Plants