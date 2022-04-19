import {BerryOrm, Entity, BaseEntity, Field, Primary, Relation, Collection} from "berry-orm";

@Entity()
export class User extends BaseEntity<User, "id"> {
    @Primary()
    @Field()
    id!: number;

    @Field()
    username!: string;

    @Field()
    name?: string | undefined;

    @Relation({
        target: () => Post,
        inverse: "author",
        multi: true,
    })
    @Field()
    posts!: Collection<Post>;

    @Relation({
        target: () => Column,
        inverse: "authors",
        multi: true,
    })
    @Field()
    columns!: Collection<Column>;
}

@Entity()
export class Post extends BaseEntity<Post, "id"> {
    @Primary()
    @Field()
    id!: number;

    @Relation({
        target: () => User,
        inverse: "posts",
    })
    @Field()
    author!: User;

    @Field()
    title!: string;

    @Field()
    content!: string;

    @Relation({
        target: () => Column,
        inverse: "posts",
        multi: true
    })
    @Field()
    columns!: Collection<Column>;
}

@Entity()
export class Column extends BaseEntity<Column, "id"> {
    @Primary()
    @Field()
    id!: number;

    @Relation({
        target: () => User,
        inverse: "columns",
        multi: true,
    })
    @Field()
    authors!: Collection<User>;

    @Relation({
        target: () => Post,
        inverse: "columns",
        multi: true
    })
    @Field()
    posts!: Collection<Post>
}

export const orm = new BerryOrm(
    { entities: [User, Post, Column]}
);