import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum UserType {
    STANDARD = "standard",
    ADMIN = "admin"
}

export enum RegistrationStatus {
    PENDING = "pending",
    ACTIVE = "active",
    BLOCKED = "blocked"
}

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 150 })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ name: "birth_date", type: "date" })
    birthDate: Date;

    @Column({ length: 20, nullable: true })
    rg: string;

    @Column({ length: 14, unique: true })
    cpf: string;

    @Column({
        name: "user_type",
        type: "enum",
        enum: UserType,
        default: UserType.STANDARD
    })
    userType: UserType;

    @Column({
        name: "registration_status",
        type: "enum",
        enum: RegistrationStatus,
        default: RegistrationStatus.PENDING
    })
    registrationStatus: RegistrationStatus;

    @Column({ name: "associate_status", nullable: true })
    associateStatus: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}