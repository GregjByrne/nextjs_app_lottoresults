import { BadgeQuestionMarkIcon } from "lucide-react";

export default function NotFound(){
    return(
        <div className="container">
            <div className="flex flex-col items-center py-12 xl:py-24 space-y-4">
                <BadgeQuestionMarkIcon size={48} color="red" strokeWidth={2} />
                <h1 className="text-3xl font-bold">Page not Found</h1>
                <p>Please try again Later</p>
            </div>
        </div>
    );
};