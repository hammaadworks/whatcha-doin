import { NextRequest, NextResponse } from "next/server";
import { sendLarkMessage } from "@/lib/logger/sendLarkMessage";
import { withLogging } from "@/lib/logger/withLogging";
import logger from "@/lib/logger/server";
import * as z from "zod";

const formSchema = z.object({
  message: z.string().min(10).max(500),
  contactMethod: z.enum(["email", "whatsapp", "link"]),
  contactDetail: z.string().min(1),
});

async function _POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    const { message, contactMethod, contactDetail } = validatedData;

    const larkMessage = `
**New Feedback/Bug Report**

**Message:**
${message}

**Contact Method:** ${contactMethod}
**Contact Detail:** ${contactDetail}
    `;

    const success = await sendLarkMessage(larkMessage);

    if (success) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to send message to Lark." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      logger.error({ err: error.errors }, "Validation Error in feedback route");
      return NextResponse.json(
        { success: false, error: "Invalid request data.", details: error.errors },
        { status: 400 }
      );
    }
    logger.error({ err: error }, "API Error in feedback route");
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export const POST = withLogging(_POST, "api.feedback.POST");
