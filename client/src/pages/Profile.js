import React, {useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

const Profile = ()=>{
    const [user, setUser]=useState(JSON.parse(localStorage.getItem('dailynews-user')));
    const [name, setName]=useState(user.name);
    const [email, setEmail]=useState(user.email);
    const [password, setPassword]=useState('');
    const [loading, setLoading]=useState(false);

    const save=(event)=>{
        event.preventDefault();
        const changeData = async()=>{
            setLoading(true);
            try{
                const payload = {
                    name,
                    email,
                    password,
                    id: user._id
                }
                const response = await axios.post('/api/users/edit', payload);
                setLoading(false);
                toast('User updated !', 'success');
                localStorage.setItem('dailynews-user', JSON.stringify(response.data));
                setUser(JSON.parse(localStorage.getItem('dailynews-user')));
            }catch(error){
                setLoading(false);
                toast('An error has occured', 'error');
                console.log(error);
            }
        };
        changeData();
    };

    const reset=()=>{
        setName(user.name);
        setEmail(user.email);
        setPassword('');
    };
    return(
        <Layout>
            { loading && <Spinner /> }
            <h1 className="text-2xl font-semibold mt-5 ml-5">Profile</h1>
            <form className="p-5 space-y-2">
                <input type='text' className="border-2 h-10 w-full border-gray-300 px-2 rounded" value={name} onChange={(event)=>setName(event.target.value)} placeholder='Name' />
                <input type='email' className="border-2 h-10 w-full border-gray-300 px-2 rounded" value={email} onChange={(event)=>setEmail(event.target.value)} placeholder='Email' />
                <input type='password' className="border-2 h-10 w-full border-gray-300 px-2 rounded" value={password} onChange={(event)=>setPassword(event.target.value)} placeholder='Password' />
                <div className="flex justify-end space-x-2 mt-2">
                    <button
                        type="submit"
                        onClick={save}
                        className="px-5 py-2 bg-green-700 text-white font-bold text-sm hover:bg-green-600"
                    >
                        Save
                    </button>
                    <button
                        type="reset"
                        onClick={reset}
                        className="px-5 py-2 bg-red-700 text-white font-bold text-sm hover:bg-red-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Layout>
    );
};

export default Profile;