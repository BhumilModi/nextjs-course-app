/** @jsx jsx */
import { jsx } from "theme-ui";
import { useRouter } from "next/router";
import Link from "next/link";

const Note = ({ note }) => {
  return (
    <div sx={{ variant: "containers.page" }}>
      <h1>{note.title} </h1>
    </div>
  );
};

export default Note;

export async function getServerSideProps({ params, req, res }) {
  const response = await fetch(
    `${process.env.NOTES_API_URL}/api/note/${params.id}`
  );

  if (!response.ok) {
    return res.writeHead(302, { Location: "/notes" }).end();
  }

  const { data } = await response.json();

  if (data) {
    return {
      props: { note: data },
    };
  }
}
