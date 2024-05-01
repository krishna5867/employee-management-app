"use client"

import React, { useState, useEffect } from 'react';
import { data } from "@/constant"


const InputDropdown = ({ formData, setFormData, error }) => {
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [designationOptions, setDesignationOptions] = useState([]);

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            department: selectedDepartment,
            designation: "",
            errors: {
                ...prevState.errors,
                department: "", 
            }
        }));
    }, [selectedDepartment, setFormData]);

    const handleDepartmentChange = (e) => {
        const department = e.target.value;
        setSelectedDepartment(department);
        const selectedData = data.find(item => item.department === department);
        if (selectedData && selectedData.designation) {
            setDesignationOptions(selectedData.designation);
        } else {
            setDesignationOptions([]);
        }
    };

    const handleDesignationChange = (e) => {
        const designation = e.target.value;
        if (typeof setFormData === 'function') {
        setFormData(prevState => ({
            ...prevState,
            designation: designation
        }));
    }
    };

    return (
        <>
            <div className='flex flex-col w-full py-4'>
                <label className='text-white font-semibold mb-2'>
                    Department
                </label>
                <select
                    id="department"
                    name="department"
                    value={selectedDepartment}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-4"
                    onChange={handleDepartmentChange}
                >
                    <option>Select Department</option>
                    {data.map((item, index) => (
                        <option key={index} value={item.department}>
                            {item.department}
                        </option>
                    ))}
                </select>
                {error && <p className="text-red-600">{error}</p>}
            </div>
            <div className='flex flex-col w-full py-4'>
                <label className='text-white font-semibold mb-2'>
                    Designation
                </label>
                <select
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-4 ${selectedDepartment ? '' : 'pointer-events-none'}`}
                    // disabled={!selectedDepartment}
                    onChange={handleDesignationChange}
                >
                    <option value="">Select Designation</option>
                    {selectedDepartment &&
                        designationOptions.map((designation, index) => (
                            <option key={index} value={designation}>
                                {designation}
                            </option>
                        ))}
                </select>
            </div>
        </>
    );
};

export default InputDropdown;

