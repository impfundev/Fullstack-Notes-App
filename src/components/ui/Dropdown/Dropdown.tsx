import { Button } from "../button";

export const DropdownCategoryTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="text-[.65rem] font-semibold mb-1 uppercase px-1.5">
      {children}
    </div>
  );
};

export const DropdownButton = ({
  children,
  isActive,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`justify-start gap-2 ${isActive ? "" : ""} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
