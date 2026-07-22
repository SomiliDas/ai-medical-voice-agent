import { openai } from "@/config/OpenAIModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const {notes} = await req.json()

    try{

        const completion = await openai.chat.completions.create({
                                model: "google/gemma-4-26b-a4b-it:free",
                                messages: [
                                    {role : "system", content : `
                                                                    You are a medical routing assistant.

                                                                    Available specialists:
                                                                    ${JSON.stringify(AIDoctorAgents)}

                                                                    Only select specialists from this list.
                                                                    Never create new specialists.
                                                                    Return the selected objects exactly as provided.
                                                                    `},
                                    {role: "user",
                                        content: `User Notes/Symptoms: ${notes}
                                                        Based on the symptoms, select the 3 most appropriate specialists ONLY from the list provided in the system prompt.
                                                         Rules : 
                                                         Return the complete selected objects exactly as they appear in the system prompt.
                                                         Do not modify, rename, or omit any fields.
                                                         Do not create new specialists.
                                                         Return ONLY a valid JSON array.
                                                         Do NOT wrap the response in markdown.
                                                         Do NOT use json.
                                                         Do NOT include any explanation or additional text.
                                                `
                                        }
                                ]
                            })
        
        const content = completion.choices[0].message.content ?? "[]";
        const doctors = JSON.parse(content);

        return NextResponse.json(doctors);

    }catch(err){
        return NextResponse.json(err)
    }

}