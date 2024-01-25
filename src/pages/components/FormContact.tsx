import ButtomSubmit from "@/components/buttons/ButtomSubmit";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const FormContact = () => {
  return (
    <form className="p-4 bg-primary-foreground shadow-xl rounded-xl md:-translate-y-12 relative z-40">
      <h3 className="text-center text-primary font-bold text-xl">Contact Us</h3>
      <div className="flex flex-col gap-5 pt-4">
        <div className="relative">
          <Label name="Name" htmlfor="name" />
          <Input autoComplete="none" id="name" placeholder="name" />
        </div>
        <div className="relative">
          <Label name="Type your email" htmlfor="email" />
          <Input autoComplete="none" id="email" placeholder="email" />
        </div>
        <div className="relative">
          <Label name="Message" htmlfor="message" />
          <Textarea placeholder="message" autoComplete="none" id="message" />
        </div>
      </div>
      <Button className="w-full mt-4" type="submit">
        SUBMIT
      </Button>
    </form>
  );
};

export default FormContact;
