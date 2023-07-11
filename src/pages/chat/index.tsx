"use client";

import { useRouter } from "next/router";
import React from "react";
import { Main } from "@/layouts/Main";
import { IoSearchOutline } from "react-icons/io5";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { images } from "@/constants/images";
import { conversations, users } from "@/constants/data";
import { UsersList } from "@/components/UsersList";
import { CurrentUserHeader } from "@/components/CurrentUserHeader";
import { CurrentUsersConversations } from "@/components/CurrentUsersConversations";
import { CoversationFooter } from "@/components/CoversationFooter";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";

export default function Index() {
  const router = useRouter();
  const chat = router.route === "/chat" ? "Chat" : "";
  return (
    <>
      <Main breadcrumbs={<Breadcrumbs />}>
        <main className="p-2 px-8 pt-5 flex gap-5">
          <div className="flex gap-3 flex-col  bg-[#FDFDFF] h-full xl:min-w-[30%] xl:max-h-[70vh] overflow-hidden border border-[#D5D5E6] rounded-2xl xl:pt-6 xl:pl-2">
            <h2 className="ml-4 mt-5 text-[1.4rem] text-[#0C0E3B] font-medium tracking-tight">
              Messages
            </h2>
            <div className="ml-4 mr-6 bg-white flex items-center border border-[#D5D5E6] rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search Name, Id..."
                className="w-full p-2 focus:outline-none placeholder:text-[#D2D2D2]"
              />
              <div className="w-14 text-[#D2D2D2]">
                <IoSearchOutline className="text-2xl" />
              </div>
            </div>
            <div className="mt-1 pt-2">
              <ScrollArea.Root className="ScrollAreaRoot w-full h-[50.3vh] text-xl rounded-lg overflow-hidden">
                <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full">
                  <div className="flex flex-col gap-2 pr-4 ">
                    {users.map(({ img, id, name, number, active }) => (
                      <UsersList
                        key={id}
                        name={name}
                        number={number}
                        active={active}
                        img={img}
                        id={id}
                      />
                    ))}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  className="ScrollAreaScrollbar p-[2px] rounded-xl` mb-4 flex bg-slate-100 hover:bg-slate-200"
                  orientation="vertical"
                >
                  <ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar
                  className="ScrollAreaScrollbar p-[2px] flex "
                  orientation="horizontal"
                >
                  <ScrollArea.Thumb className="rounded-xl" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className="bg-pink-900" />
              </ScrollArea.Root>
            </div>
          </div>
          <div className=" min-w-[68%] min-h-[65vh] flex flex-col bg-white h-full border border-[#D5D5E6] rounded-2xl">
            <div className="h-24 px-8 border-b border-[#D5D5E6] flex justify-center items-center">
              <CurrentUserHeader
                name={"Bhai jan ADMIN"}
                img={images.userImg}
                active={true}
                id={"#CU679H"}
              />
            </div>
            <div>
              <ScrollArea.Root className="ScrollAreaRoot flex-1 w-full h-[46vh] text-xl rounded-lg overflow-hidden">
                <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full">
                  <div className="flex h-full flex-col gap-1 pt-2 px-4">
                    {conversations.map(({ id, img, message, time, isOwn }) => (
                      <CurrentUsersConversations
                        key={id}
                        img={img}
                        message={message}
                        time={time}
                        isOwn={isOwn}
                      />
                    ))}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  className="ScrollAreaScrollbar p-[2px] rounded-xl` mb-4 flex bg-slate-100 hover:bg-slate-200"
                  orientation="vertical"
                >
                  <ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar
                  className="ScrollAreaScrollbar p-[2px] flex "
                  orientation="horizontal"
                >
                  <ScrollArea.Thumb className="rounded-xl" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className="" />
              </ScrollArea.Root>
            </div>
            <CoversationFooter />
          </div>
        </main>
      </Main>
    </>
  );
}
