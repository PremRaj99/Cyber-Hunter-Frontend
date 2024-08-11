import React, { useState } from "react";
import MultiSelectInput from "../components/MultiSelectInput";

export default function Home() {
  const [formData, setformData] = useState([])
  // console.log(formData)
  return (
    <div className="min-h-[calc(100vh-64px)] bg-black">
      Home
      {/* <MultiSelectInput fieldName="Interest" apiEndpoint={`/api/tag`} onTagsChange={setformData}/> */}
    </div>
  );
}
