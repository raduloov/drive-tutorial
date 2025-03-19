import { mockFiles, mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { files_tables, folders_table } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed Function
      <form
        action={async () => {
          "use server";

          const folderInsert = await db.insert(folders_table).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index !== 0 ? 1 : null,
            })),
          );

          console.log(folderInsert);

          const fileInsert = await db.insert(files_tables).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              size: parseInt(file.size),
              url: file.url,
              parent: (index % 3) + 1,
            })),
          );

          console.log(fileInsert);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
