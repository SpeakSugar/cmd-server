import { DataSource, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as path from "path";
import * as os from "os";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ nullable: true })
    display_name: string;

    @Column({ default: 1 })
    role: number;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    token: string;
}

it('sqlite create test', async () => {
    const destDir = path.join(os.homedir(), `.config`);
    const dataSource = new DataSource({
        type: "sqlite",
        database: `${destDir}/cmds.sqlite`,
        synchronize: true,
        logging: false,
        entities: [User],
        migrations: [],
        subscribers: [],
    });
    await dataSource.initialize();
    // await dataSource.manager.save(User,{
    //     username: `admin`,
    //     display_name: `admin`,
    //     password: `123123`,
    //     role: 0
    // });
    let users = await dataSource.manager.find(User);
    console.log(users);
});
