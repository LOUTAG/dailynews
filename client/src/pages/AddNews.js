import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast } from "react-toastify";

import axios from "axios";

import Layout from "../components/Layout";
import Spinner from "../components/Spinner";

const AddNews = () => {
  //useState
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('dailynews-user'));

  //Helpers
  const save = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload = {
        title,
        description,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        postedBy: {
          userid: user._id,
          email: user.email
        }
      };
      await axios.post("/api/newitems/add", payload);
      setLoading(false);
      toast("News had been added successfully", "success");
      reset();
    
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast("Something went wrong", "error");
    }
  };
  const reset = () => {
    setTitle("");
    setDescription("");
    setEditorState(() => EditorState.createEmpty());
  };

  //Render
  return (
    <Layout>
      {loading && <Spinner />}
      <h1 className="text-2xl font-semibold mt-5 ml-5">AddNews</h1>
      <form className="p-5">
        <input
          type="text"
          className="border-2 h-10 w-full border-gray-300 px-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        ></input>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="border-2 w-full border-gray-300 my-2 px-2 rounded"
          rows="4"
          placeholder="Description"
        ></textarea>
        <div className="border-2 border-gray-300 rounded px-2">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            editorClassName="draft-editor"
          />
        </div>
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
export default AddNews;
