const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

const sendOrderConfirmation = async ({ to, orderId, name, items, total, shipping }) => {
  const itemRows = items.map((item) => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #f0f0f0;">
        <img src="${item.product_image}" width="50" style="border-radius:4px;vertical-align:middle;margin-right:8px;" />
        ${item.product_name}
      </td>
      <td style="padding:8px;border-bottom:1px solid #f0f0f0;text-align:center;">${item.quantity}</td>
      <td style="padding:8px;border-bottom:1px solid #f0f0f0;text-align:right;">₹${Number(item.price * item.quantity).toLocaleString("en-IN")}</td>
    </tr>
  `).join("");

  const html = `
    <div style="font-family:Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;background:#f1f3f6;padding:20px;">
      <div style="background:#2874f0;padding:16px 24px;border-radius:8px 8px 0 0;text-align:center;">
        <h1 style="color:white;margin:0;font-size:22px;">Order Confirmed! 🎉</h1>
      </div>
      <div style="background:white;padding:24px;border-radius:0 0 8px 8px;">
        <p style="color:#212121;font-size:15px;">Hi <strong>${name}</strong>,</p>
        <p style="color:#555;font-size:14px;">Your order has been placed successfully. Here's your order summary:</p>

        <div style="background:#f9f9f9;border-radius:4px;padding:12px 16px;margin:16px 0;">
          <p style="margin:0;font-size:13px;color:#878787;">ORDER ID</p>
          <p style="margin:4px 0 0;font-size:13px;font-family:monospace;color:#212121;">${orderId}</p>
        </div>

        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <thead>
            <tr style="background:#f0f0f0;">
              <th style="padding:8px;text-align:left;font-size:13px;">Product</th>
              <th style="padding:8px;text-align:center;font-size:13px;">Qty</th>
              <th style="padding:8px;text-align:right;font-size:13px;">Price</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>

        <div style="text-align:right;font-size:16px;font-weight:700;color:#212121;margin:8px 0 20px;">
          Total: ₹${Number(total).toLocaleString("en-IN")}
        </div>

        <div style="border-top:1px solid #f0f0f0;padding-top:16px;">
          <p style="font-size:13px;color:#878787;margin:0 0 6px;">DELIVERY ADDRESS</p>
          <p style="font-size:14px;color:#212121;margin:0;line-height:1.6;">
            ${shipping.name}<br/>
            ${shipping.address}, ${shipping.city}<br/>
            ${shipping.state} - ${shipping.pincode}<br/>
            📞 ${shipping.phone}
          </p>
        </div>

        <p style="margin-top:24px;font-size:13px;color:#878787;text-align:center;">
          Thank you for shopping with <strong style="color:#2874f0;">FlipStore</strong>!
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"FlipStore" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Order Confirmed - #${orderId.slice(0, 8).toUpperCase()}`,
    html,
  });
};

const sendOrderCancellation = async ({ to, orderId, name, total }) => {
  const html = `
    <div style="font-family:Roboto,Arial,sans-serif;max-width:600px;margin:0 auto;background:#f1f3f6;padding:20px;">
      <div style="background:#e53935;padding:16px 24px;border-radius:8px 8px 0 0;text-align:center;">
        <h1 style="color:white;margin:0;font-size:22px;">Order Cancelled</h1>
      </div>
      <div style="background:white;padding:24px;border-radius:0 0 8px 8px;">
        <p style="color:#212121;font-size:15px;">Hi <strong>${name}</strong>,</p>
        <p style="color:#555;font-size:14px;">Your order has been successfully cancelled. Here are the details:</p>

        <div style="background:#f9f9f9;border-radius:4px;padding:12px 16px;margin:16px 0;">
          <p style="margin:0;font-size:13px;color:#878787;">ORDER ID</p>
          <p style="margin:4px 0 0;font-size:13px;font-family:monospace;color:#212121;">${orderId}</p>
        </div>

        <div style="background:#fff8e1;border-radius:4px;padding:12px 16px;margin:16px 0;border-left:4px solid #ffa000;">
          <p style="margin:0;font-size:14px;color:#212121;">
            💰 Refund of <strong>₹${Number(total).toLocaleString("en-IN")}</strong> will be processed to your original payment method within <strong>5-7 business days</strong>.
          </p>
        </div>

        <p style="margin-top:24px;font-size:13px;color:#878787;text-align:center;">
          We hope to see you again at <strong style="color:#2874f0;">FlipStore</strong>!
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"FlipStore" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Order Cancelled - #${orderId.slice(0, 8).toUpperCase()}`,
    html,
  });
};

module.exports = { sendOrderConfirmation, sendOrderCancellation };
