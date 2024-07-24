import React from "react";
import QrGeneratorPro from "./QrGenerator";
import { DataDisco } from "@/services/getDisco";

const Share = ({ disco }: { disco: DataDisco }) => {
  return <QrGeneratorPro disco={disco} />;
};

export default Share;
