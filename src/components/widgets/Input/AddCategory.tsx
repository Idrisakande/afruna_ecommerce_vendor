import { Model } from "@/components/Model";
import { FC, useCallback, useState } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import ItemPicker from "../ItemPicker";
import { IAddCategoryInput } from "@/interfaces/inputs.interfaces";
import { GoPlus, GoTrash } from "react-icons/go";
import { MdImage } from "react-icons/md";

interface AddCategoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCategory: FC<AddCategoryProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IAddCategoryInput>();

  const onSubmit: SubmitHandler<IAddCategoryInput> = (data) => {
    console.log(data);
  };

  const [files, setFiles] = useState<ExtFile[]>([]);
  const updateFiles = useCallback((incommingFiles: ExtFile[]) => {
    if (incommingFiles.length <= 10) {
      setFiles(
        incommingFiles.filter((file) => {
          if (file.size < 200 * 1024) {
            return file;
          } else {
            alert(`The file size of ${file.name} is too large.`);
            return;
          }
        })
      );
    } else {
      alert("Maximum files reached!");
    }
  }, []);
  const removeFile = useCallback(
    (id: string | number | undefined) => {
      setFiles(files.filter((x: ExtFile) => x.id !== id));
    },
    [files]
  );

  return (
    <Model isOpen={isOpen} onclose={onClose} title={"Category"}>
      <div className="bg-white mt-2 min-w-[38rem] w-full mx-auto text-start pr-1">
        <ScrollArea.Root className="ScrollAreaRoot px-6 w-full h-[81vh] overflow-hidden">
          <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full">
            <div className="max-w-[21rem] mt-4 w-full">
              <Dropzone
                value={files}
                onChange={updateFiles}
                maxFiles={10}
                maxFileSize={200 * 1024}
                type="image/*"
                default={false}
                header={false}
                footer={false}
                multiple
              >
                <div className="relative flex flex-col max-w-[20rem] items-center text-slate-900">
                  <text className="relative">
                    <MdImage size={43} />
                    <GoPlus
                      size={18}
                      className="font-bold absolute top-[29px] left-[29px] bg-white rounded-full"
                    />
                  </text>
                  <button className="my-2 p-2 rounded-[5px] bg-gradient-whitishblue text-white text-sm">
                    Select Photo
                  </button>
                  <h3 className="text-sm text-slate-600">
                    Or drag photo here{" "}
                  </h3>
                  <span className="text-xs text-slate-400">
                    (up to 10 photos)
                  </span>
                </div>
              </Dropzone>
              <ScrollArea.Root className="ScrollAreaRoot mt-4 px-6 w-full overflow-hidden">
                <ScrollArea.Viewport className="ScrollAreaViewport w-full h-full">
                  {files.length > 0 && (
                    <div
                      className={`mt-4 flex h-[40vh] flex-wrap gap-4 w-full`}
                    >
                      {files.map((file, id) => (
                        <div className="" key={file.id}>
                          <header className="flex justify-between items-center relative top-1 z-10 rounded-t-lg bg-gray-800 text-white text-sm p-2">
                            <h3>Cover</h3>
                            <span className="p-[3px] rounded-full font-semibold bg-white text-gray-700 w-[20px] h-[20px] ">
                              {id + 1}
                            </span>
                          </header>
                          <FileMosaic {...file} preview />
                          <span onClick={() => removeFile(file.id)}>
                            <GoTrash size={20} />
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  className="ScrollAreaScrollbar p-[2px] rounded-xl` mb-4 flex bg-slate-100 hover:bg-slate-200"
                  orientation="vertical"
                >
                  <ScrollArea.Thumb className="relative flex-1 rounded-xl bg-slate-400" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar
                  className="ScrollAreaScrollbar"
                  orientation="horizontal"
                >
                  <ScrollArea.Thumb className="rounded-xl" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className="bg-slate-100 hover:bg-slate-200" />
              </ScrollArea.Root>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5 flex-wrap mt-4 pb-16"
            >
              <ItemPicker
                items={[
                  "Order Proccessing",
                  "Order Package",
                  "Order Shipped",
                  "Out for Delivered",
                  "Delivered",
                ]}
                headerTitle="Category Title"
                placeholder="Select the title"
                key={"Items"}
                getSelected={(val) => console.log(val)}
              />
              <ItemPicker
                items={[
                  "Order Proccessing",
                  "Order Package",
                  "Order Shipped",
                  "Out for Delivered",
                  "Delivered",
                ]}
                headerTitle="Slug"
                placeholder="Select the slug"
                key={"Items"}
                getSelected={(val) => console.log(val)}
              />
              <fieldset className="w-full flex flex-col gap-2">
                <label>Description</label>
                <textarea
                  rows={5}
                  className="p-2 w-full border border-slate-300 rounded-md"
                />
              </fieldset>
              <div className="flex justify-end items-center mt-6">
                <button className="px-6 py-2 rounded-md bg-gradient-lightBluebutton text-white tracking-tight">
                  Add Category
                </button>
              </div>
            </form>
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
          <ScrollArea.Corner className="bg-slate-100 hover:bg-slate-200" />
        </ScrollArea.Root>
      </div>
    </Model>
  );
};
