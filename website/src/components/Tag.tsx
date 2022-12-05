import styled from "@emotion/styled";

interface Props {
  full: boolean;
}

const Tag = styled.span<Props>`
  background-color: ${({ full }) => (full ? "var(--ifm-color-primary)" : "transparent")};
  border-radius: 0.5em;
  font-size: small;
  padding: 0.2em 0.4em;
  font-style: italic;
  margin: 0 0.5em;
  color: white;
  font-weight: 600;
`;
export default Tag;
