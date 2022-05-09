import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import draftToHtml from 'draftjs-to-html';
import ReactHtmlParser from 'react-html-parser';

import Layout from "../components/Layout";
import Spinner from "../components/Spinner";

const NewDescription = ()=>{
    const [newDescription, setNewDescription]=useState(null);
    const [loading, setLoading] = useState(false);
    const id = useParams().id;
    
    useEffect(()=>{
        const fetchDescription = async()=>{
            try{
                setLoading(true);
                const response = await axios.get(`/api/newdescription/${id}`);
                setLoading(false);
                setNewDescription(response.data); 
            }catch(error){
                console.log(error);
                setLoading(false);
            }
        };
        fetchDescription(); 
    },[]);

    const renderContent=()=>{
        if(newDescription!=null){
            return (
                <React.Fragment>
                    <h1 className="text-2xl font-semibold mt-5 ml-5">{newDescription.title}</h1>
                    <p className="p-5">{newDescription.description}</p>
                    <div className="p-5">{ReactHtmlParser(draftToHtml(JSON.parse(newDescription.content)))}</div>
                </React.Fragment>
            );
        };
    };

    return(
        <Layout>
            { loading && <Spinner /> }
            {renderContent()}
        </ Layout>
    );
};

export default NewDescription;