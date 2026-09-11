'use client'

import { Button } from "@/components/ui/button";
import { SquarePenIcon, Trash2Icon } from "lucide-react";

const iconMap = {
  edit: <SquarePenIcon size={16} color="#F9F6EE" />,
  delete: <Trash2Icon size={16} color="#F9F6EE" />,
} as const;

export default function AdminUpdateButton({
  label,
  variant,
  onClick,
  disabled = false,
}: {
  label: string;
  variant: keyof typeof iconMap;
  onClick?: () => void;
  disabled?: boolean;
}
){
    return(
        <div>
            <Button 
                onClick={onClick}
                disabled={disabled}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                {label}
                {iconMap[variant]}
            </Button>
        </div>
    );
};