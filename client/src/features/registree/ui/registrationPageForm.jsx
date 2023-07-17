import React, { useCallback, useEffect, useState } from 'react'
import registreeSchema from '../schema'
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { FiUploadCloud } from 'react-icons/fi';
import { FaStarOfLife } from 'react-icons/fa';
import Header from '../../../components/header';
import { useCreateRegistreeMutation } from '../registreeApiSlice';
import { useNavigate } from 'react-router-dom';
const RegistrationPageForm = ({ courses, selectedCourse }) => {
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        picture: "",
        course: selectedCourse ? selectedCourse.id : courses?.length && courses[0].id,
        phoneNumber: ''

    }
    const navigate = useNavigate()
    const [createRegistree, { isError, error, isSuccess, isLoading }] = useCreateRegistreeMutation()

    const [files, setFiles] = useState([])






    useEffect(() => {

        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])

    const onSubmit = async (values, { resetForm }) => {

        const selectedcourseId = values.course
        const selectedCourse = courses.find(course => course.id === selectedcourseId).courseName

        const userData = new FormData();
        for (let value in values) {
            userData.append(value, values[value])
        }
        try {
            const { _id: id } = await createRegistree(userData).unwrap()
            const data = { course: selectedCourse, isRegisterd: true }
            navigate(`/${id}/sucessfull`, { replace: true, state: data })
            resetForm()

        } catch (error) {

        }

    }
    const options = courses.map(course => {
        return (
            <option className='text-black'
                key={course.id}
                value={course.id}
            > {course.courseName}</option >
        )
    })

    const { touched, errors, values, setFieldValue, handleSubmit, getFieldProps } = useFormik({
        initialValues,
        validationSchema: registreeSchema,
        onSubmit
    });



    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ])
            acceptedFiles.map(file => setFieldValue("picture", file))
        }
    })
    const removeFile = name => {
        setFiles(files => files.filter(file => file.name !== name))
        setFieldValue("picture", "")

    }
    const { isDragActive, getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
        <main className='bg-slate-100 min-h-screen'>
            <Header />

            <div className='flex justify-center mt-14'>
                <form onSubmit={handleSubmit} >
                    <div className='w-[70vw] flex gap-6 flex-col md:flex-row'>
                        <div className='flex-1'>
                            <div className="mb-4">
                                <label for="firstName" className="block mb-2 text-sm font-medium  text-black">First name <span>{<FaStarOfLife className=' text-red-900 text-[10px] inline ml-1' />}</span></label>
                                <input
                                    type="text"
                                    {...getFieldProps('firstName')} id="firstName" className=" border text-sm   block w-full p-2.5  border-gray-600 " placeholder="Abel" />
                                {touched.firstName && errors.firstName && <p className="text-sm text-red-600 dark:text-red-500">{errors.firstName}</p>}
                            </div>
                            <div className='mb-4'>
                                <label for="lastName" className="block mb-2 text-sm font-medium  ">Last name<span>{<FaStarOfLife className=' text-red-900 text-[10px] inline ml-1' />}</span></label>
                                <input
                                    type="text"
                                    {...getFieldProps('lastName')}
                                    id="lastName" className=" border  text-sm   block w-full p-2.5  border-gray-600 text-black" placeholder="Green" />

                                {touched.lastName && errors.lastName && <p className="text-sm text-red-600 dark:text-red-500">{errors.lastName}</p>}
                            </div>



                            <div className='mb-4'>
                                <label for="email" className="block mb-2 text-sm font-medium  ">Email<span>{<FaStarOfLife className=' text-red-900 text-[10px] inline ml-1' />}</span></label>
                                <input
                                    type="text"
                                    {...getFieldProps('email')}
                                    id="email" className=" border  text-sm   block w-full p-2.5  border-gray-600 " placeholder="abelnigus@gmail.com" />

                                {touched.email && errors.email && <p className="text-sm text-red-600 dark:text-red-500">{errors.email}</p>}

                            </div>
                            <div className='mb-4'>
                                <label for="phoneNumber" className="block mb-2 text-sm font-medium  ">Phone number<span>{<FaStarOfLife className=' text-red-900 text-[10px] inline ml-1' />}</span></label>
                                <input
                                    type="text"
                                    {...getFieldProps('phoneNumber')}
                                    id="phoneNumber" className=" border  text-sm   block w-full p-2.5  border-gray-600 text-black" placeholder='0911931818' />

                                {touched.phoneNumber && errors.phoneNumber && <p className="text-sm text-red-600 dark:text-red-500">{errors.phoneNumber}</p>}
                            </div>
                            <div className='mb-4'>
                                <label for="course" class="block mb-2 text-sm font-medium text-gray-900 ">Select course<span>{<FaStarOfLife className=' text-red-900 text-[10px] inline ml-2' />}</span></label>
                                <select id="course"{...getFieldProps('course')} class="bg-gray-50 border border-gray-300 text-black text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark: dark:border-gray-600 dark:placeholder-black placeholder:text-gray-500">
                                    {options}
                                </select>
                                {touched.course && errors.course && (
                                    <div className="text-sm text-red-600 dark:text-red-500 mb-2">{errors.course}</div>
                                )}
                            </div>
                        </div>
                        <div className='flex-1 mt-2'>
                            {
                                !files.length &&
                                <div>
                                    <div {...getRootProps({
                                        className: "w-full border-dashed border-gray-500 border mt-4 cursor-pointer mb-4 h-[380px] text-black flex flex-col items-center justify-center"
                                    })}>
                                        <input {...getInputProps()} />
                                        {values.picture ? <>{values.picture.name}</> :
                                            isDragActive ? <>Draging.... </> :
                                                <div className=' py-3 flex flex-col items-center'>
                                                    <FiUploadCloud className='text-[40px]' />
                                                    <h3>Drag and drop to upload</h3>
                                                    <h5>or browse</h5>
                                                </div>}

                                    </div>
                                    {touched.picture && errors.picture && (
                                        <div className="text-sm text-red-600 dark:text-red-500 mb-2">{errors.picture}</div>
                                    )}
                                </div>



                            }

                            {files.map(file => (
                                <div key={file.name} className='relative h-[385px] flex-1 bg-red-400 mt-4'>
                                    <img
                                        src={file.preview}
                                        alt={file.name}
                                        width={100}
                                        height={100}
                                        onLoad={() => {
                                            URL.revokeObjectURL(file.preview)
                                        }}
                                        className='h-full w-full object-cover '
                                    />
                                    <button
                                        type='button'
                                        className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full grid place-content-center absolute bg-black text-white hover:text-black -top-3 -right-3 hover:bg-white transition-colors'
                                        onClick={() => removeFile(file.name)}
                                    >
                                        x
                                    </button>

                                </div>
                            ))}
                            <button type="submit" class="py-2.5 px-5  text-sm font-medium  rounded-lg cursor-pointer my-2 focus:z-10 focus:ring-2  bg-[#312964]  text-white inline-flex items-center">
                                {
                                    isLoading ?
                                        <>
                                            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                            </svg>
                                            <h3>Loading...</h3>
                                        </> :

                                        "Register"
                                }
                            </button>


                        </div>
                    </div>
                </form>
            </div>

        </main >

    )
}

export default RegistrationPageForm