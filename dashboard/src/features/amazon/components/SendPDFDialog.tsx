import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Form schema
const emailFormSchema = z.object({
  to: z.string().email("Please enter a valid email address"),
})

type EmailFormValues = z.infer<typeof emailFormSchema>

interface EmailReportDialogProps {
  path: string
  reportDate: string
}

export function SendPDFDialog({ path, reportDate }: EmailReportDialogProps) {
  // Initialize form
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      to: "",
    },
  })

  // Email mutation
  const { mutate: sendEmail, isPending } = useMutation({
    mutationFn: async (values: EmailFormValues) => {
      const response = await fetch("/api/resend-amazon-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path,
          to: values.to,
          subject: `Accounts: Amazon Settlement Report ${reportDate}`,
        }),
      })
      
      if (!response.ok) {
        throw new Error("Failed to send email")
      }
      
      return response.json()
    },
    onSuccess: () => {
      toast.success("Report sent successfully")
      form.reset()
    },
    onError: (error) => {
      toast.error("Failed to send report", {
        description: error.message
      })
    },
  })

  function onSubmit(data: EmailFormValues) {
    sendEmail(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Email Report</Button>
      </DialogTrigger>
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
              <Button type="submit" disabled={isPending}>
                {isPending ? "Sending..." : "Send Report"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default SendPDFDialog;