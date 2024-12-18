// import React from 'react';

export default function Button({ type, onClick, children, disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-md  bg-cyan-400 py-2 text-black font-semibold hover:bg-black transition duration-300 hover:border-2 hover:border-brandPrimary hover:text-brandPrimary"
    >
      {children}
    </button>
  );
}
