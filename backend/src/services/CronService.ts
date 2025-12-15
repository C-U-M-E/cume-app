import cron from "node-cron";
import { AppDataSource } from "../config/data-source";
import { User, RegistrationStatus } from "../entities/User";
import { TermSignature } from "../entities/TermSignature";
import { LessThan } from "typeorm";

export const startCronJobs = () => {
    // Runs every day at midnight ('0 0 * * *')
    cron.schedule('0 0 * * *', async () => {
        console.log("[CRON] Running validation check for expired signatures...");
        
        const signatureRepo = AppDataSource.getRepository(TermSignature);
        const userRepo = AppDataSource.getRepository(User);

        const today = new Date();

        // 1. Find expired signatures where expiration_date < today
        // Note: In a real scenario, you might want to filter only the LATEST signature for each user
        // But for simplicity, we check if the user has ANY active signature that just expired.
        // A better approach for the query:
        // Find users who are ACTIVE but their latest signature has expired.
        
        // Simpler logic for this MVP:
        // Find signatures that expired strictly "yesterday" (or are old) and the user is still active.
        const expiredSignatures = await signatureRepo.find({
            where: {
                expirationDate: LessThan(today)
            },
            relations: ["user"]
        });

        if (expiredSignatures.length > 0) {
            console.log(`[CRON] Found ${expiredSignatures.length} expired signatures.`);

            for (const signature of expiredSignatures) {
                const user = signature.user;
                
                // If user is currently ACTIVE, downgrade to PENDING
                if (user.registrationStatus === RegistrationStatus.ACTIVE) {
                    
                    // Double check: Does the user have a NEWER signature that is valid?
                    const validSignature = await signatureRepo.findOne({
                        where: {
                            user: { id: user.id },
                            // Here you would check if expirationDate > today
                        },
                        order: { expirationDate: "DESC" }
                    });

                    // If the latest signature is indeed expired
                    if (!validSignature || validSignature.expirationDate < today) {
                        user.registrationStatus = RegistrationStatus.PENDING; 
                        await userRepo.save(user);
                        console.log(`[CRON] User ${user.name} status updated to PENDING (Expired on ${signature.expirationDate})`);
                    }
                }
            }
        } else {
            console.log("[CRON] No expired signatures found today.");
        }
    });
};