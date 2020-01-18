import React, {useState, useEffect} from 'react';
import './global.css';
import './Sidebar.css';
import './Main.css';
import './App.css';
import api from './services/api.js';
import DevItem from './components/DevItem/index.js';
import DevForm from './components/DevForm/index.js';
function App() {
    const [devs, setDevs] = useState([]);

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs')
            setDevs(response.data.dev)
        }
        loadDevs()
    }, [])
    async function handleAddDev(data) {
        const response = await api.post('/devs', data)

        setDevs([...devs, response.data.dev])
    }

    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev}></DevForm>
            </aside>
            <main>
                <ul>
                    {
                        devs.map(dev => (
                            <DevItem key={dev._id} dev={dev}/>
                        ))

                    }
                </ul>
            </main>
        </div>
    )
}

export default App;
