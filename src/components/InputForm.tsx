"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SocialToggleButton } from "./SocialToggleButton";
import { socialButtonsConfig } from "@/lib/utils/socialPlatforms";
import { formSchema } from "@/lib/schema/formSchema";
import { useGenerationStore } from "@/store/generationStore";



// form validation schema 

interface fileProp{
  file:File|null
}

export function InputForm({file}:fileProp) {
  const { generate, isLoading, error } = useGenerationStore();
  const [socialToggles, setSocialToggles] = useState({
    // socialbuttonconfig id
    instagram: false,
    facebook: false,
    twitter: false,
  });

  // react hook form 
  const form = useForm<z.infer<typeof formSchema>>({
    // connect zod to the form using 
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      context: "",
    },
  });

  const handleSocialToggle = (id: keyof typeof socialToggles) => {
    setSocialToggles((prevState) => ({
      ...prevState, 
      [id]: !prevState[id], // Flip state of toggled button
    }));
  };

  const handleContextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: { onChange: (value: string) => void; value?: string }
  ) => {
    const value = e.target.value; 
    const lines = value.split("\n"); // split text into array
    const correctedLines = lines
    // add > if line not started with >
      .map((line, index) => {
        if (!line.startsWith("> ")) {
          return "> " + line;
        }
        return line;
      })
      .join("\n");
    // call onChange if only the text changes
    if (correctedLines !== field.value) {
      field.onChange(correctedLines); // Update form state 
    }
  };
  
  async function formSubmit(values: z.infer<typeof formSchema>) {
    if (!file) {
      alert("Please upload an image first!");
      return;
    }
    console.log("Image File:", file);
    console.log("Form Values:", values);
    console.log("Social Platforms:", socialToggles);
    await generate({ file, values, socialToggles });
  }
 
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formSubmit)}
        className="w-full space-y-8 md:p-8"
      >
        <FormField
          control={form.control} 
          name="title" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="context"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Context</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Talk about how you feel about the picture"
                  className="resize-none h-38"
                  {...field} 
                  onFocus={(e) => {
                    if (e.target.value === "") {
                      field.onChange("> ");
                    }
                  }}
                  onChange={(e) => handleContextChange(e, field)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Select sites </FormLabel>
          <FormControl>
            <div className="flex space-x-2">
              {/* render buttons */}
              {socialButtonsConfig.map((button) => (
                <SocialToggleButton
                  key={button.id} 
                  label={button.label}
                  icon={button.icon}
                  activeColor={button.activeColor}
                  isToggled={
                    socialToggles[button.id as keyof typeof socialToggles]
                  }
                  onToggle={() =>
                    handleSocialToggle(button.id as keyof typeof socialToggles)
                  }
                />
              ))}
            </div>
          </FormControl>
        </FormItem>

        <Button type="submit" className="">
          Generate
        </Button>
      </form>
    </Form>
  );
}
