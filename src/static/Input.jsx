import React from 'react'

const Input = ({ id, type, label, placeholder, value, onChange,error }) => {
    return (
        <>
            <div className='flex flex-col w-full py-4'>
                <label htmlFor={id} className='text-white font-semibold mb-2'>
                    {label}
                </label>
                <input
                    type={type}
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className='pl-2 rounded-md py-4' />
                  {error && <p className="text-red-600">{error}</p>}
            </div>
        </>
    )
}

export default Input;