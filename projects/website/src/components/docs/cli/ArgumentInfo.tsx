import styled from "@emotion/styled";
import React from "react";

type ArgumentType = "string" | "string[]" | "boolean";

interface Props {
  type: ArgumentType;
  isRequired?: boolean;
  aliases?: string[];
}

const ArgumentInfo = (props: Props) => {
  const hasAliases = (props?.aliases?.length ?? 0) > 0;
  const aliasTitle = props.aliases?.length === 1 ? "Alias" : "Aliases";
  const aliases = (props.aliases ?? []).map((a, i) => (
    <>
      {i !== 0 && <>{", "}</>}
      <code>{a}</code>
    </>
  ));

  return (
    <Table>
      <Row>
        <Cell>
          <b>Type:</b> <code>{props.type}</code>
        </Cell>
        <Cell>
          <b>Is required:</b> <code>{props.isRequired ? "true" : "false"}</code>
        </Cell>
        {hasAliases && (
          <Cell>
            <b>{aliasTitle}:</b> {aliases}
          </Cell>
        )}
      </Row>
    </Table>
  );
};
export default ArgumentInfo;

const Table = styled.table`
  border: 0;
`;
const Row = styled.tr`
  border: 0;
`;
const Cell = styled.td`
  border: 0;
`;
