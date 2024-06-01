import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { format } from "date-fns";

const formSchema = z.object({
  name: z.string().min(3).max(255),
  bio: z.string(),
  dp: z.string(),
  dob: z.date(),
  ig_link: z.string(),
  x_link: z.string(),
  ph_link: z.string(),
  of_link: z.string(),
  web: z.string(),
  rating: z.coerce.number().min(0.1).max(5),
});

export type formSchemaType = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (data: formSchemaType) => void;
};

const StarForm = ({ onSubmit }: Props) => {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      dp: "",
      ig_link: "https://instagram.com",
      x_link: "https://x.com",
      ph_link: "https://youtube.com",
      of_link: "https://threads.net",
      web: "https://yoursite.com",
      rating: 0.1,
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 text-slate-400"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-900 border-slate-700"
                    placeholder="Jane Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-slate-900 border-slate-700"
                    rows={8}
                    placeholder="Description.."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    className="bg-slate-900 border-slate-700"
                    placeholder="https://exmple.com/dp.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col">
                  <FormLabel className="mb-3">Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="social flex-col">
            <p className="font-semibold mb-3">Social Links</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="ig_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-900 border-slate-700"
                          placeholder="instagram.com/"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="x_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>X (Twitter)</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-900 border-slate-700"
                          placeholder="x.com/"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ph_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Youtube</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-900 border-slate-700"
                          placeholder="youtube.com/"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="of_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Threads</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-900 border-slate-700"
                          placeholder="threads.net/"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="web"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-900 border-slate-700"
                          placeholder="yoursite.com/"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-900 border-slate-700"
                          type="number"
                          placeholder="4.5"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Button className="bg-slate-700" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default StarForm;
