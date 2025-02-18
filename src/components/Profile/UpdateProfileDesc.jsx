import React from 'react';

export default function UpdateProfileDesc() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Update Profile Description</h1>
        <button className="bg-[#F9FAFB] text-[#2D2E2E] px-4 py-2 rounded-md">Cancel</button>
      </div>
      <div className="mt-4">
        <form action="">
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="desc" className="text-sm">Description</label>
              <textarea name="desc" id="desc" className="w-full h-32 p-2 border border-[#E1E8F1] rounded-md" placeholder="Write a short description about yourself"></textarea>
            </div>
            <div>
              <button className="bg-[#FF4E4E] text-white px-4 py-2 rounded-md">Update Description</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
