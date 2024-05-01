"use client"

import React, {useState} from 'react'
import { SearchIcon } from './assets';
import { useDispatch, useSelector } from 'react-redux';
import { searchEmployee } from '@/store/employeeSlice'; 

const SearchBox = () => {
    const [inpValue, setInpValue] = useState('');
    const dispatch = useDispatch();
    const employeesData = useSelector((state) => state.employee.employeesData);

    const handleInput = (e) => {
        const searchValue = e.target.value;
        setInpValue(searchValue);

        const filteredEmployees = employeesData.filter((employee) =>
            employee.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        dispatch(searchEmployee(filteredEmployees));
    };

    return (
        <>
            <div className='relative hidden md:block'>
              <div className='absolute top-[50%] translate-y-[-50%] left-1'>
              <SearchIcon />
              </div>
                <input type="text" value={inpValue} onChange={handleInput} placeholder='Search By Employee Name...' className='pl-6 rounded-md py-2 w-full' />
            </div>

        </>
    )
}

export default SearchBox