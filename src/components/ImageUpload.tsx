"use client";

import { MyFile } from "@/types";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface imgProps{
  file: MyFile|null,
  setFile: (file: MyFile|null)=>void
}

export default function ImageUpload({file,setFile}:imgProps) {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      const newFile = acceptedFiles[0];
      //temporary url
      const preview = URL.createObjectURL(newFile);
      const img = new Image();
      img.src = preview;

      img.onload = () => {
        const { naturalWidth: width, naturalHeight: height } = img;
        let orientation: "portrait" | "landscape" | "square";

        if (width > height) {
          orientation = "landscape";
        } else if (height > width) {
          orientation = "portrait";
        } else {
          orientation = "square";
        }

        setFile(
          Object.assign(newFile, {
            preview,
            width,
            height,
            orientation,
          })
        );
      };
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  useEffect(() => {
    return () => {
      if (file) {
        // remove preview when new file is added
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  return (
    <div
      {...getRootProps({

        className:
          "w-full h-auto bg-orange-500 flex flex-col cursor-pointer p-8",
      })}
    >
      <div className="flex-grow w-full bg-gray-50 rounded-lg flex flex-col items-center justify-center min-h-0">
        <input {...getInputProps()} />
        {file ? (
          <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden rounded-md">
            <img
              src={file.preview}
              alt={file.name}
              className="block w-full h-full object-contain"
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          </div>
        ) : isDragActive ? (
          <p className="text-gray-600 font-semibold">Drop the image here ...</p>
        ) : (
          <p className="text-gray-600 text-center">
            Drag 'n' drop an image here, or click to select one
          </p>
        )}
      </div>
    </div>
  );
}
