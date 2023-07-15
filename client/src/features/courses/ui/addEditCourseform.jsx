import { useDropzone } from 'react-dropzone';
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendar2DateFill } from 'react-icons/bs'
import { FiUploadCloud } from 'react-icons/fi'
import { useFormik } from 'formik';
import { courseSchema } from '../schema';
import { FaStarOfLife } from 'react-icons/fa'
import { useCreateCourseMutation, useUpdateCourseMutation } from '../courseApiSillce';
import { useNavigate, } from 'react-router-dom';



const AddCreateCourseForm = ({ update, course }) => {

    const navigate = useNavigate()
    const [createCourse, { isError, error, isSuccess, isLoading }] = useCreateCourseMutation()
    const [updateCourse, { isError: isUpdateError, error: updateError, isSuccess: isUpdateSuccess, isLoading: isUpdateLoading }] = useUpdateCourseMutation()
    useEffect(() => {
        if (isSuccess || isUpdateSuccess) {
            navigate('/dash/courses', { replace: true })
        }
    }, [isSuccess, navigate])





    // Topics
    const tempTopic = []
    course?.topics.forEach(topic => {
        if (course?.coverdTopics.includes(topic)) return tempTopic.push({ lable: topic, isChecked: true })
        tempTopic.push({ lable: topic, isChecked: false })
    })
    const [topics, setTopics] = useState(update ? tempTopic : [])
    const [topic, setTopic] = useState({
        value: '',
        error: "Topic cant be null",
        isError: false
    })
    const handleTopic = () => {
        if (!topic.value) {
            return setTopic(pre => ({ ...pre, isError: true }))
        }
        setTopics(pre => [...pre, { lable: topic.value, isChecked: false }])
        setTopic(pre => ({
            ...pre, value: "", isError: false
        }))
    }
    const handleCoverdTopic = (e) => {
        const value = e.target.value
        const updatedTopics = topics.map(topic => {
            if (topic.lable === value) {
                topic.isChecked = !topic.isChecked
            }
            return topic
        })
        setTopics(updatedTopics)
    }
    // Topics



    // lecture
    const lectures = [{ id: '64ad59bc46396f00fa9f681c', name: 'abel' }, { id: "64ad59bc46396f00fa9f681d", name: "dese" }]
    const options = lectures.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.name}</option >
        )
    })
    const handleLectureChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        formik.setFieldValue('lecture', selectedOptions);
    };
    // lecture


    const onSubmit = async (values, { resetForm }) => {
        const course = new FormData();
        for (let value in values) {
            course.append(value, values[value])
        }
        if (update) {
            if (!values.endDate) {
                course.delete('endDate');
                course.append(endDate, course.endDate)

            }
            if (!values.picture) {
                course.delete('picture');
                course.append(picture, course.picture)
            }

        }
        const coverdTopics = topics.filter(topic => topic.isChecked)
        const topicsLable = []
        topics.forEach(topic => topicsLable.push(topic.lable))
        const coverdTopicsLable = []

        coverdTopics.forEach(topic => coverdTopicsLable.push(topic.lable))
        course.append('topics', topicsLable)
        course.append('coverdTopics', coverdTopicsLable)



        try {
            if (update) {
                await updateCourse(course, course.id).unwrap()
            }
            else {
                await createCourse(course).unwrap()
            }

        } catch (error) {

        }

    }

    const initialValues = {
        courseName: update ? course?.courseName : "",
        courseCode: update ? course?.courseCode : "",
        endDate: null,
        picture: "",
        shortDescription: update ? course?.shortDescription : "",
        description: update ? course?.description : "",
        lecture: update ? course?.lecture : [],
    }
    const { touched, errors, values, setFieldValue, handleSubmit, getFieldProps } = useFormik({
        initialValues,
        validationSchema: courseSchema,
        onSubmit
    });

    const onDrop = acceptedFiles => {
        if (acceptedFiles?.length) {
            acceptedFiles.map(file => setFieldValue("picture", file))
        }
    }
    const { isDragActive, getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <form onSubmit={handleSubmit} >

            <div className='flex flex-col md:flex-row  gap-10 mx-10 mt-[50px]'>
                <div className='flex-1'>

                    <button type="submit" class="py-2.5 px-5 mr-2 text-sm font-medium  rounded-lg cursor-pointer mb-2 focus:z-10 focus:ring-2  bg-[#312964]  text-white inline-flex items-center">
                        {
                            isLoading || isUpdateLoading ? <>
                                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600 " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                </svg>
                                <h3>Loading...</h3>
                            </> : update ? "Update course" : "Create course"
                        }
                    </button>

                    <div className="mb-4">
                        <label for="courseName" className="block mb-2 text-sm font-medium  text-white">Course name <span>{<FaStarOfLife className=' text-red-900 text-[10px] inline ml-1' />}</span></label>
                        <input
                            type="text"
                            {...getFieldProps('courseName')} id="courseName" className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white " placeholder="Cisco Certified Network Associate" />
                        {touched.courseName && errors.courseName && <p className="text-sm text-red-600 dark:text-red-500">{errors.courseName}</p>}
                    </div>
                    <div className='mb-4'>
                        <label for="courseCode" className="block mb-2 text-sm font-medium  text-white">Course code <span>{<FaStarOfLife className=' text-red-900 text-[10px] inline ml-1' />}</span></label>
                        <input
                            type="text"
                            {...getFieldProps('courseCode')}
                            id="courseCode" className=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 text-white" placeholder="Bonnie Green" />

                        {touched.courseCode && errors.courseCode && <p className="text-sm text-red-600 dark:text-red-500">{errors.courseCode}</p>}

                    </div>
                    <div>
                        <label for="shortDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short description</label>
                        <textarea id="shortDescription"
                            {...getFieldProps('shortDescription')}
                            rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                        {touched.shortDescription && errors.shortDescription && <p className="text-sm text-red-600 dark:text-red-500">{errors.shortDescription}</p>}

                    </div>
                    <div>
                        <label for="description" className="block my-3 text-sm font-medium text-gray-900 dark:text-white">Course full description</label>
                        <textarea id="description"
                            {...getFieldProps('description')}
                            rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                        {touched.description && errors.description && <p className="text-sm text-red-600 dark:text-red-500">{errors.description}</p>}

                    </div>

                    <div {...getRootProps({
                        className: "w-full border-dashed border mt-4 cursor-pointer mb-4 h-[110px] text-white flex flex-col items-center justify-center"
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
                </div>
                <div className='flex-1 '>
                    <button class="py-2.5 px-5 mr-2 text-sm font-medium  rounded-lg cursor-pointer mb-2   items-center opacity-0">create course</button>
                    <label className="block mb-2 text-sm font-medium  text-white">Select end date <span>{<FaStarOfLife className=' text-red-900 text-[10px] inline ml-1' />}</span></label>
                    <div className='mb-2 inline-flex rounded bg-gray-700  text-white items-center gap-3 border border-gray-600'>
                        <BsCalendar2DateFill className='text-[30px] mx-2' />
                        <DatePicker
                            onChange={(date) => setFieldValue('endDate', date)}
                            selected={values.endDate}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select a date"
                            className=" p-2 bg-transparent focus:outline-none focus:ring-0"
                        />
                    </div>
                    {touched.endDate && errors.endDate && <p className="text-sm text-red-600 dark:text-red-500 mb-2">{errors.endDate}</p>}

                    <div className='w-[31vw]'>
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Lectures<span>{<FaStarOfLife className=' text-red-900 text-[10px] inline ml-2' />}</span></label>
                        <select id="countries" multiple onChange={handleLectureChange} {...getFieldProps('lecture')} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {options}
                        </select>
                        {touched.lecture && errors.lecture && (
                            <div className="text-sm text-red-600 dark:text-red-500 mb-2">{errors.lecture}</div>
                        )}
                    </div>

                    <div className='flex items-start flex-col   w-full mb-3 '>

                        <label for="username-success" className="block my-2 text-sm font-medium  text-white">Add course topic</label>
                        <div className='inline-flex items-center w-full gap-[20px]'>
                            <input type="text" id="username-success" value={topic.value} onChange={(e) => setTopic(pre => ({ ...pre, isError: false, value: e.target.value }))} className=" border text-sm flex-[4] rounded-lg  block  p-2.5 bg-gray-700 border-gray-600 text-white " placeholder="Bonnie Green" />
                            <button type='button' className='bg-[#432830] text-white px-4 rounded py-2 ' onClick={handleTopic} >Add topic</button>
                        </div>
                        {topic.isError && <p className="text-sm text-red-600 dark:text-red-500">{topic.error}</p>}

                    </div>
                    {
                        topics.map(topic => {
                            return (

                                <div class="flex items-center h-10 pl-4 border border-gray-200 rounded dark:border-gray-700 mb-4">
                                    <input id="bordered-checkbox-1" value={topic.lable} onChange={(e) => handleCoverdTopic(e)} type="checkbox" checked={topic.isChecked} name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="bordered-checkbox-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{topic.lable}</label>
                                </div>

                            )
                        })
                    }


                </div>


            </div>
        </form>


    )
}

export default AddCreateCourseForm