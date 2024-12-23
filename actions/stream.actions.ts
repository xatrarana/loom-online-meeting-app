"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecrete = process.env.STREAM_SECRETE_KEY


export const tokenProvider = async () => {
    const user = await currentUser();

    if (!user) throw new Error("user is not logged in")

    if (!apiKey) throw new Error("No stream API key")

    if (!apiSecrete) throw new Error("NO API secret Key")

    const client = new StreamClient(apiKey, apiSecrete)

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued = Math.floor(Date.now() / 1000) - 60;


    const token = client.generateUserToken({
        user_id: user.id,
        exp,
        iat: issued
    })

    return token;
}