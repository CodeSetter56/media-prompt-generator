import ImageUpload from "@/components/ImageUpload";
import { InputForm } from "@/components/InputForm";
import React from "react";

function page() {
  return (
    <>
      <div className="w-1/2 flex h-full">
        <ImageUpload />
      </div>

      <div className="w-1/2 flex h-full">
        <InputForm/>
      </div>
    </>
  );
}

export default page;
