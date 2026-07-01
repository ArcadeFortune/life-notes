import { ButtonWidgetSettings } from "@/components/buttons";
import { CrossIcon } from "lucide-react";
import { Dialog } from "radix-ui";
import { HTMLInputTypeAttribute, ReactNode, useState } from "react";

//TODO: add onsave for submit button
export default function WidgetEditForm({ name, onSubmit, children }: { name: string, onSubmit: () => Promise<void>, children?: ReactNode; }) {

  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <ButtonWidgetSettings />
      </Dialog.Trigger>
      <Dialog.Portal >
        <Dialog.Overlay className="fixed inset-0 bg-(--la-overlay-background)" />
        <Dialog.Content className="popup">
          <form onSubmit={(e) => {
            onSubmit().then(() => setOpen(false));
            e.preventDefault();
          }}>
            <Dialog.Title>Edit {name}</Dialog.Title>
            {children}
            <div>
              <button type="submit">Save changes</button>
            </div>
            <Dialog.Close asChild>
              <button aria-label="Close">
                <CrossIcon />
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
