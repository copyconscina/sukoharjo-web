import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/lib/auth";
import { uploadSingleFile, uploadMultipleFiles } from "@/lib/upload";

export async function POST(req: NextRequest) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();

    // Check if there is "files" key (multiple files)
    const files = formData.getAll("files") as File[];
    if (files && files.length > 0 && files[0].name !== "undefined" && files[0].size > 0) {
      const urls = await uploadMultipleFiles(files);
      return NextResponse.json({ success: true, urls });
    }

    // Check if there is "file" key (single file)
    const file = formData.get("file") as File;
    if (file && file.name !== "undefined" && file.size > 0) {
      const url = await uploadSingleFile(file);
      return NextResponse.json({ success: true, url });
    }

    return NextResponse.json({ error: "No valid files uploaded" }, { status: 400 });
  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload file(s)" }, { status: 500 });
  }
}
