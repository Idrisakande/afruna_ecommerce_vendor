import { VendorProducts } from "@/components/VendorProducts";
import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { images } from "@/constants/images";
import { Main } from "@/layouts/Main";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

interface VendorDetailsProps {}

export const VendorDetails: FC<VendorDetailsProps> = ({}) => {
  const router = useRouter();
  const details = router.route === "/vendor/details" ? true : "";
  return (
    <Main breadcrumbs={<Breadcrumbs />}>
      <main className="w-full pb-16">
        <div className="relative">
          <Image
            src={images.bannar}
            alt="bannar"
            priority
            className="w-full h-20"
          />
          <div className="bg-gray-300/50 h-20 top-0 left-0 right-0 absolute" />
        </div>
        <div className="px-8 my-20 w-full">
          <div className="relative flex flex-col w-full ">
            <Image
              src={images.userImg}
              alt="image"
              priority
              width={120}
              className="absolute object-contain -top-32 bg-black rounded-full"
            />
            <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex flex-col">
                <h2 className="text-sm font-semibold max-w-[22.7rem] tracking-tight">
                  Uyor Fashion Ltd
                </h2>
                <h4 className="font-medium max-w-[22.7rem] tracking-tight">
                  <span className="text-sm font-semibold tracking-tight">
                    Since: 2015.
                  </span>{" "}
                  Selling clothes & Other Accessories
                </h4>
              </div>
              <div className="flex flex-col">
                <h4 className="text-sm font-semibold tracking-tight sm:-mt-8">
                  Edward Diana
                </h4>
                <span className="text-sm text-[#7C7C7C] font-semibold">
                  Owner & CEO
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2 sm:flex-row sm:justify-between sm:items-center">
              <div>
                <p className="text-xs mt-1 text-[#7C7C7C] font-semibold">
                  Biningora, Nigeria
                </p>
                <span className="text-xs mt-1 text-[#7C7C7C] font-semibold">
                  uyor@fashion.com
                </span>
              </div>
              <div className="pr-4">
                <Link
                  href={"/chat"}
                  className="text-sm rounded-md bg-gradient-topBottomBlueGradient text-white tracking-tight px-5 py-3"
                >
                  Chat Vendor
                </Link>
              </div>
            </div>

            <div className="flex w-full flex-col mt-8 gap-3 sm:flex-row sm:justify-between sm:items-center">
              <div className="flex gap-8">
                <div>
                  <h4 className="text-sm font-semibold tracking-tight">3005</h4>
                  <span className="text-sm text-[#7C7C7C] font-semibold">
                    Followers
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-tight">2150</h4>
                  <span className="text-sm text-[#7C7C7C] font-semibold">
                    Following
                  </span>
                </div>
              </div>
              <div className="sm:pr-4 -mb-4 md:pr-8">
                <button className="text-sm border border-blue-500 font-semibold rounded-md tracking-tight px-5 py-2">
                  Suspend
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mt-16">
            {[
              {
                number: `$${2578}`,
                text: "Total Sales",
                bgImg: images.cardBg1,
                bg_gradient:
                  "linear-gradient(180deg, #CDDFFD 0%, #FCFDFF 100%)",
                bgImgStyles: "top-4 right-0",
              },
              {
                number: `$${8578}`,
                text: "Orders Placed",
                bgImg: images.cardBg2,
                bg_gradient:
                  "linear-gradient(180deg, #FCF2DA 0%, #FCFDFF 100%)",
                bgImgStyles: "top-0 right-0",
              },
              {
                number: 200,
                text: "Products by the Vendor",
                bgImg: images.cardBg2,
                bg_gradient:
                  "linear-gradient(180deg, #FCDAE2 0%, #FCFDFF 100%)",
                bgImgStyles: "top-0 right-0",
              },
            ].map(({ number, text, bg_gradient, bgImg, bgImgStyles }) => (
              <div
                key={text}
                style={{ background: bg_gradient }}
                className="relative flex flex-col gap-1 w-full p-8 shadow-md rounded-lg max-w-[16rem]"
              >
                <h3 className="text-sm font-semibold">{number}</h3>
                <p className="text-sm font-semibold">{text}</p>
                <Image
                  src={bgImg}
                  alt="bannar"
                  priority
                  className={`absolute ${bgImgStyles}`}
                />
              </div>
            ))}
          </div>
          <VendorProducts />
        </div>
      </main>
    </Main>
  );
};
