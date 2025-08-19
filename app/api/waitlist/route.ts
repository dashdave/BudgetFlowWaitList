import { NextResponse } from "next/server";
import axios from "axios";
const sk = process.env.SK
const API_ENDPOINT = "https://script.google.com/macros/s/AKfycby8XFjA9N076ONxTLus7eDWddmlRNh2T6dnN82X22bCI4Zz56tG4N3mCWMdh24ln9zRWw/exec"
export async function POST(request: Request) {
    const requestBody = await request.json()


    const { email} = requestBody

    if (!email) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
      }

    try {
        const payload = {
            
            sk: process.env.SK,
            email: email,
            subject: "Welcome to the Waitlist!",
            body: `
                <div style="max-width:600px;margin:auto;background-color:#ffffff;padding:30px;border-radius:8px;font-family:sans-serif;box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          <h2 style="color:#333333;">🎉 Thank You for Joining the Waitlist!</h2>
          <p style="color:#555555;font-size:16px;line-height:1.6;">
            Thank you for joining the BudgetFlow waitlist! You're now one step closer to taking control of your finances with ease
          </p>
          <p style="color:#555555;font-size:16px;line-height:1.6;">
            We're building a smart tool to skip the spreadsheet hassle—simply input your income, and we’ll craft a personalized budget with Naira tracking and overspend alerts. Think of it as your personal accountant, working for you in minutes!
          </p>
          <p style="color:#555555;font-size:16px;line-height:1.6;">
            What’s Next:

              Exclusive Preview: Be the first to see a demo when we’re ready (stay tuned!).
              Early Access: Waitlist members like you get priority when we launch—spots are limited!
              Join the Conversation: Follow us on X (@budget_Flow) and share your budgeting challenges—we’re listening!

            We’re aiming for a big launch soon, and your input will shape it. Reply to this email with any ideas or questions—you’re part of the journey!
            Warm regards,
          </p>
          <p style="margin-top:30px;color:#888888;font-size:13px;">— The PromptlyBuilt Team</p>
        </div>
            `
        }
        const response = await axios.post(API_ENDPOINT, payload)

    return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ message: "Error sending email" }, { status: 500 });
        
    }
}

export async function GET(request: Request) {
    try {
        const response = await axios.get(`${API_ENDPOINT}?sk=${sk}`, {
            timeout: 10000 // 10 seconds
          });
          console.log(response.data)
          return NextResponse.json(response.data);
      
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      return NextResponse.json({ message: "Error fetching subscribers" }, { status: 500 });
    }
  }