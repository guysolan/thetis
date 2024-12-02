import { ReactNode } from "react";

interface PageTitleProps {
    title: string;
    children?: ReactNode;
}


const PageTitle = ({ title, children }: PageTitleProps) => {
  return (
  <div className="flex justify-between items-center">
        <h1 className="mb-4 font-bold text-2xl">{title}</h1>
       {children}
      </div>
  )
}

export default PageTitle