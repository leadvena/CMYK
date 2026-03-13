import { Resend } from "resend";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {

    const formData = await req.formData();

    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const service = formData.get("service");
    const size = formData.get("size");
    const quantity = formData.get("quantity");
    const message = formData.get("message");

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
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
      `
    });

    return Response.json({ success: true });

  } catch (err) {

    console.error(err);

    return Response.json(
      { error: "Email failed" },
      { status: 500 }
    );

  }

}