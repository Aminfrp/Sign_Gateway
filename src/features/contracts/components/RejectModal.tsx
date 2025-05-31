import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components";

type RejectModalProps = {
    open: boolean;
    onClose: (value?:boolean) => void;
    onReject:()=>void
}


const RejectModal = (props: RejectModalProps) => {
    const {open, onClose, onReject} = props;
    return(
        <Dialog
            open={open}
            onOpenChange={(open) => onClose(open)}
        >
            <DialogTrigger>
            </DialogTrigger>
            <DialogContent aria-description="reject-contract">
            <DialogTitle className="text-end " >
                    لغو سند
            </DialogTitle>
                <DialogDescription className="text-end ">
                    آیا از لغو سند خود اطمینان دارید؟
                </DialogDescription>

                <div className="flex gap-3 text-end">
                    <Button
                        className="min-h-12 w-full mt-3 bg-red-500 hover:bg-red-200"
                        onClick={onReject}
                    >
                        لغو سند
                    </Button>
                    <Button
                        className="min-h-12 w-full mt-3"
                        onClick={()=>onClose(false)}
                        variant={"outline"}
                    >
                        انصراف
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RejectModal;