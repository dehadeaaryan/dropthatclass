'use client';

import Image from "next/image";
import Button from "./ui/button";
import { signOutAction } from "@/actions/session";
import { changeUsernameAccountAction, deleteAccountAction, getUserFromDatabase } from "@/actions/user";
import { Dispatch, SetStateAction, useState } from "react";
import { UserType } from "@/types/user";
import { Modal } from "./modal";
import { MouseEvent } from "react";

function MobileAccount({ user, setUser, open, onClose }: { user: UserType, setUser: (value: SetStateAction<UserType>) => void, open: boolean, onClose: (e?: MouseEvent<HTMLDivElement, MouseEvent>) => void }): JSX.Element | null {
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    if (open)
        return (
            <div className={`fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-50 ${open ? "" : "hidden"}`} onClick={(e) => { e.target == e.currentTarget && onClose() }} onScroll={(e) => e.preventDefault()}>
                <div id="account-mobile-right" className="bg-white rounded-l-3xl p-4 w-auto h-full flex flex-col items-center justify-between gap-10">
                    <div id="account-mobile-top" className="flex flex-col items-center justify-between w-full gap-4">
                        <div id="account-mobile-top-header" className="flex flex-row items-center justify-between w-full">
                            <h2 className="text-3xl font-bold">Account</h2>
                            <Button onClick={() => { onClose() }}>Close</Button>
                        </div>
                        <Image src={user.image} alt={user.name} width={50} height={50} className="rounded-full h-24 w-24" />
                        <p className="text-lg">{user.email}</p>
                    </div>
                    <div id="account-mobile-username" className="flex flex-col items-center gap-4">
                        <p className="text-xl font-bold">Username</p>
                        <p className="text-lg">{user.username}</p>
                        <Button disabled={buttonDisabled} onClick={async (e) => {
                            if (buttonDisabled) return;
                            setButtonDisabled(true);
                            const updated_user = await changeUsernameAccountAction();
                            const db_user = await getUserFromDatabase();
                            setUser(db_user);
                            setButtonDisabled(false);
                        }}>Change</Button>
                    </div>
                    <div id="account-mobile-bottom" className="flex flex-row items-center justify-center gap-4">
                        <Button onClick={async () => { await signOutAction() }}>Sign Out</Button>
                        <Button onClick={async () => {
                            await deleteAccountAction(user.email);
                        }}>Delete Account</Button>
                    </div>
                </div>
            </div>
        );
    else return null;
}

export default function Account({ current_user }: { current_user: UserType }) {
    const [user, setUser] = useState<UserType>(current_user);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    return (
        <div id="account-container" className="relative group transition-all">
            <div id="account" className={`hidden lg:flex flex-row items-center rounded-full bg-neutral-00 gap-2 p-2 shadow-[inset_0_0px_8px_rgba(0,0,0,0.3)]`}>
                <p className="text-lg">{user.email}</p>
                <Image src={user.image} alt={user.name} width={50} height={50} className="rounded-full h-12 w-12" />
            </div>
            <div onClick={() => setMobileOpen(true)} id="account-mobile" className="lg:hidden flex flex-row items-center rounded-full bg-neutral-00 gap-2 p-2 shadow-[inset_0_0px_8px_rgba(0,0,0,0.3)]">
                <Image src={user.image} alt={user.name} width={50} height={50} className="rounded-full h-12 w-12 cursor-pointer" />
            </div>
            <div id="account-dropdown" className="w-full hidden absolute right-0 mt-0 rounded-3xl bg-white shadow-lg p-4 lg:group-hover:flex transition-all">
                <div id="account-drop-inner" className="w-full flex flex-col gap-4">
                    <div id="account-drop-top" className="flex flex-row items-center justify-between w-full">
                        <h2 className="text-3xl font-bold">Account</h2>
                        <div className="flex flex-row gap-4">
                            <form action={signOutAction}>
                                <Button>Sign Out</Button>
                            </form>
                        </div>
                    </div>
                    <div id="account-drop-bottom" className="flex flex-col gap-4">
                        <div id="account-drop-image" className="flex flex-row items-center justify-center gap-4">
                            <div id="account-drop-bottom-username" className="w-full flex flex-col gap-1">
                                <p className="text-xl font-bold">Username: </p>
                                <div id="account-drop-bottom-username-control" className="w-full flex flex-row items-center justify-between">
                                    <p className="text-lg">{user.username}</p>
                                    <Button disabled={buttonDisabled} onClick={async (e) => {
                                        if (buttonDisabled) return;
                                        setButtonDisabled(true);
                                        const updated_user = await changeUsernameAccountAction();
                                        const db_user = await getUserFromDatabase();
                                        setUser(db_user);
                                        setButtonDisabled(false);
                                    }}>Change</Button>
                                </div>
                            </div>
                        </div>
                        <div id="delete button" className="flex flex-row items-center justify-center gap-4">
                            <Button onClick={async () => {
                                setIsOpen(true);
                            }}>Delete Account</Button>
                            <Modal isOpen={isOpen} onClose={() => { setIsOpen(false) }}>
                                <div id="delete-modal" className="flex flex-col gap-4">
                                    <h2 className="text-3xl font-bold">Delete Account</h2>
                                    <p>Are you sure you want to delete your account?</p>
                                    <Button onClick={async () => {
                                        if (buttonDisabled) return;
                                        setButtonDisabled(true);
                                        await deleteAccountAction(user.email);
                                        setButtonDisabled(false);
                                    }}>Confirm</Button>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
            <MobileAccount user={user} setUser={setUser} open={mobileOpen} onClose={() => { setMobileOpen(false) }} />
        </div>
    );
}