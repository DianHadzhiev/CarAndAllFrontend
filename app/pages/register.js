import fs from "fs";
import path from "path";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { data, type } = req.body;

        const filePath =
            type === "personal"
                ? path.join(process.cwd(), "public/personal_accounts.csv")
                : path.join(process.cwd(), "public/business_accounts.csv");

        const newLine = Object.values(data).join(",") + "\n";

        try {
            fs.appendFileSync(filePath, newLine, "utf8");
            res.status(200).json({ message: "Registration successful!" });
        } catch (error) {
            res.status(500).json({ message: "Error writing to file", error });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
