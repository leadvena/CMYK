import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // 1. Extract inputs
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const service = formData.get("service") as string;
    const size = formData.get("size") as string;
    const quantity = formData.get("quantity") as string;
    const message = formData.get("message") as string;
    const fileCount = parseInt((formData.get("fileCount") || "0") as string);

    if (!name || !email) {
      return new Response("Missing required fields", { status: 400 });
    }

    // 2. Process Attachments
    const attachments = [];
    
    for (let i = 0; i < fileCount; i++) {
      const file = formData.get(`file_${i}`) as File | null;

      if (file && file.size > 0) {
        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        attachments.push({
          filename: file.name,
          content: buffer, // Resend accepts Buffer directly
        });
      }
    }

    // 3. Send Email
    const { data, error } = await resend.emails.send({
      from: "CMYK Quotes <onboarding@resend.dev>",
      to: "kristaezekiel28@gmail.com",
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Size:</b> ${size || "Not specified"}</p>
        <p><b>Quantity:</b> ${quantity || "Not specified"}</p>
        <p><b>Message:</b> ${message || "No message provided"}</p>
        <p><b>Attachments:</b> ${attachments.length} files included.</p>
      `,
      attachments: attachments,
    });

    if (error) {
      return Response.json({ error }, { status: 400 });
    }

    return Response.json({ success: true, data });

  } catch (error: any) {
    console.error("Server Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}