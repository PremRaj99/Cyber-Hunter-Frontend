// import React from 'react';

export default function FreelanceGetStart() {
  return (
    <div>
      <div className="max-w-6xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="block">
            Ready to <span className="text-brandPrimary pl-2">get started?</span>
          </span>
          <span className="block">
            Sign up now and find your perfect 
            <span className="text-brandPrimary pl-2"> freelancer.</span>
          </span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white border-white bg-black hover:bg-brandPrimary hover:text-black hover:border-brandPrimary"
            >
              Sign up for free
            </a>
          </div>
          <div className="ml-3 inline-flex">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black bg-brandPrimary hover:bg-black hover:text-brandPrimary hover:border-brandPrimary"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
