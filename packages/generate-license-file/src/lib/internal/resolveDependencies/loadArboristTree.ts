import Arborist, { type Node } from "@npmcli/arborist";

export const loadArboristTree = async (path: string): Promise<Node> => {
  const arborist = new Arborist({ path });
  return arborist.loadActual();
};
