import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { Link, useNavigate } from "react-router-dom"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"
import { useState } from "react"
import { Transportation } from "@/types"
import SelectTransportation from "./SelectTransportation"

type PostFormProps = {
  post?: Models.Document;
  action : 'Create' | 'Update';
}

/* 
PostForm takes a post object as a prop in the case that the user is editing a post
*/
const PostForm = ( {post, action}: PostFormProps ) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();


  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [transportation, setTransportation] = useState<Transportation[]>([])

  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(',') : '',
      latitude: post ? post?.latitude : 0,
      longitude: post ? post?.longitude : 0,
      transportation: post ? post?.transportation : [],
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (transportation.length === 0) {
      return toast({
        title: 'Please select a mode of transportation.'
      })
    }

    if(post && action === 'Update') {
      const updatedPost = await updatePost({
        ...values, 
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
        transportation: transportation,
      })

      if(!updatedPost) {
        toast({ title: 'Please try again'})
      }

      return navigate(`/posts/${post.$id}`)
    }

    const newPost = await createPost({
      ...values, 
      userId: user.id,
      transportation: transportation,
    })

    if (!newPost) {
      return toast({
        title: "Posting failed. Please try again."
      })
    }

    navigate('/'); // upon successful post, navigate back to homepage

  }

  console.log(post?.imageUrl)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea placeholder="Write something" className="shade-textarea custom-scrollbar shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add photos</FormLabel>
              <FormControl>
                <FileUploader 
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field}/>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add tags (separated by comma) </FormLabel>
              <FormControl>
                <Input 
                  type="text"
                  className="shad-input"
                  placeholder="Art, Expression, Learn"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Latitude</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  step="any"
                  className="shad-input"
                  placeholder="30.29125"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Longitude</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  step="any"
                  className="shad-input"
                  placeholder="97.742111"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <SelectTransportation transportation={post?.transportation.map((t: string) => t as Transportation)} setTransportation={setTransportation}/>

        <div className="flex gap-4 items-center justify-end">
          <Button 
            type="button" 
            className="shad-button_dark_4"
            
          >
            <Link to={`/posts/${post?.$id}`}>Cancel</Link>
          </Button>
          <Button 
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {isLoadingCreate || isLoadingUpdate && 'Loading...'}
            {action} Post
          </Button>
        </div>
        
      </form>
    </Form>
  )
}

export default PostForm