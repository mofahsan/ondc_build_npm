const xlsx = require("node-xlsx").default;
import yaml from "js-yaml";
import fs from "fs";

export async function buildErrorCodes() {
  const workSheetsFromBuffer = xlsx.parse(`../../Error-codes.xlsx`);
  const outputObject = workSheetsFromBuffer[0]?.data
    .filter((item: any, index: number) => item.length > 0 && index !== 0)
    .map(([Event, Description, From, code]: any) => ({
      Event,
      Description,
      From,
      code,
    }));
  const yamlString = yaml.dump({ code: outputObject });
  fs.writeFileSync(`./error_codes/index.yaml`, yamlString);
}
