"use client"

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeDataAsyncThunk } from "@/store/employeeSlice";
import CreateUserCard from "@/components/CreateUserCard";
import { useParams } from 'next/navigation'

export default function Home() {
    const dispatch = useDispatch();
    const router = useParams();
    const { id } = router;

    const employee = useSelector((state) =>
        state.employee.employeesData.find((emp) => emp.id === id)
    );

    useEffect(() => {
        dispatch(fetchEmployeeDataAsyncThunk());
    }, [dispatch,id]);

    return (
        <div className="bg-gray-600 py-20">
            <CreateUserCard employee={employee} mode="update"/>
        </div>
    );
}

