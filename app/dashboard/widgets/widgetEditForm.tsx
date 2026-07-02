import Box from "@/components/box";
import { ButtonWidgetSettings } from "@/components/buttons";
import { Dialog } from "radix-ui";
import { ReactNode, useState } from "react";

//TODO: add onsave for submit button
export default function WidgetEditForm({ name, onSubmit, children }: { name: string, onSubmit: () => Promise<void>, children?: ReactNode; }) {

  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onSubmit();
        }
        setOpen(isOpen);
      }}
    >
      <Dialog.Trigger asChild>
        <ButtonWidgetSettings />
      </Dialog.Trigger>
      <Dialog.Portal >
        <Dialog.Overlay className="fixed inset-0 bg-(--la-overlay-background)" />
        <Dialog.Content>
          <Box className="popup">
            <form className="flex flex-col"
              onSubmit={(e) => {
                onSubmit().then(() => setOpen(false));
                e.preventDefault();
              }}
            >
              <Dialog.Title>Edit {name}</Dialog.Title>
              {children}
            </form>
          </Box>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
