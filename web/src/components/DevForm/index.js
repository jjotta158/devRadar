import React, {useState, useEffect} from 'react';
import './index.css';
import api from '../../services/api.js';
function DevForm({onSubmit}) {
    const [reload, setReload] = useState(0);
    const [github_username, setGithub_username] = useState('')
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((success) => {
            const {latitude, longitude} = success.coords;
            setLatitude(latitude);
            setLongitude(longitude);
        }, (error) => {
            console.log(error);
        }, {timeout: 30000});
    }, []);

    async function handleSubmit(e) {
        e.preventDefault()

        await onSubmit({github_username, techs, latitude, longitude})

        setGithub_username('')
        setTechs('')
    }

    return (<form onSubmit={handleSubmit}>
        <div className="input-block">
            <label htmlfor="github_username">Usuário do GitHub</label>
            <input name="github_username" id="github_username" value={github_username} onChange={e => setGithub_username(e.target.value)} required="required"/>
        </div>

        <div className="input-block">
            <label htmlfor="techs">Tecnologias</label>
            <input name="techs" id="techs" value={techs} onChange={e => setTechs(e.target.value)} required="required"></input>
        </div>

        <div className="input-group">
            <div className="input-block">
                <label htmlfor="latitude">Latitude</label>
                <input type="number" name="latitude" id="latitude" value={latitude} required="required" disabled="disabled"></input>
            </div>

            <div className="input-block">
                <label htmlfor="longitude">Longitude</label>
                <input type="number" name="longitude" id="longitude" value={longitude} required="required" disabled="disabled"></input>
            </div>
        </div>

        <button type="submit">Cadastrar</button>
    </form>)
}

export default DevForm;
