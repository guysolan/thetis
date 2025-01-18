import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@thetis/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@thetis/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@thetis/ui/form";
import { Input } from "@thetis/ui/input";
import { useEmailAmazonReport } from "../api/emailReport";
import { Mail } from "lucide-react";

const emailFormSchema = z.object({
  path: z.string(),
  to: z.string().email("Please enter a valid email address"),
  subject: z.string(),
});

export type EmailFormValue = z.infer<typeof emailFormSchema>;

interface EmailReportDialogProps {
  path: string;
  reportDate: string;
  children: React.ReactNode;
}

export function EmailPdfDialog({
  path,
  reportDate,
  children,
}: EmailReportDialogProps) {
  const form = useForm<EmailFormValue>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      path: path,
      to: "tzbnvg49jl@inbox.midday.ai",
      subject: `Accounts: Amazon Settlement Report ${reportDate}`,
    },
  });

  const { mutate: sendEmail, isPending } = useEmailAmazonReport();

  function onSubmit(data: EmailFormValue) {
    sendEmail(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Email Settlement Report</DialogTitle>
          <DialogDescription>
            Send the settlement report to an email address.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button autoFocus type="submit" disabled={isPending}>
                {isPending ? "Sending..." : "Send Report"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EmailPdfDialog;
