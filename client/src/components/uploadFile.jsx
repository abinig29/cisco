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
  setDoneUploading,
}) => {
  const className = height ? `h-[${height}] w-[${height}]` : `w-full`;
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const uploadFile = (file, fileType) => {
      const folder = fileType === "imgUrl" ? "images/" : "videos/";
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, folder + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          fileType === "imgUrl"
            ? setImgPerc(Math.round(progress))
            : setVideoPerc(Math.round(progress));
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
          switch (error.code) {
            case "storage/unauthorized":
              console.log(error);
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
            default:
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            acceptedFile ? setVideo(downloadURL) : setImg(downloadURL);
          });
        }
      );
    };
    if (acceptedFiles?.length) {
      setImgPerc(0);
      setVideoPerc(0);
      if (!acceptedFile) {
        if (picture) deleteFile(picture);
      }
      uploadFile(acceptedFiles[0], acceptedFile ? "videoUrl" : "imgUrl");
    }
  });

  useEffect(() => {
    if (imgPerc > 0 && imgPerc < 100)
      setDoneUploading ? setDoneUploading(false) : null;
    if (imgPerc === 100) setDoneUploading ? setDoneUploading(true) : null;
  }, [imgPerc]);

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
          {!acceptedFile ? (
            imgPerc > 0 && imgPerc < 100 ? (
              <>
                <Progressbar percentage={imgPerc} />
              </>
            ) : isDragActive ? (
              <>Draging.... </>
            ) : (
              <div className=" py-3 flex flex-col items-center text-[13px]">
                <FiUploadCloud className="text-[20px]" />
                <h3>Drag and drop to upload</h3>
                <h5>or browse</h5>
              </div>
            )
          ) : null}
          {acceptedFile ? (
            videoPerc > 0 && videoPerc < 100 ? (
              <>
                <Progressbar percentage={videoPerc} />
              </>
            ) : isDragActive ? (
              <>Draging.... </>
            ) : (
              <div className=" py-3 flex flex-col items-center text-[13px]">
                <FiUploadCloud className="text-[20px]" />
                <h3>Drag and drop to upload</h3>
                <h5>or browse</h5>
              </div>
            )
          ) : null}
        </div>
        {
          <h5 className="text-[12px] text-gray-600 pb-2">
            Please wait untill the image changes before saving!
          </h5>
        }
        {imgTouched && imgError && (
          <div className="text-sm text-red-600 dark:text-red-500 mb-2">
            {imgError}
          </div>
        )}
      </div>
      {(imgPerc > 0 && imgPerc < 100) || (imgPerc === 100 && !picture) ? (
        <div
          className={`relative ${
            height ? `h-[${height}px] w-[${height}px]` : `w-full h-[300px] `
          } flex-1 bg-gray-300 animate-pulse mt-4`}
        ></div>
      ) : (
        picture && (
          <img
            src={picture}
            alt={"picture"}
            className={`${
              height ? `h-[${height}px] w-[${height}px]` : `w-full h-[300px]`
            }  object-cover bg-gray-700`}
          />
        )
      )}
      {(videoPerc > 0 && videoPerc < 100) || (videoPerc === 100 && !video) ? (
        <div
          className={`relative ${
            height ? `h-[${height}px] w-[${height}px]` : `w-full h-[300px] `
          } flex-1 bg-gray-300 animate-pulse mt-4`}
        ></div>
      ) : (
        video && (
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
        )
      )}
    </div>
  );
};

export default UploadFile;
