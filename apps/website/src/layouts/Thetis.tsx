import Logo from "@/components/icons/Logo.tsx";

const Thetis = () => {
  return (
    <a
      className="flex flex-nowrap justify-start items-center gap-x-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-md h-fit text-lg lg:text-xl"
      href="/"
    >
      <Logo className="w-8 h-8 dark:fill-white" />
      <span className="text-nowrap dark:text-white">
        Thetis Medical<sup className="translate-y-6 scale-60">&reg;</sup>
      </span>
    </a>
  );
};

export default Thetis;
