export class User {
    id!: number;
    username!: string;
    name?: string;
    posts!: { id: number }[];

    constructor(id: number, username: string, name: string, posts?: { id: number }[]) {
        this.id = id;
        this.username = username;
        if (posts) {
            this.posts = posts;
        }
    }
}

export class Post {
    id!: number;
    title!: string;
    content!: string;
    author?: { username: string, [prop: string]: any }
}
