"use client"

import ImageUpload from "@/components/ImageUpload";
import { InputForm } from "@/components/InputForm";
import { MyFile } from "@/types";
import React, { useState } from "react";

function page() {
  const [file,setFile] = useState<MyFile|null>(null)
  return (
    <>
      <div className="w-1/2 flex h-full">
        <ImageUpload file={file} setFile={setFile} />
      </div>

      <div className="w-1/2 flex h-full">
        <InputForm file={file}/>
      </div>
    </>
  );
}

export default page;
