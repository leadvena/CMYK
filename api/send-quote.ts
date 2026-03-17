import { Resend } from "resend";

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const formData = await req.formData();

    // ✅ Extract & sanitize inputs
    const name = (formData.get("name") || "").toString();
    const phone = (formData.get("phone") || "").toString();
    const email = (formData.get("email") || "").toString();
    const service = (formData.get("service") || "").toString();
    const size = (formData.get("size") || "").toString();
    const quantity = (formData.get("quantity") || "").toString();
    const message = (formData.get("message") || "").toString();

    // ✅ Basic validation
    if (!name || !email) {
      return new Response("Missing required fields", { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    let attachments: any[] = [];
    let totalSize = 0;

    const MAX_TOTAL_SIZE = 20 * 1024 * 1024; // 20MB limit

    // ✅ Handle multiple files
    const fileCount = parseInt((formData.get("fileCount") || "0") as string);

    for (let i = 0; i < fileCount; i++) {
      const file = formData.get(`file_${i}`) as File | null;

      if (file && file.size > 0) {
        totalSize += file.size;

        // ❌ Prevent oversized payloads
        if (totalSize > MAX_TOTAL_SIZE) {
          return new Response("Total file size exceeds 20MB limit", {
            status: 400,
          });
        }

        const arrayBuffer = await file.arrayBuffer();
        const base64Content = Buffer.from(arrayBuffer).toString("base64");

        attachments.push({
          filename: file.name,
          content: base64Content,
        });
      }
    }

    // ⚠️ Optional: handle legacy single file (only if needed)
    const legacyFile = formData.get("file") as File | null;

    if (legacyFile && legacyFile.size > 0 && attachments.length === 0) {
      const arrayBuffer = await legacyFile.arrayBuffer();
      const base64Content = Buffer.from(arrayBuffer).toString("base64");

      attachments.push({
        filename: legacyFile.name,
        content: base64Content,
      });
    }

    // ✅ Send email
    const { data, error } = await resend.emails.send({
      from: "CMYK Quotes <onboarding@resend.dev>",
      to: "kristaezekiel28@gmail.com",
      subject: "New Quote Request",
      html: `
        <h2>New Quote Request</h2>

        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Size:</b> ${size}</p>
        <p><b>Quantity:</b> ${quantity}</p>
        <p><b>Message:</b> ${message}</p>
      `,
      attachments,
    });

    // ❌ Handle email failure properly
    if (error) {
      console.error("Resend error:", error);
      return new Response("Failed to send email", { status: 500 });
    }

    return Response.json({ success: true, data });

  } catch (error) {
    console.error("Server error:", error);

    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
