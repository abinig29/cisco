import React, { useState } from 'react'

import { selectIds, useGetUsersQuery } from '../userApiSlice.js'
import { useSelector } from 'react-redux'
import UserRow from './userRow.jsx'
import { useNavigate } from 'react-router-dom'

const UsersList = () => {
    const { data: users, isLoading, isError, error, isSuccess } = useGetUsersQuery({
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const allUsersIds = useSelector(selectIds)
    const navigate = useNavigate()
    if (isError) {
        return (
            <h3>{error?.data?.message}</h3>
        )
    }
    if (isLoading) {
        return (
            <h3>Loading</h3>
        )
    }



    return (
        <div>

            <div className='px-10 py-6 flex justify-between '>
                <h1 className='font-bold font-poppins text-4xl text-white'>Courses</h1>
                <button onClick={() => navigate("create",)} className='px-6 bg-[#312964] text-white font-bold text-md py-2 rounded-lg'>Add New Course</button>
            </div>

            <div className="relative overflow-x-auto  ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-[#312964] ">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                profile
                            </th>
                            <th scope="col" className="px-6 py-3">
                                user Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsersIds.map(id => {
                                return (<UserRow key={id} userId={id} />)
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default UsersList