import { PasargadWhiteLogo, WhiteLogo } from "../../assets/images";

export const Header = () => {
  return (
    <header className="bg-primary rounded-b-[2.5rem] h-[6rem]  flex justify-between items-center py-3">
      <div className="container mx-auto flex justify-between items-center">
        <span className="pt-2 xs:w-16 xs:h-10 md:w-24 md:h-16">
          <PasargadWhiteLogo />
        </span>
        <h1 className="font-yekan-bold text-responsive text-white xs:text-sm lg:text-lg">
          درگاه امضای دیجیتال پاراف
        </h1>
        <span className="xs:w-16 xs:h-10 md:w-24 md:h-16">
          <WhiteLogo />
        </span>
      </div>
    </header>
  );
};
