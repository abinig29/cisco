import React, { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Modal, Progress, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { deleteFile } from "../utils/utils";
import { storage } from "../firbase";
import { FaStarOfLife } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { string } from "yup";
const CustomUpload = ({
  picture,
  video,
  setImg,
  setVideo,
  lable,
  textColor,
  acceptedFile,
}) => {
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
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
    if (!imgList.length)
      if (picture && typeof picture === "string") {
        console.log("hi");
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
  }, []);

  const onChange = ({ fileList: newFileList }) => {
    if (newFileList?.length) {
      setImgList(newFileList);
      acceptedFile
        ? setVideo(newFileList[0].originFileObj)
        : setImg(newFileList[0].originFileObj);
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
          listType="picture-card"
          fileList={imgList}
          onPreview={handlePreview}
          onChange={onChange}
          maxCount={1}
        >
          {imgList.length >= 2 ? null : uploadButton}
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
