export default class Post {
    id!: number;
    title!: string;
    content!: string;
    author?: {
        username: string;
        avatar_url: string;
    };
}
