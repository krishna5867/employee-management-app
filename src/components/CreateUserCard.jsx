"use client"

import React, { useState, useEffect } from 'react';
import { Input, InputDropdown } from '@/static/index';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployeeAsyncThunk, updateEmployeeAsyncThunk } from "@/store/employeeSlice";

const CreateUserCard = ({ mode, employee }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.employee.isLoading);
    const isError = useSelector((state) => state.employee.isError);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        date_of_joining: "",
        department: "",
        designation: "",
        salary: "",
        status: "in-active",
        errors: {}
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            errors: {
                ...prevState.errors,
                [name]: '',
            }
        }));
    };

    const validateFormData = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = "Email is not valid";
        }
        if (formData.mobile.length !== 10) {
            errors.mobile = "Mobile number must be 10 digits";
        }
        if (!formData.date_of_joining) {
            errors.date_of_joining = "Date of joining is required";
        }
        if (!formData.department) {
            errors.department = "Department is required";
        }
        if (!formData.designation) {
            errors.designation = "Designation is required";
        }
        if (!formData.salary) {
            errors.salary = "Salary is required";
        }
        return errors;
    };

    const handleSubmit = async () => {
        const errors = validateFormData();

        if (Object.keys(errors).length > 0) {
            setFormData(prevState => ({
                ...prevState,
                errors: {
                    ...prevState.errors,
                    ...errors,
                }
            }));
            return;
        }

        try {
            if (mode === 'create') {
                await dispatch(createEmployeeAsyncThunk(formData));
            } else if (mode === 'update') {
                await dispatch(updateEmployeeAsyncThunk(formData));
            }
            setFormData({
                name: "",
                email: "",
                mobile: "",
                date_of_joining: "",
                department: "",
                designation: "",
                salary: "",
                status: "in-active",
                errors: {}
            });
        } catch (error) {
            console.error('Error creating/updating employee:', error);
        }
    };

    const handleRadio = (e) => {
        const status = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            status: status,
        }));
    };

    useEffect(() => {
        if (employee) {
            setFormData(employee);
        }
    }, [employee]);

    return (
        <div className='relative'>
            {isLoading || isError ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-black p-4 rounded-lg">
                    {isLoading && <p className="text-white">Loading...</p>}
                    {isError && <p className="text-red-600">Error: {isError}</p>}
                </div>
            </div>
            ): null}

            <div className='max-w-6xl mx-auto w-full'>
                <div className="flex justify-between items-center bg-black p-4">
                    <h2 className='text-white font-bold text-xl'>{mode === 'create' ? 'New Employee Details' : 'Update Employee Details'}</h2>
                    <button className='text-white hover:text-orange-600 border bg-orange-600 hover:bg-transparent border-orange-600 rounded-xl px-4 py-2 flex justify-center items-center'
                        onClick={handleSubmit}>
                        {mode === 'create' ? 'Add Employee' : 'Update Employee'}
                    </button>
                </div>
                <div className='bg-[#181818] px-10 grid md:grid-cols-2 gap-x-10 pt-6 pb-16'>
                    <Input
                        label="Full Name"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        error={formData?.errors?.name}
                    />
                    <Input
                        label="Email Address"
                        id="email"
                        type="text"
                        name="email"
                        placeholder="Enter Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        error={formData?.errors?.email}
                    />
                    <Input
                        label="Mobile No"
                        id="mobile"
                        type="number"
                        name="mobile"
                        placeholder="Enter Mobile Number"
                        value={formData.mobile}
                        onChange={handleChange}
                        error={formData?.errors?.mobile}
                    />
                    <Input
                        label="Date of Joining"
                        id="date_of_joining"
                        type="date"
                        name="date_of_joining"
                        placeholder=""
                        value={formData.date_of_joining}
                        onChange={handleChange}
                        error={formData?.errors?.date_of_joining}
                    />
                    <InputDropdown
                        formData={formData}
                        setFormData={setFormData}
                        error={formData?.errors?.department}
                    />
                    <Input
                        label="Salary"
                        id="salary"
                        type="number"
                        name="salary"
                        placeholder="Enter Salary"
                        value={formData.salary}
                        onChange={handleChange}
                        error={formData?.errors?.salary}
                    />
                    <div className='flex flex-col w-full py-4 justify-center'>
                        <p className='text-white font-semibold mb-2'>Status</p>
                        <div className='flex text-white items-center gap-x-6'>
                            <div className='space-x-2 flex items-center'>
                                <input type="radio" id="active" name="status" value="active" checked={formData.status === 'active'} onChange={handleRadio} />
                                <label htmlFor="active">Active</label>
                            </div>
                            <div className='space-x-2 flex items-center'>
                                <input type="radio" id="in_active" name="status" value="in-active" checked={formData.status === 'in-active'} onChange={handleRadio} />
                                <label htmlFor="in_active">In-active</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateUserCard;
