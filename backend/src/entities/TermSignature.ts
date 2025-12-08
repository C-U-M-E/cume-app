import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { TermOfResponsibility } from "./TermOfResponsibility";

@Entity("term_signature")
export class TermSignature {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "signature_date" })
    signatureDate: Date;

    @Column({ name: "expiration_date" })
    expirationDate: Date; // Critical date (Signature + 6 months)

    @Column({ name: "document_url", nullable: true })
    documentUrl: string; 

    @Column({ name: "photo_url", nullable: true })
    photoUrl: string;

    @Column({ name: "identity_document_url", nullable: true })
    identityDocumentUrl: string; // Foto do RG ou CNH

    // Relationships
    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => TermOfResponsibility)
    @JoinColumn({ name: "term_id" })
    term: TermOfResponsibility;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;
}