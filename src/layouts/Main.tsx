import { Header } from "@/components/Header";
import { SiderBar } from "@/components/SiderBar";
import { images } from "@/constants/images";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, ReactElement } from "react";

interface MainProps {
  children: React.ReactNode;
  asideComponent?: ReactElement;
  breadcrumbs?: ReactElement;
}

export const Main: FC<MainProps> = ({
  breadcrumbs,
  children,
  asideComponent,
}) => {
  const router = useRouter();
  const settings = router.route === "/settings" ? true : "";
  return (
    <>
      {/* sticky p-10 top-0 z-30 flex justify-between items-center w-full */}
      {/*header*/}
      <Header />
      {/*content (sidebar + content)*/}
      <div className="flex overflow-hidden">
        {/* sidebar */}
        <SiderBar />
        <main className="relative w-full overflow-y-auto h-screen">
          {settings === true ? (
            <Image
              src={images.bannar}
              alt="bannar"
              className="sticky top-0 left-0 right-0 h-20"
            />
          ) : (
            <header className="sticky top-0 z-20 flex justify-between items-center bg-white h-20">
              <div className="max-w-[91.5%] mx-auto w-full flex justify-between items-center">
                <h2 className="font-extrabold text-[1.25rem] tracking-tight">
                  {breadcrumbs}
                </h2>
                {asideComponent && asideComponent}
              </div>
            </header>
          )}
          {children}
        </main>
        {/* <AddVendor /> */}
      </div>
      {/*footer*/}
    </>
  );
};
