import React from 'react'
import { AtsignIcon, BriefcaseIcon, BulbIcon, CalenderIcon, DollerIcon, EditPencilIcon, PhoneIcon, TrashIcon } from './assets'
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { deleteEmployeeAsyncThunk } from '@/store/employeeSlice';

const Card = ({ employee }) => {
    const dispatch = useDispatch();

    const {
        name,
        email,
        mobile,
        date_of_joining,
        department,
        designation,
        salary,
        status } = employee;


    const handleDeleteEmployee = async () => {
        const confirmed = confirm("Are you sure you want to delete?");
        if (confirmed) {
            try {
                await dispatch(deleteEmployeeAsyncThunk(employee.id));
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    }
    return (
        <>
            <div className='rounded-lg border  shadow-md bg-gray-800 border-gray-700 w-[420px] py-10'>
                <div className="flex justify-end items-center pr-4">
                    <span className={`w-3 h-3 rounded-full ${status === "active" ? "bg-green-600" : "bg-orange-600"}`} />&nbsp;<span className='text-white/80'>{status}</span>
                </div>
                <div className='flex flex-col justify-center items-center h-full space-y-8'>
                    <div className='flex flex-col items-center'>
                        <div className='w-20 h-20 rounded-full overflow-hidden mb-4'>
                            <img src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="user-profile-img" />
                        </div>
                        <h2 className='text-white font-bold text-xl'>{name}</h2>
                        <p className='text-white/50 text-center'>{designation}</p>
                    </div>

                    <div className="flex flex-col gap-y-3">
                        <div className="grid grid-cols-2 text-white/50">
                            <span className='flex items-center'><AtsignIcon />&nbsp; {email.length > 8 ? email.substring(0, 16) + '...' : email}</span>
                            <span className='flex items-center'>
                                <BulbIcon />&nbsp; emp_{employee?.id}
                            </span>
                            <span className='flex items-center'>
                                <PhoneIcon />&nbsp; {mobile}
                            </span>
                            <span className='flex items-center'>
                                <BriefcaseIcon />&nbsp; {department}
                            </span>
                            <span className='flex items-center'>
                                <CalenderIcon />&nbsp; {date_of_joining}
                            </span>
                            <span className='flex items-center'>
                                <DollerIcon />&nbsp; {salary}
                            </span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className='flex justify-center gap-x-10'>
                        <Link href={`update/${employee?.id}`}>
                            <button
                                className='text-white hover:text-orange-600 border border-white hover:border-orange-600 rounded-xl px-4 py-2 flex justify-center items-center'>
                                <EditPencilIcon />&nbsp; Edit
                            </button></Link>
                        <button
                            onClick={handleDeleteEmployee}
                            className='text-white hover:text-orange-600 border border-white hover:border-orange-600 rounded-xl px-4 py-2 flex justify-center items-center'>
                            <TrashIcon />&nbsp; Delete
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Card