// import React from 'react';
import { useParams } from "react-router-dom";

export default function ServiceItem() {
  const { id } = useParams();
  return (
    <div className="text-xl font-bold text-brandPrimary text-center m-10">
      Welcome to Our Service {id}
    </div>
  );
}
