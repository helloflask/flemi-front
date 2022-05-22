export class PrivateUser {
    id!: number;
    username!: string;
    name!: string;
    email!: string;
    coins!: number;
    experience!: number;
    location?: string;
    about_me?: string;
    confirmed?: boolean;
    locked!: boolean;
    member_since!: string;
    last_seen!: string;
    is_admin!: boolean;
    clicks!: number;
    clicks_today!: number;
    avatar_url!: string;
	posts?: Array<Post>;
}

export class Post {
    id!: number;
    title!: string;
    content!: string;
    author!: {
		username: string;
		avatar_url: string;
	};
}
