import { FC, Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";

interface ModelProps {
	isOpen: boolean;
	onclose: () => void;
	children?: ReactNode;
	title: string;
	rootClassName?: string;
	EditModel?: boolean;
}

export const Model: FC<ModelProps> = ({
	isOpen,
	onclose,
	children,
	title,
	rootClassName,
	EditModel
}) => {
	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog
				as={"div"}
				className="relative z-30"
				onClose={() => {
					EditModel ? "" : onclose();
				}}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/30" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center xs:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 xs:translate-y-0 xs:scale-95"
							enterTo="opacity-100 translate-y-0 xs:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 xs:scale-100"
							leaveTo="opacity-0 translate-y-4 xs:translate-y-0 xs:scale-95"
						>
							<Dialog.Panel
								className={`${rootClassName} relative transform overflow-hidden rounded-xl bg-white shadow-xl transition-all`}
							>
								<div className="pt-8 px-8 pb-12 flex justify-between items-center">
									<Dialog.Title
										as="h2"
										className="text-2xl font-extrabold"
									>
										{title}
									</Dialog.Title>

									<button
										type="button"
										className="inline-flex justify-center rounded-md  focus:outline-none "
										onClick={onclose}
									>
										<RxCross2 className=" text-slate-500 w-6 h-6" />
									</button>
								</div>
								<div className="flex justify-start items-start">
									{children}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
