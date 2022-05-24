export class PrivateUser {
    id!: number;
    username!: string;
    name!: string;
    email!: string;
    coins!: number;
    experience!: number;
    location?: string;
    aboutMe?: string;
    confirmed?: boolean;
    locked!: boolean;
    memberSince!: string;
    lastSeen!: string;
    isAdmin!: boolean;
    clicks!: number;
    clicksToday!: number;
    avatarUrl!: string;
    posts?: {
        title: string;
        content: string;
        columns: string[] | undefined;
    }[];
}
