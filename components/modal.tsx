import Image from "next/image";
import { redirect } from "next/navigation";
import Button from "./ui/button";
import { UserType } from "@/types/user";

export function AccountModal({ isOpen, onClose, user }: { isOpen: boolean, onClose: (e: React.MouseEvent<HTMLDivElement>) => void, user: UserType }): JSX.Element | null {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 pt-24 pr-12" onClick={(e) => { e.target == e.currentTarget && onClose(e) }} onScroll={(e) => e.preventDefault()}>
            <div className="bg-white rounded-3xl p-4 w-1/2">
                <div id="account-modal" className="flex flex-col gap-4">
                    <div id="account-modal-top" className="flex flex-row items-center justify-between w-full">
                        <h2 className="text-3xl font-bold">Account</h2>
                        <Button onClick={() => { window.location.replace("/api/auth/signout") }}>Sign Out</Button>
                    </div>
                    <div id="account-modal-bottom" className="flex flex-col gap-4">
                        <div id="account-modal-image" className="flex flex-row items-center justify-center gap-4">
                            <Image src={user.image} alt={user.name} width={100} height={100} className="rounded-full h-24 w-24" />
                        </div>
                        <div id="account-modal-email" className="flex flex-col gap-2">
                            <p className="text-lg">{user.email}</p>
                            <p className="text-sm">{user.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}