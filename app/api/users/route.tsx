import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

            if (!email) {
            return NextResponse.json(
                { error: "User email not found" },
                { status: 400 }
            );
            }

    try{
        // @ts-ignore
        const users = await db.select().from(usersTable).where(eq(usersTable.email , email))
        if(users?.length == 0){
            
            const result = await db.insert(usersTable).values({
                name : user?.fullName ?? '',
                email,
                credits : 10
            }).returning();

            return NextResponse.json(result[0])
        }
        
        return NextResponse.json(users[0])
        
    }catch(err){
        return NextResponse.json(err)
    }
}