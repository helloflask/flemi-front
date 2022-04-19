
import { Post, orm } from "./models";

const PostCard = (props: { post: Post, first?: boolean, last?: boolean }) => {
    let { post } = props;
    let className = "p-4 border-solid border-2 border-slate-600 ";
    if (props.first) {
        className += "rounded-tl-lg rounded-tr-lg";
    } else if (props.last) {
        className += "rounded-bl-lg rounded-br-lg";
    }
    return (<div className={className}>
        <div className="font-semibold font-2xl">{post.title}</div>
        <div className="font-base font-slate-800">{post.author.username}</div>
        <div className="font-sm">{post.content}</div>
    </div>)
}

export const Posts = () => {
    let post = orm.em.resolve(Post, {
        id: 2,
        title: "this is a title",
        content: "content blah...",
        author: {
            id: 1,
            username: "test",
            name: undefined,
        }
    })
    return (<div className="container mx-auto max-w-lg">
        <PostCard post={post} first={true}/>
    </div>)
}