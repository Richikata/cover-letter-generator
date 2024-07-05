import Image from "next/image";
import Resume from "./components/Resume";

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css"

export default function Home() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <CopilotSidebar
        instructions={"Help the user create a cover letter and resume"}
        labels={{
          initial:
            "Welcome to the cover letter app! Add your LinkedIn, X, or GitHub profile link below.",
        }}
        defaultOpen={true}
        clickOutsideToClose={false}>
        <Resume />
      </CopilotSidebar>
    </CopilotKit>
  );
}
