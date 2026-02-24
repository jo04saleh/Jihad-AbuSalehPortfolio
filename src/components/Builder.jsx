import DramaticSection from "./DramaticSection";
import { SECTIONS } from "../data/projects";

export default function Builder({ theme }) {
  return (
    <DramaticSection
      section={SECTIONS[1]}
      theme={theme}
      index={1}
    />
  );
}
