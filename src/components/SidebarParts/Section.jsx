import React, { useState } from "react";
import * as Collapsible from '@radix-ui/react-collapsible';
import Chevron from '../Icons/Chevron';

export default function Section({ heading }) {
  const [open, setOpen] = useState(true)
  return (
    <Collapsible.Root className="mt-10" open={open} onOpenChange={setOpen}>
      <div className="flex justify-between">
        <span className="uppercase text-gray-400 font-bold text-xl cursor-pointer">
          {heading}
        </span>
        <Collapsible.Trigger asChild>
          <button className="IconButton">{open ? <Chevron /> : <Chevron rotate />}</button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content>
        <ul className="pl-4 mt-2 list-none text-lg font-medium text-gray-400 border-l-2 border-l-black">
          <li>One</li>
          <li>Two</li>
          <li>Three</li>
        </ul>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
