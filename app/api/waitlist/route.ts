import { NextResponse } from "next/server";
import axios from "axios";
const sk = process.env.SK
const API_ENDPOINT = "https://script.google.com/macros/s/AKfycbyR7hFNsATbneMT7hSdH0vvN9xTx3safTiVExPUBhfgjbQzx07PehIfbpn0UIFLoRcv/exec"
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
            We're excited to have you on board! You're now officially on the waitlist for early access to our AI-powered website customization platform.
          </p>
          <p style="color:#555555;font-size:16px;line-height:1.6;">
            As we get closer to launch, you'll be the first to know. Keep an eye on your inbox for updates, sneak peeks, and exclusive invites.
          </p>
          <p style="color:#555555;font-size:16px;line-height:1.6;">
            If you have any questions or just want to say hello, reply to this email — we’d love to hear from you.
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