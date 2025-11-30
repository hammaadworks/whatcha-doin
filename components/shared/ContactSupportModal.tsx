"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, ExternalLink, X, Github, Linkedin, MessageCircle } from "lucide-react";
import Link from "next/link";

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactSupportModal: React.FC<ContactSupportModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Support</DialogTitle>
          <DialogDescription>
            Reach out to us for any questions, feedback, or support needs.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <Link href="mailto:hammaadworks@gmail.com" className="text-primary hover:underline">
              hammaadworks@gmail.com
            </Link>
          </div>
          <p className="font-semibold mt-2">Find me on:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <Link href="https://api.whatsapp.com/send/?phone=918310428923&text=%22Hey%20_hammaadworks_,%20I%20got%20here%20from%20your%20*whatcha-doin*%20app.%20Wazzup!%22" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                WhatsApp
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <X className="h-4 w-4 text-muted-foreground" />
              <Link href="https://x.com/hammaadworks" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                X
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Github className="h-4 w-4 text-muted-foreground" />
              <Link href="https://github.com/hammaadworks" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                GitHub
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Linkedin className="h-4 w-4 text-muted-foreground" />
              <Link href="https://www.linkedin.com/in/hammaadworks" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                LinkedIn
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <Link href="https://www.producthunt.com/@hammaadw" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                ProductHunt
              </Link>
            </div>
            <div className="flex items-center space-x-2 col-span-2">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <Link href="https://www.hammaadworks.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Website (Coming Soon)
              </Link>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSupportModal;
