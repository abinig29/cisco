import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { storage } from "../firbase";
import Progressbar from "./progressbar";
import { FaStarOfLife } from "react-icons/fa";
import { deleteFile } from "../utils/utils";

const UploadFile = ({
  picture,
  video,
  imgTouched,
  imgError,
  setImg,
  setVideo,
  lable,
  height,
  textColor,
  acceptedFile,
}) => {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      acceptedFile ? setVideo(acceptedFiles?.[0]) : setImg(acceptedFiles?.[0]);
    }
  });

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: acceptedFile ? `${acceptedFile}/*` : "image/*",
  });

  return (
    <div className={`${textColor && textColor}`}>
      {" "}
      <div>
        {lable && (
          <label for="gender" class="block mb-2 text-sm font-medium ">
            {lable}
            <span>
              {
                <FaStarOfLife className=" text-red-900 text-[10px] inline ml-2" />
              }
            </span>
          </label>
        )}
        <div
          {...getRootProps({
            className: `w-full border-dashed border-gray-500 border mt-4 cursor-pointer mb-2 h-[80px] text-black flex flex-col items-center justify-center px-2 ${
              textColor && textColor
            }`,
          })}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <>Draging.... </>
          ) : (
            <div className=" py-3 flex flex-col items-center text-[13px]">
              <FiUploadCloud className="text-[20px]" />
              <h3>Drag and drop to upload</h3>
              <h5>or browse </h5>
            </div>
          )}
        </div>

        {imgTouched && imgError && (
          <div className="text-sm text-red-600 dark:text-red-500 mb-2">
            {imgError}
          </div>
        )}
      </div>
      {picture && (
        <img
          src={picture}
          alt={"picture"}
          className={`${
            height ? `h-[${height}px] w-[${height}px]` : `w-full h-[300px]`
          }  object-cover bg-gray-700`}
        />
      )}
      {video && (
        <div
          className={`relative ${
            height ? `h-[${height}px] w-[${height}px]` : `w-full h-[300px]`
          } flex-1 bg-red-400 mt-4`}
        >
          <video className="w-full h-full object-cover" controls>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
