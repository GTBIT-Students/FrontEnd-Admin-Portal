import React, { useState } from "react";
import "./DragAndDrop.css";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const DragAndDrop = (props) => {
  const { data, dispatch } = props;
  const [inDropZone, setDropZone] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropZone(true);
    // dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false })
    //dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropZone(false);
    //dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false })
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setDropZone(true);
    // dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let files = [...e.dataTransfer.files];
    console.log(files);
    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name);
      files = files.filter((f) => !existingFiles.includes(f.name));
      setDropZone(false);
      // dispatch({ type: 'ADD_FILE_TO_LIST', files });
      // dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      //dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
    }
  };

  return (
    <div
      className={
        inDropZone ? "drag-drop-zone inside-drag-area" : "drag-drop-zone"
      }
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
    <div>
        <CloudUploadIcon style={{fontSize:'5rem'}}/>
    </div>
      <div>
      <input
        type="file"
        id="Dropfile"
        accept="image/*,.png,.jpg,.jpeg"
        onChange={(e) => {
          console.log(e.target.files);
        }}
      />
      
        <label className="Droplabel" for="Dropfile">Choose a file</label>
        <span> or Drag file</span>
      </div>
    </div>
  );
};

export default DragAndDrop;
