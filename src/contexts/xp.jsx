"use client";

import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const xpContext = createContext();

export const XpProvider = ({ children }) => {
    const { data: session } = useSession();
    const [xp, setXp] = useState(0);
    const [show, setShow] = useState(false);
    const [changed, setChanged] = useState(0);

    async function change() {
        setShow(true);
        setTimeout(() => {
            setShow(false);
            setChanged(0);
        }, 800);
    }

    async function getXp() {
        if (!session?.user?.email) return;
        
        try {
            const res = await fetch(`/api/gamification/stats?userId=${session.user.email}`);
            const data = await res.json();
            
            if (data && typeof data.xp === 'number') {
                const xpDiff = data.xp - xp;
                if (xpDiff > 0) {
                    setChanged(xpDiff);
                    change();
                }
                setXp(data.xp);
            }
        } catch (error) {
            console.error("Error fetching XP:", error);
        }
    }

    useEffect(() => {
        if (session?.user?.email) {
            getXp();
        }
    }, [session]);

    return (
        <xpContext.Provider value={{ getXp, xp, show, changed }}>
            {children}
        </xpContext.Provider>
    );
};

export default xpContext;
