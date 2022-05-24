import Post from "../models/post";
import NavBar from "./navBar";
import ProfileSideBar from "./profileSideBar";

export const PostCard = (props: {
    post: Post;
    first?: boolean;
    last?: boolean;
}) => {
    let { post } = props;
    let className = "p-4 border-solid border-x-2 border-slate-300 ";
    let extra: string;
    if (props.first && props.last) {
        extra = "border-y-2 rounded";
    } else if (props.first) {
        extra = "border-t-2 border-b rounded-tl-lg rounded-tr-lg";
    } else if (props.last) {
        extra = "border-b-2 border-t rounded-bl-lg rounded-br-lg";
    } else {
        extra = "border-y-1";
    }
    className += extra;

    return (
        <div className={className}>
            <div className="font-semibold font-2xl">{post.title}</div>
            <div className="text-base text-slate-500">
                {post.author ? post.author.username : "deleted-flog-user"}
            </div>
            <div className="font-sm">{post.content}</div>
        </div>
    );
};

const Posts = () => {
    let post: Post = {
        id: 1,
        title: "this is a title",
        content: "this is the content",
    };
    return (
        <div className="container mx-auto max-w-50%">
            <ProfileSideBar />
            <PostCard post={post} first={true} />
            <PostCard post={post} />
            <PostCard post={post} last={true} />
        </div>
    );
};

const Main = () => {
    return (
        <>
            <NavBar />
            <Posts />
        </>
    );
};
export default Main;
