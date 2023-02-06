import React from "react";
import Logo from "./Logo";
import WalletIcon from "./Icons/Wallet";
import Section from "./SidebarParts/Section";

function Sidebar() {
  return (
    <div className="bokeh flex flex-col h-screen w-fit px-10 min-w-[300px]">
      <Logo wrapClass="w-full flex items-center justify-center py-8" />
      <button className="bg-black text-white flex items-center justify-center rounded-lg p-3 text-lg">
        <WalletIcon classes="mr-3" /> Sign In
      </button>

      <Section heading="View Methods" />
      <Section heading="Change Methods" />
    </div>
  );
}

export default Sidebar;
