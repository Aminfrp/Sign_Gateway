import { Logo } from "../../assets/images";

export const Footer = () => {
  return (
    <footer className=" flex items-center justify-between h-[5rem] bg-[#FFFFFF] border-t border-slate-200 py-2">
      <div className=" container mx-auto flex items-center justify-between  text-sm">
        <h3>.تمامی حقوق برای پاراف محفوظ است</h3>
        <div className="flex items-center cursor-pointer  xs:w-16 xs:h-10 md:w-24 md:h-16 ">
          <Logo />
        </div>
      </div>
    </footer>
  );
};
