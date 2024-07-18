const xlsx = require("node-xlsx").default;
import yaml from "js-yaml";
import fs from "fs";

export async function buildTlc() {
  const workSheetsFromBuffer = xlsx.parse(`../../tlc.xlsx`);
  const outputObject = workSheetsFromBuffer[0]?.data
    .filter((item: any, index: number) => item.length > 0 && index !== 0)
    .map((item: any) => {
      return {
        Term: item[0],
        Api: item[1],
        Attribute: item[2],
        Owner: item[3],
        Value: item[4],
        Description: item[5],
      };
    });
  const yamlString = yaml.dump({ code: outputObject });
  fs.writeFileSync(`./tlc/index.yaml`, yamlString);
}

module.exports = { buildTlc };
