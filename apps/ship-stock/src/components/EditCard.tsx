import { Card } from "@thetis/ui/card";
import { Button } from "@thetis/ui/button";
import { Lock, Unlock } from "lucide-react";
import { ReactNode, useState } from "react";

interface EditCardProps {
  title: string;
  children: ReactNode;
  previewContent: ReactNode;
  onDone?: () => void;
}

const EditCard = ({
  title,
  children,
  previewContent,
  onDone,
}: EditCardProps) => {
  const [isEditing, setIsEditing] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleDone = () => {
    setIsEditing(false);
    onDone?.();
  };

  return (
    <Card
      className={`relative transition-all duration-300 ${
        isHovered && !isEditing ? "bg-neutral-50 shadow-md" : ""
      } ${!isEditing ? "cursor-pointer hover:shadow-md" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isEditing && setIsEditing(true)}
    >
      <div className="flex flex-row justify-between items-center space-y-0 p-4 pb-2">
        <h3 className="font-medium text-base">{title}</h3>
        <Button
          type="button"
          variant={isEditing ? "ghost" : "outline"}
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(!isEditing);
          }}
          className="relative flex items-center gap-2 hover:bg-neutral-100 active:bg-neutral-200 transition-all duration-300 touch-manipulation"
        >
          {isEditing ? (
            <div className="relative w-5 h-5">
              <Unlock
                size={18}
                className="absolute inset-0 text-neutral-600 rotate-12 transition-all duration-300"
              />
            </div>
          ) : (
            <>
              <span className="text-sm">Edit</span>
              <div className="relative w-5 h-5">
                {isHovered ? (
                  <Unlock
                    size={18}
                    className="absolute inset-0 text-neutral-600 rotate-12 transition-all duration-300"
                  />
                ) : (
                  <Lock
                    size={18}
                    className="absolute inset-0 text-neutral-600 transition-all duration-300"
                  />
                )}
              </div>
            </>
          )}
        </Button>
      </div>

      <div className="px-4 pb-4 transition-all duration-300">
        {isEditing ? children : previewContent}
      </div>

      {isEditing && (
        <div className="flex justify-start px-4 pb-4">
          <Button
            type="button"
            onClick={handleDone}
            className="group-hover:bg-neutral-100"
          >
            Save
          </Button>
        </div>
      )}
    </Card>
  );
};

export default EditCard;
