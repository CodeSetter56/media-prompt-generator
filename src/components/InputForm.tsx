"use client";

import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

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

const socialButtonsConfig = [
  {
    id: "instagram", 
    label: "Share on Instagram", 
    icon: FaInstagram, 
    activeColor: "#E1306C", 
  },
  {
    id: "facebook",
    label: "Share on Facebook",
    icon: FaFacebook,
    activeColor: "#1877F2",
  },
  {
    id: "twitter",
    label: "Share on Twitter",
    icon: FaTwitter,
    activeColor: "#1DA1F2",
  },
];

// form validation schema 
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.", 
  }),
  context: z
    .string()
    .max(300, {
      message: "Context must not exceed 300 characters.",
    })
    .optional(),
});

export function InputForm() {
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

  function formSubmit(values: z.infer<typeof formSchema>) {
    console.log({ ...values, shareOptions: socialToggles });
  }

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
