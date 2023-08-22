"use client";

import {CommentValidation} from "@/lib/validations/thread";
import {zodResolver} from "@hookform/resolvers/zod";
import {usePathname, useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import Image from "next/image";
import {addCommentToThread} from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment = ({threadId, currentUserImg, currentUserId}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );
    form.reset();
  };

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
          <FormField
            control={form.control}
            name="thread"
            render={({field}) => (
              <FormItem className="flex gap-3 w-full items-center">
                <FormLabel>
                  <Image
                    src={currentUserImg}
                    alt="current user"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Input
                    type="text"
                    placeholder="Comment..."
                    className="no-focus text-light-1 outline-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="comment-form_btn">
            Reply
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Comment;
