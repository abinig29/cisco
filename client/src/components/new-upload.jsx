import React, { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Modal, Progress, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { deleteFile } from "../utils/utils";
import { storage } from "../firbase";
import { FaStarOfLife } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
const CustomUpload = ({
  picture,
  video,
  setImg,
  setVideo,
  lable,
  textColor,
  acceptedFile,
}) => {
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [imgPerc, setImgPerc] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [imgList, setImgList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleCancel = () => setPreviewOpen(false);
  const [previewImage, setPreviewImage] = useState("");
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  useEffect(() => {
    // if (!imgList.length)
    if (picture) {
      let pImage = {
        "aria-label": undefined,
        "aria-labelledby": undefined,
        name: "",
        response: undefined,
        uid: "",
        xhr: undefined,
        url: picture,
      };
      console.log(picture);

      setImgList([pImage]);
    }
  }, [picture]);
  const onChange = ({ fileList: newFileList }) => {
    setIsUploading(true);
    const uploadFile = (fileUpload, file, fileType) => {
      const folder = fileType === "imgUrl" ? "images/" : "videos/";
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, folder + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImgPerc(Math.round(progress));
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
          setIsUploading(false);
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
            setIsUploading(false);
            acceptedFile ? setVideo(downloadURL) : setImg(downloadURL);
          });
        }
      );
    };

    if (newFileList?.length) {
      if (!acceptedFile) {
        if (picture) {
          deleteFile(picture);
          console.log("delet");
        }
      }
      // setImgList(newFileList)
      uploadFile(
        newFileList,
        newFileList[0].originFileObj,
        acceptedFile ? "videoUrl" : "imgUrl"
      );
    }
  };

  const uploadButton = (
    <div>
      <div
        style={{
          marginTop: 8,
        }}
        className={`${
          textColor ? `text-black` : `text-white`
        } flex justify-center items-center flex-col `}
      >
        <MdCloudUpload className="text-4xl" />
        Upload
      </div>
    </div>
  );
  return (
    <div>
      {lable && (
        <label
          for="gender"
          className={`${textColor ? `text-black` : `text-white`} text-sm`}
        >
          {lable}
          <span>
            {<FaStarOfLife className=" text-red-900 text-[10px] inline ml-2" />}
          </span>
        </label>
      )}
      <ImgCrop rotationSlider>
        <Upload
          // beforeUpload={beforeUpload}
          listType="picture-card"
          fileList={imgList}
          onPreview={handlePreview}
          onChange={onChange}
          maxCount={1}
          disabled={isUploading}
        >
          {!isUploading ? (
            imgList.length >= 2 ? null : (
              uploadButton
            )
          ) : (
            <Progress
              type="circle"
              size={80}
              strokeColor="#108ee9"
              percent={imgPerc}
              status="active"
              format={(percent) => (
                <span style={{ color: "#108ee9" }}>{`${percent}%`}</span>
              )}
            />
          )}
        </Upload>
      </ImgCrop>

      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default CustomUpload;
