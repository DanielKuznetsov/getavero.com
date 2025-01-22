// "@/app/api/inngest/route.js"
import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import {
    insertMenuItems
} from "@/inngest/functions";

// Enable Edge Runtime
export const runtime = "edge";

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        insertMenuItems
    ],
    streaming: "allow",
});
