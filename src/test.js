"use client"

import React, { useState } from 'react';

const data = [
    {
        department: "Marketing",
        designation: ['SEO Specialist', 'Marketing', 'Executive Manager']
    },
    {
        department: "Sales",
        designation: ['Manager', 'Team Lead', 'Sales Executive']
    },
    {
        department: "Human Resources",
        designation: ['HR Executive', 'HR Assistant', 'Trainee HR']
    },
    {
        department: "Information",
        designation: [
            "Frontend Engineer",
            "Backend Developer",
            "Full Stack Developer",
            "Operations",
            "UI/UX Designer",
            "Senior Frontend Developer",
            "Senior Backend Developer",
            "Manager"
        ]
    },
    {
        department: "Accounts",
        designation: ["Senior Accountant", "Accountant", "CA"]
    },
    {
        department: "Operations",
        designation: ["Operations Manager", "Operations Executive", "Operations Analyst"]
    }
];

const InputDropdown = ({formData, setFormData}) => {
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [designationOptions, setDesignationOptions] = useState([]);

    const handleDepartmentChange = (e) => {
        const department = e.target.value;
        setSelectedDepartment(department);
        const selectedData = data.find(item => item.department === department);
        if (selectedData) {
            setDesignationOptions(selectedData.designation);
        } else {
            setDesignationOptions([]);
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-4"
                    onChange={handleDepartmentChange}
                >
                    <option value="">Select Department</option>
                    {data.map((item, index) => (
                        <option key={index} value={item.department}>
                            {item.department}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex flex-col w-full py-4'>
                <label className='text-white font-semibold mb-2'>
                    Designation
                </label>
                <select
                    id="designation"
                    name="designation"
                    disabled={!selectedDepartment}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-4"
                >
                    {/* <option value=""></option> */}
                    {designationOptions.map((designation, index) => (
                        <option key={index} value={designation}>
                            {designation}
                        </option>
                    ))}
                </select>

                
// const [formData, setFormData] = useState({
    //     name: "",
    //     email: "",
    //     mobile: "",
    //     date_of_joining: "",
    //     department: "",
    //     designation: "",
    //     salary: "",
    //     status: "in-active",
    //     errors: {} 
    // })
    

    // const handleChanege = (e) => {
    //     const { name, value } = e.target;

    //     setFormData(prev => ({
    //         ...prev, [name]: value,
    //         errors: {
    //             ...prev.errors,
    //             [name]: ""
    //         }
    //     }))

    // };

    // const handleSubmit = async () => {
    //     const errors = validateFormData();
    //     // setFormData(prev => ({ ...prev, errors }));
    //     dispatch(setFormErrors(errors));

    //     if (Object.keys(errors).length === 0) {
    //         console.log(formData);
    //         try {
    //             const res = await axios.post(API_URL, formData);
    //             if (res.status === 201) {
    //                 console.log("Employee created successfully:", res.data);
    //             } else {
    //                 console.error("Failed to create employee:", res.statusText);
    //             }
    //         } catch (error) {
    //             console.error("Error creating employee:", error);
    //         }

    //     }
    // };

            </div>
        </>
    );
};

export default InputDropdown;

