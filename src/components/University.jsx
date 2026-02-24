import DramaticSection from "./DramaticSection";
import { SECTIONS } from "../data/projects";

export default function University({ theme }) {
  return (
    <DramaticSection
      section={SECTIONS[0]}
      theme={theme}
      index={0}
    />
  );
}
