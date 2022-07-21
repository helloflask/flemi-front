import * as React from "react";
import Post, { Posts } from "../models/post";
import { getData } from "../helpers/getData";
import NavBar from "./navBar";
import ProfileSideBar from "./profileSideBar";

export const PostCard = (props: {
    post: Post;
    first?: boolean;
    last?: boolean;
}) => {
    const { post } = props;
    let className = "p-4 border-solid border-x-2 border-slate-300 ";
    let extra: string;
    if (props.first && props.last) {
        extra = "border-y-2 rounded";
    } else if (props.first) {
        extra = "border-t-2 border-b rounded-tl-lg rounded-tr-lg";
    } else if (props.last) {
        extra = "border-b-2 border-t rounded-bl-lg rounded-br-lg";
    } else {
        extra = "border-y";
    }
    className += extra;

    return (
        <div className={className}>
            <div className="font-semibold font-2xl">{post.title}</div>
            <div className="text-base text-slate-500">
                {post.author ? post.author.username : "deleted-flemi-user"}
            </div>
            <div className="font-sm">{post.content}</div>
        </div>
    );
};

const PostsElement = () => {
    const [postElements, setPostElements] = React.useState<
        Array<React.ReactElement>
    >([]);
    React.useEffect(() => {
        getPosts();
    }, []);
    const getPosts = async () => {
        const posts = await getData<Posts>("/posts?limit=8&offset=0");
        if (posts === undefined) {
            return;
        }
        setPostElements(
            posts.posts.map((post, i) => {
                return (
                    <PostCard
                        post={post}
                        first={i === 0}
                        last={i === posts.posts.length - 1}
                        key={i}
                    />
                );
            })
        );
    };
    return (
        <div className="container mx-auto max-w-50%">
            <ProfileSideBar />
            {postElements}
        </div>
    );
};

const Main = () => {
    return (
        <>
            <NavBar />
            <PostsElement />
        </>
    );
};
export default Main;
