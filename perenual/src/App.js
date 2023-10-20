import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Plant() {
    const [pestData, setPestData] = useState({});
    const [obtainingData, setObtainingData] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const getPestInfo = async () => {
        setObtainingData(true);

        try {
            const API_KEY = 'sk-DIAs6532876b0072f2567'; // Tu clave API
            const response = await axios.get(`https://perenual.com/api/pest-disease-list?key=${API_KEY}&q=${searchTerm}`);

            if (response.status !== 200) {
                console.log(response);
                return Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Ha ocurrido un error'
                });
            }

            setPestData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setObtainingData(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="flex justify-center text-2xl font-bold mb-4">Información de Enfermedades y Plagas</h1>
            <h1 className=" flex justify-center text-1xl font-semibold mb-4">Ingresa el Nombre de la planta</h1>

            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Nombre de enfermedad o plaga"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className=" text-center w-80 p-2 rounded-lg mr-2"
                />
                <button onClick={getPestInfo} className="bg-blue-500 text-white p-2 rounded-lg">
                    Obtener información
                </button>
            </div>

            {obtainingData ? (
                <p className='mt-40 flex justify-center items-center text-6xl font-serif font-bold'>Obteniendo datos...</p>
            ) : (
                <div>
                    {pestData && pestData.data && pestData.data.length > 0 ? (
                        pestData.data.map((item, index) => (
                            <div key={item.id} className="mb-4 p-4 bg-white rounded-md shadow-md">
                                <h2 className="text-xl font-semibold mb-2">{item.common_name}</h2>
                                <p className="text-lg">{item.scientific_name}</p>
                                <div>
                                    {item.description && item.description.length > 0 ? (
                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold mb-2">{item.description[0].subtitle}</h3>
                                            <p>{item.description[0].description}</p>
                                        </div>
                                    ) : null}
                                </div>
                                <div>
                                    {item.images && item.images.length > 0 ? (
                                        <img
                                            src={item.images[0].original_url}
                                            alt={`Image 1`}
                                            className="w-[50%] rounded-xl shadow-md mx-auto mt-4"
                                        />
                                    ) : null}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='mt-40 flex justify-center items-center text-6xl font-serif font-bold'>No se encontraron resultados.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Plant;
