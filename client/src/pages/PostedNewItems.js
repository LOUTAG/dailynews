import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import Spinner from "../components/Spinner";

const PostedNewItems = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading]= useState(false);

  const user = JSON.parse(localStorage.getItem("dailynews-user"));
  const navigate = useNavigate();

  useEffect(() => {
    const getItemByUser = async () => {
      try {
        const response = await axios.get(`/api/getItemByUser/${user._id}`);
        setItems(response.data);
      } catch (error) {
        toast("An error is appeared", "error");
        console.log(error);
      }
    };
    getItemByUser();
  }, []);

  const deleteNews = (itemId) => {
    const deleteRequest = async()=>{
      try{
        const response = await axios.post('/api/news/delete', {id: itemId});
        toast(response.data, 'success');
        setItems( items.filter(item=>{
          if(item._id != itemId){
            return item;
          }
        }));
      }catch(error){
        console.log(error);
        toast('An error has occurred', 'error');
      }
    };
    deleteRequest();
  };

  const renderContent = () => {
    return items.map((item, index) => {
      let itemId = item._id;
      let key =
        Date.now() + "-" + Math.round(Math.random() * 1000) + "-" + index;
      return (
        <tr key={key} className="w-full">
          <td className="border-2 border-gray-500 p-2">
            {itemId}
          </td>
          <td className="border-2 border-gray-500 p-2">{item.title}</td>
          <td className="border-2 border-gray-500 p-2">
            {item.createdAt.slice(0, 10)}
          </td>
          <td className="border-2 border-gray-500 p-2 text-center space-y-1">
            <button
              className="w-full px-5 py-2 bg-red-700 text-white font-bold text-sm hover:bg-red-600"
              onClick={()=>deleteNews(itemId)}
            >
              Delete
            </button>
            <button
              className="w-full px-5 py-2 bg-green-700 text-white font-bold text-sm hover:bg-green-600"
              onClick={()=>navigate(`/editnews/${itemId}`)}
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <Layout>
      {loading && <Spinner />}
      {(items == null || items.length==0)  ? (
        <div>No post yet ..</div>
      ) : (
        <div className="p-10">
          <table className="w-full border-2 border-gray-500 p-10">
            <thead className="w-full">
              <tr className="w-full bg-gray-300">
                <th className="border-2 border-gray-500 p-2">id</th>
                <th className="border-2 border-gray-500 p-2">title</th>
                <th className="border-2 border-gray-500 p-2">Posted On</th>
                <th className="border-2 border-gray-500 p-2">Action</th>
              </tr>
            </thead>
            <tbody>{renderContent()}</tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default PostedNewItems;
