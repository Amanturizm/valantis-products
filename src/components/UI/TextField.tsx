import React from 'react';

interface Props {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler;
  label?: string;
  icon?: React.ReactNode | string;
  placeholder?: string;
}

const TextField: React.FC<Props> = ({ name, value, onChange, label, icon, placeholder }) => {
  return (
    <div className="relative sm:col-span-3 w-full">
      <label className="absolute bottom-full block text-base font-medium leading-6 text-gray-900">
        {label}
      </label>

      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-gray-500 sm:text-base">{icon}</span>
      </div>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block bg-slate-50 w-full rounded-md border-0 py-1.5 pl-7 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-8 outline-0`}
        style={{ paddingLeft: typeof icon === 'string' ? '1.75rem' : '2.25rem' }}
      />
    </div>
  );
};

export default TextField;
