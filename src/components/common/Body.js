import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Sidebar from "./Sidebar";
import FlashMessage from "./FlashMessage";
import Notification from "./notification/Notification";

export default function Body({ sidebar, children }) {
  return (
    <Container>
      <Stack direction="horizontal" className="Body">
        {sidebar && <Sidebar />}
        <Container className="Content">
          <FlashMessage />
          {children}
        </Container>
      </Stack>
      <Notification />
    </Container>
  );
}
