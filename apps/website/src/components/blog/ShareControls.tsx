import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/Drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@thetis/ui/popover";
import {
  ArrowUp,
  Printer,
  Share2,
  Twitter,
  Facebook,
  Link,
  Linkedin,
} from "lucide-react";

const ShareControls = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const shareViaWebShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: window.location.href,
        })
        .catch(console.error);
    }
  };

  const shareViaTwitter = () => {
    const text = encodeURIComponent(document.title);
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
    );
  };

  const shareViaFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
    );
  };

  const shareViaLinkedin = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
      "_blank",
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert("Link copied to clipboard!"))
      .catch(console.error);
  };

  const ShareContent = () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="gap-2 grid grid-cols-3">
        <Button
          variant="secondary"
          onClick={shareViaTwitter}
          className="w-full"
        >
          <Twitter size={20} />
        </Button>
        <Button
          variant="secondary"
          onClick={shareViaFacebook}
          className="w-full"
        >
          <Facebook size={20} />
        </Button>
        <Button
          variant="secondary"
          onClick={shareViaLinkedin}
          className="w-full"
        >
          <Linkedin size={20} />
        </Button>
      </div>
      <Button variant="default" onClick={shareViaWebShare} className="w-full">
        <Share2 className="mr-2" size={20} />
        Share via Device
      </Button>
      <Button
        variant="outline"
        onClick={copyToClipboard}
        className="bg-white w-full"
      >
        <Link className="mr-2" size={20} />
        Copy Link
      </Button>
    </div>
  );

  return (
    <div
      className={`print:hidden md:top-[60vh] md:right-4 bottom-4 left-1/2 md:left-auto fixed flex flex-row md:flex-col gap-4 md:gap-2 -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 ${
        isMobile
          ? "bg-white p-2 rounded-full shadow-sm border border-neutral-300"
          : ""
      }`}
    >
      {isMobile ? (
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="order-first rounded-full"
              title="Share article"
            >
              <Share2 size={20} />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Share Article</DrawerTitle>
            </DrawerHeader>
            <ShareContent />
          </DrawerContent>
        </Drawer>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="order-first rounded-full"
              title="Share article"
            >
              <Share2 size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="rounded-lg w-sm" align="start" side="left">
            <ShareContent />
          </PopoverContent>
        </Popover>
      )}

      <Button
        variant="secondary"
        size="icon"
        onClick={() => window.print()}
        title="Print article"
        className="rounded-full"
      >
        <Printer size={20} />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Back to top"
        className="bg-white rounded-full"
      >
        <ArrowUp size={20} />
      </Button>
    </div>
  );
};

export default ShareControls;
