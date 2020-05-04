import React, { useState } from "react";
import "./DragAndDrop.css";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const DragAndDrop = (props) => {
  const { handleFileCheck } = props;
  const [inDropZone, setDropZone] = useState(false);
const [showSuccess,setSuccess]=useState(false)

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropZone(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropZone(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setDropZone(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let Newfiles = [...e.dataTransfer.files];
    console.log("new files", Newfiles);
    handleFileCheck(Newfiles,setSuccess);
    // if (Newfiles && Newfiles.length > 0) {
    //   const existingFiles = files.map((f) => f.name);
    //   Newfiles = Newfiles.filter((f) => !existingFiles.includes(f.name));
    //   Newfiles=[...files,...Newfiles]
    //   console.log('updated files',Newfiles);
    //   setFiles(Newfiles)
    //}
    setDropZone(false);
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
    {!showSuccess?
      <div>
        <div>
          <CloudUploadIcon style={{ fontSize: "5rem" }} />
        </div>
        <div>
          <input
            type="file"
            id="Dropfile"
            accept="image/*,.png,.jpg,.jpeg"
            onChange={(e) => {
              handleFileCheck(e.target.files,setSuccess);
            }}
          />

          <label className="Droplabel" for="Dropfile">
            Choose a file
          </label>
          <span> or Drag file</span>
        </div>
      </div>
    :
    <div>
<CheckCircleOutlineIcon style={{ fontSize: "5rem" }}/>
<div>
  <span>Successfully Added</span>
</div>
<div>
<button onClick={()=>setSuccess(false)} className="btn btn-secondary btn-sm mt-2">Try again</button>
</div>
    </div>
    }
    </div>
  );
};

export default DragAndDrop;
