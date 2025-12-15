import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("term_of_responsibility")
export class TermOfResponsibility {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column("text")
    content: string;

    @Column()
    version: string; 

    @Column({ name: "validity_start_date" })
    validityStartDate: Date;

    @Column({ name: "validity_end_date", nullable: true })
    validityEndDate: Date;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
}