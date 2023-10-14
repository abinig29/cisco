import React, { useState } from "react";
import {
  useGetRegistreesQuery,
  useUpdateRegistreeMutation,
} from "../registreeApiSlice";
import { useParams } from "react-router-dom";
import Modal from "../../../components/modal";
import { Oval } from "react-loader-spinner";
import { NotFound } from "../../../components/notFound";
import { registreeType } from "../../../utils/utils";
import ImageModal from "../../../components/imageModal";

const RegistreeviewPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetRegistreesQuery();
  const registree = data?.registree.find((registree) => registree._id === id);
  console.log(data);
  if (isLoading) {
    return (
      <div className="grid place-content-center  h-screen">
        <Oval
          height={60}
          width={60}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }
  return registree ? <RegistreeView registree={registree} /> : <NotFound />;
};

export default RegistreeviewPage;

const RegistreeView = ({ registree, course }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [confirmed, setConfirmed] = useState(registree.status);
  const [updateRegistree, { data }] = useUpdateRegistreeMutation();
  const registreeDefined = registreeType.find(
    (r) => r.key === registree.registreeType
  )["value"];
  const handleChange = async () => {
    try {
      setConfirmed((pre) => !pre);
      await updateRegistree({
        data: { status: !confirmed },
        id: registree._id,
      });
    } catch (error) {
      setConfirmed((pre) => !pre);
    }
  };
  return (
    <div className="mt-16 mx-6">
      <div className="flex flex-col md:flex-row gap-4 mb-2 ">
        <div className="flex-1 md:mt-3 ">
          <div className="flex gap-4">
            <div className="flex-1">
              <img
                className="w-full cursor-pointer "
                onClick={() => {
                  setOpenModal(true);
                }}
                src={registree.picture}
                alt=""
              />
            </div>
            <div className="flex-1">
              <img
                className="w-full cursor-pointer flex-1"
                onClick={() => {
                  setOpenModal2(true);
                }}
                src={registree.personalPicture}
                alt=""
              />
            </div>
          </div>

          <h5 className="text-sm text-gray-500">
            click on the image to enlarge it
          </h5>
          <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 mt-4">
            <input
              checked={confirmed}
              onChange={handleChange}
              id="bordered-checkbox-2"
              type="checkbox"
              value=""
              name="bordered-checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="bordered-checkbox-2"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Confirm payment
            </label>
          </div>
        </div>
        <div className="flex flex-col flex-1 text-white space-y-2   shadow w-full">
          <div className="">
            <h3>Status</h3>
            <h3 className="bg-gray-700 p-2 rounded">
              {registree.status ? (
                <span className="text-green-400">confirmed</span>
              ) : (
                <span className="text-red-400">pending</span>
              )}
            </h3>
          </div>
          <div className="">
            <h3>Full name</h3>
            <h3 className="bg-gray-700 p-2 rounded">
              {registree.firstName + " " + registree.lastName}
            </h3>
          </div>
          <div className="">
            <h3>Email</h3>
            <h3 className="bg-gray-700 p-2 rounded">{registree.email}</h3>
          </div>
          <div className="">
            <h3>Phone number</h3>
            <h3 className="bg-gray-700 p-2 rounded">{registree.phoneNumber}</h3>
          </div>
          <div className="">
            <h3>Gender</h3>
            <h3 className="bg-gray-700 p-2 rounded">{registree.gender}</h3>
          </div>
          <div className="">
            <h3>Registree type</h3>
            <h3 className="bg-gray-700 p-2 rounded">{registreeDefined}</h3>
          </div>
          <div className="">
            <h3>Registrered program</h3>
            <h3 className="bg-gray-700 p-2 rounded">{registree.program}</h3>
          </div>
          <div className="">
            <h3>Course</h3>
            <h3 className="bg-gray-700 p-2 rounded">
              {registree.course?.courseName}
            </h3>
          </div>
        </div>
      </div>

      <ImageModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        picture={registree.picture}
      />
      <ImageModal
        openModal={openModal2}
        setOpenModal={setOpenModal2}
        picture={registree.personalPicture}
      />
    </div>
  );
};
