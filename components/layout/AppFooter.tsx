'use client';

import React, { useState } from 'react';
import {usePWAInstall} from '@/hooks/usePWAInstall';
import ContactSupportModal from '@/components/shared/ContactSupportModal'; // Import the new modal component
import FeedbackModal from '@/components/shared/FeedbackModal'; // Import the feedback modal
import { PWAInstallModal } from '@/components/shared/PWAInstallModal'; // Import the reusable PWA install modal

const AppFooter = () => {
    const {
        promptInstall,
        isIOS,
        isAppInstalled,
        showInstallMessage,
        installMessage,
        closeInstallMessage,
        setInstallMessage,
        setShowInstallMessage
    } = usePWAInstall();

    const [isContactModalOpen, setIsContactModalOpen] = useState(false); // State for contact modal
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false); // State for feedback modal

    // Helper function to render the PWA button/message
    const renderPWAInstallUI = () => {
        if (isIOS) {
            if (isAppInstalled) {
                return <span className="text-muted-foreground">App Already Installed</span>;
            } else {
                return (<button
                        onClick={() => {
                            closeInstallMessage(); // Close any previous message
                            setInstallMessage('To install, tap the Share button (box with an arrow) and then "Add to Home Screen".');
                            setShowInstallMessage(true);
                        }}
                        className="text-primary hover:underline focus:outline-none"
                    >
                        Add to Home Screen
                    </button>);
            }
        } else { // Not iOS
            if (isAppInstalled) {
                return <span className="text-muted-foreground">App Already Installed</span>;
            } else {
                return (<button onClick={promptInstall} className="text-primary hover:underline focus:outline-none">
                        Install the App
                    </button>);
            }
        }
    };

    return (<footer className="text-center p-4 bg-card border-t border-card-border text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} whatcha-doin. All rights reserved.

            <span className="mx-2">|</span>
            <button onClick={() => setIsContactModalOpen(true)} className="text-primary hover:underline focus:outline-none">
                Contact Support
            </button>
            <span className="mx-2">|</span>
            <button onClick={() => setIsFeedbackModalOpen(true)} className="text-primary hover:underline focus:outline-none">
                Send Feedback / Report Bug
            </button>
            <>
                <span className="mx-2">|</span>
                {renderPWAInstallUI()}
            </>

            <ContactSupportModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
            <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} />
            <PWAInstallModal
                show={showInstallMessage}
                message={installMessage}
                onClose={closeInstallMessage}
            />
        </footer>);
};

export default AppFooter;
