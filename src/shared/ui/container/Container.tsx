import css from "./Container.module.css";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ className = "", children }: ContainerProps) => {
  return <div className={`${css.container} ${className}`}>{children}</div>;
};

export default Container;
