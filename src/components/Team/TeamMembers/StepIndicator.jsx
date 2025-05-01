/* eslint-disable react/prop-types */
import React from 'react';
import { Check } from 'lucide-react';

const StepIndicator = ({ currentStep }) => {
  return (
    <div className="flex items-center mb-8">
      {[1, 2, 3].map((number) => (
        <React.Fragment key={number}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= number ? 'bg-cyan-400 text-black' : 'bg-gray-800 text-gray-400'
              } ${currentStep === number ? 'ring-4 ring-cyan-400/20' : ''}`}
          >
            {currentStep > number ? <Check size={16} /> : number}
          </div>
          {number < 3 && (
            <div
              className={`flex-1 h-1 mx-2 rounded ${currentStep > number ? 'bg-cyan-400' : 'bg-gray-800'
                }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
