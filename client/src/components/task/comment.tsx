import { Avatar } from "@nextui-org/react";

interface Profile {
  _id: string;
  name: string;
}

interface CommentProps {
  by: Profile;
  content: string;
  date: string;
}

export default function Comment(commentProps: CommentProps) {
  return (
    <>
      <div className="flex gap-2 items-center">
        <Avatar
          className="bg-white border-1"
          showFallback
          name={commentProps.by.name}
          src="https://images.unsplash.com/broken"
        />
        <h2 className="text-xl font-semibold">{commentProps.by.name}</h2>
      </div>
      <p className="pl-12 text-black/70">{commentProps.content}</p>
    </>
  );
}
