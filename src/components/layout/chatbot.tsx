"use client"
import React from 'react'
import dynamic from 'next/dynamic'


const FullPageChat = dynamic(
    () => import('flowise-embed-react').then((mod) => mod.FullPageChat),
    { ssr: false }
)


interface ChatbotProps {
    userEmail: string
}

export default function Chatbot({ userEmail }: ChatbotProps) {
    return (
        <FullPageChat
            chatflowid="143c916d-f0c3-4e2d-a129-7fccdfaf6e1d"
            apiHost="https://flow.explorercallcenter.com"
            chatflowConfig={{
                overrideConfig: {
                    vars: {
                        userEmail: userEmail,
                    }
                }
            }}
            observersConfig={{}}
            theme={{
                customCSS: `
                    .lite-badge {
                        visibility: hidden !important;
                        display: block !important;
                        height: 0px !important;
                        margin-bottom: -10px !important;
                    }
                    span:has(#lite-badge) {
                        visibility: hidden !important;
                        display: block !important;
                    }
                    .icon-tabler-refresh {
                        stroke: #000 !important;
                    }
                    button[title="Reset Chat"] {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        background-color: hsl(var(--background));
                        color: hsl(var(--foreground));
                        border-radius: 8px;
                        padding: 8px;
                        font-size: 14px;
                        font-weight: 500;
                        transition: all 0.2s ease-in-out;
                        margin-right: 20px;
                    }
                    button[title="Reset Chat"]::after {
                        content: "Novo Chat";
                    }
                `,
                chatWindow: {
                    showTitle: true,
                    titleBackgroundColor: '#fff',
                    titleTextColor: '#303235',
                    showAgentMessages: false,
                    welcomeMessage: `Olá ${userEmail.split('@')[0].split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}! Qual sua dúvida?`,
                    backgroundColor: '#ffffff',
                    fontSize: 15,
                    starterPromptFontSize: 15,
                    clearChatOnReload: false,
                    renderHTML: true,
                    botMessage: {
                        backgroundColor: '#f7f8ff',
                        textColor: '#303235',
                        showAvatar: true,
                        avatarSrc: '/bot.png'
                    },
                    userMessage: {
                        backgroundColor: '#3B81F6',
                        textColor: '#ffffff',
                        showAvatar: true,
                        avatarSrc: '/user.png'
                    },
                    textInput: {
                        placeholder: "Digite sua pergunta...",
                        backgroundColor: "#ffffff",
                        textColor: "#374151",
                        sendButtonColor: "#3b82f6",
                    }
                }
            }}
        />
    )
}