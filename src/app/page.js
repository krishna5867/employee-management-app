"use client"

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@/components/Card";
import { fetchEmployeeDataAsyncThunk } from "@/store/employeeSlice";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const employeesData = useSelector((state) => state?.employee?.employeesData);
  const searchEmployee = useSelector((state) => state.employee.searchEmployee);
  const isLoading = useSelector((state) => state.employee.isLoading);

  const filteredEmployees = searchEmployee?.length > 0 ? searchEmployee : employeesData.filter((employee) =>
    employee?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchEmployeeDataAsyncThunk());
  }, [dispatch]);
  return (
    <div className="bg-gray-600 min-h-screen py-20 flex justify-center">
    {isLoading ? (
      <p className="text-white text-xl font-semibold">Loading...</p>
    ) : (
      <div className="flex flex-wrap justify-center gap-20">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} employee={employee} />
        ))}
      </div>
    )}
  </div>
  );
}


