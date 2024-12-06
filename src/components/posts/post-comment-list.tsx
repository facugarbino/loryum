export default function PostCommentList() {
  return (
    <div className="flex flex-col gap-6 border p-5">
      <div className="flex items-center space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.user.avatarUrl} />
          <AvatarFallback>{post.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-4">
            <p className="text-base">{post.user.name}</p>
            <p className="text-sm text-foreground/50">
              {calculateRelativeTime(post.date)}
            </p>
          </div>
          <p className="text-sm text-foreground/50">{post.user.username}</p>
        </div>
      </div>
      {post.content}
      <PostImages images={post.images.map((i) => i.url)} fullPage={fullPage} />
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        <p className="text-xs">{post.comments}</p>
      </div>
    </div>
  );
}
