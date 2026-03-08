import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { DashboardConfig, DashboardPlan } from '@/types/dashboard';

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    sql?: string;
    isDangerous?: boolean;
}

interface GlobalState {
    chatMessages: Message[];
    setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    currentConversationId: number | null;
    setCurrentConversationId: React.Dispatch<React.SetStateAction<number | null>>;
    dashboard: DashboardConfig;
    setDashboard: React.Dispatch<React.SetStateAction<DashboardConfig>>;
    currentPlan: DashboardPlan | null;
    setCurrentPlan: React.Dispatch<React.SetStateAction<DashboardPlan | null>>;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    sidebarCollapsed: boolean;
    setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export function GlobalStateProvider({ children }: { children: ReactNode }) {
    const [chatMessages, setChatMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hello! I'm your AI Database Analyst. Ask me anything about your data – I can query, analyze, and even help you make changes safely.",
        },
    ]);
    const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);

    const [dashboard, setDashboard] = useState<DashboardConfig>({
        id: `dashboard-initial`,
        title: "New Dashboard",
        widgets: [],
        layout: [],
        isPublic: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });

    const [currentPlan, setCurrentPlan] = useState<DashboardPlan | null>(null);
    const [activeTab, setActiveTab] = useState("history");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <GlobalStateContext.Provider value={{
            chatMessages,
            setChatMessages,
            currentConversationId,
            setCurrentConversationId,
            dashboard,
            setDashboard,
            currentPlan,
            setCurrentPlan,
            activeTab,
            setActiveTab,
            sidebarCollapsed,
            setSidebarCollapsed
        }}>
            {children}
        </GlobalStateContext.Provider>
    );
}

export function useGlobalState() {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
}
