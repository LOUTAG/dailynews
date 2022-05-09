import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getAllNewItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/getallnewitems");
        setLoading(false);
        setNewItems(response.data);
      } catch (error) {
        console.log(error);
        toast("Something wrent wrong", "error");
        setLoading(false);
      }
    };
    getAllNewItems();
  }, []);

  const renderContent = () => {
    return newItems
      .filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((item, index) => {
        let key =
          Date.now().toString() +
          "-" +
          Math.round(Math.random() * 1000) +
          "-" +
          index;
        return (
          <div key={key} className="shadow-md p-3 border cursor-pointer" onClick={()=>navigate(`/newdescription/${item._id}`)}>
            <h1 className="text-primary text-lg font-semibold">{item.title}</h1>
            <p>{item.description}</p>
            <div className="flex justify-end flex-col items-end">
              <span className="text-gray-500">By : {item.postedBy.email}</span>
              <span className="text-gray-500">
                At : {item.createdAt.slice(0, 10)}
              </span>
            </div>
          </div>
        );
      });
  };
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="mx-5 md:mx-10 mt-5">
        <input
          type="text"
          placeholder="Search News"
          className="border-2 h-10 w-full border-gray-300 px-2 rounded"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      {newItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 m-5 md:m-10">
          {renderContent()}
        </div>
      ) : (
        <div>We haven't some news yet, come back later</div>
      )}
    </Layout>
  );
};

export default HomePage;
