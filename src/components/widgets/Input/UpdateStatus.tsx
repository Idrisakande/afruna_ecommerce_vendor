import { Model } from "@/components/Model";
import { IUpdateStatusInput } from "@/interfaces/inputs.interfaces";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputLabel } from "@/components/widgets/Input/InputLabel";
import ItemLabelPicker from "../ItemLabelPicker";

interface UpdateStatusProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateStatus: FC<UpdateStatusProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUpdateStatusInput>();

  const onSubmit: SubmitHandler<IUpdateStatusInput> = (data) => {
    console.log(data);
  };

  return (
    <Model isOpen={isOpen} onclose={onClose} title="Update Status">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-[30rem] mt-4 px-12 pb-10 flex flex-col gap-2 text-start"
      >
        <ItemLabelPicker
          triggerClassName="flex"
contentClassName="z-50"
          items={[
            "Order Proccessing",
            "Order Package",
            "Order Shipped",
            "Out for Delivered",
            "Delivered",
          ]}
          headerTitle="Status"
          placeholder="Select the status"
          key={"Items"}
          getSelected={(val) => console.log(val)}
        />
        <InputLabel
          getValue={(val) => console.log(val)}
          headerTitle="Date"
          placeholder="Enter the date"
          type="date"
        />
        <div className="flex justify-end items-center mt-6">
          <button className="px-6 py-2 rounded-md bg-green-600 text-white tracking-tight">
            Update
          </button>
        </div>
      </form>
    </Model>
  );
};
