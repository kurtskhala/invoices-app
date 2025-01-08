<<<<<<< HEAD
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";
=======
import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '@/lib/utils';
>>>>>>> 7289d1e9f23e42d9c438564772f8ece197be0c71

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
<<<<<<< HEAD
Drawer.displayName = "Drawer";
=======
Drawer.displayName = 'Drawer';
>>>>>>> 7289d1e9f23e42d9c438564772f8ece197be0c71

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
<<<<<<< HEAD
    className={cn("fixed inset-0 z-50 bg-black/20", className)}
=======
    className={cn('fixed inset-0 z-50 bg-black/80', className)}
>>>>>>> 7289d1e9f23e42d9c438564772f8ece197be0c71
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
<<<<<<< HEAD
        "fixed inset-y-0 md:left-16 left-0 z-50 h-full md:w-1/2 w-full border bg-background", // Modified for left positioning
=======
        'fixed inset-y-0 left-16 z-50 h-full w-1/2 border bg-background', // Modified for left positioning
>>>>>>> 7289d1e9f23e42d9c438564772f8ece197be0c71
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
<<<<<<< HEAD
DrawerContent.displayName = "DrawerContent";
=======
DrawerContent.displayName = 'DrawerContent';
>>>>>>> 7289d1e9f23e42d9c438564772f8ece197be0c71

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
<<<<<<< HEAD
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";
=======
    className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
    {...props}
  />
);
DrawerHeader.displayName = 'DrawerHeader';
>>>>>>> 7289d1e9f23e42d9c438564772f8ece197be0c71

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
<<<<<<< HEAD
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";
=======
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
);
DrawerFooter.displayName = 'DrawerFooter';
>>>>>>> 7289d1e9f23e42d9c438564772f8ece197be0c71

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
<<<<<<< HEAD
      "text-lg font-semibold leading-none tracking-tight",
=======
      'text-lg font-semibold leading-none tracking-tight',
>>>>>>> 7289d1e9f23e42d9c438564772f8ece197be0c71
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
<<<<<<< HEAD
    className={cn("text-sm text-muted-foreground", className)}
=======
    className={cn('text-sm text-muted-foreground', className)}
>>>>>>> 7289d1e9f23e42d9c438564772f8ece197be0c71
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
